import React, { useState, useRef } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeModal from "./components/RecipeModal";
import Loader from "./components/Loader";
import { searchByIngredient } from "./api";

export default function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(null);

  const searchVersion = useRef(0);
  const debounceTimer = useRef(null);

  const handleType = (term) => {
    setQuery(term);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      if (term.trim().length >= 2) handleSearch(term);
    }, 500);
  };

  async function handleSearch(term) {
    const currentVersion = ++searchVersion.current;
    setLoading(true);
    setError(null);

    try {
      const data = await searchByIngredient(term);
      if (currentVersion === searchVersion.current) {
        setMeals(data.meals);
      }
    } catch {
      if (currentVersion === searchVersion.current) {
        setError("Network error or API issue.");
        setMeals([]);
      }
    } finally {
      if (currentVersion === searchVersion.current) setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SearchBar onType={handleType} onSearch={handleSearch} initial={query} />

      <main className="flex-1 max-w-7xl mx-auto w-full">
        {loading && <Loader />} {/* ✅ Loader appears below search bar */}
        {error && <p className="text-center text-red-500 py-4">{error}</p>}
        {!loading && !error && (
          <RecipeList meals={meals} onOpen={(id) => setSelectedId(id)} />
        )}
      </main>

      <footer className="py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Recipe Ideas — All rights reserved.
      </footer>

      <RecipeModal id={selectedId} onClose={() => setSelectedId(null)} />
    </div>
  );
}
