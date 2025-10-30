import React, { useState, useRef } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import chefSvg from "./assets/chef.svg";
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
  const [noInput, setNoInput] = useState(false); // ✅ New state for empty search

  const searchVersion = useRef(0);
  const debounceTimer = useRef(null);

  const handleType = (term) => {
    setQuery(term);
    setNoInput(false); // hide message when typing
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      if (term.trim().length >= 2) handleSearch(term);
    }, 500);
  };

  async function handleSearch(term) {
    // ✅ Validation for empty input
    if (!term.trim()) {
      setMeals([]);
      setNoInput(true);
      setError(null);
      return;
    }

    const currentVersion = ++searchVersion.current;
    setLoading(true);
    setError(null);
    setNoInput(false);

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <SearchBar onType={handleType} onSearch={handleSearch} initial={query} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 pt-6">
        {loading && <Loader />}

        {error && (
          <p className="text-center text-red-500 py-4 text-lg">{error}</p>
        )}

        {/* ✅ No input warning */}
        {noInput && (
          <p className="text-center text-yellow-600 py-4 text-lg font-medium">
            Please enter an ingredient first.
          </p>
        )}

        {/* Default Chef illustration */}
        {!loading && !error && !noInput && meals.length === 0 && (
          <div className="flex flex-col items-center justify-start mt-8">
            <img
              src={chefSvg}
              alt="Chef Illustration"
              className="w-40 h-40 sm:w-60 sm:h-60 opacity-80 animate-fadeIn"
            />
            <p className="mt-4 text-gray-500 text-lg font-medium text-center">
              Search by ingredient to discover delicious recipes!
            </p>
          </div>
        )}

        {/* Recipe list */}
        {!loading && !error && meals.length > 0 && (
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
