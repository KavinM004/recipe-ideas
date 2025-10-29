import React, { useEffect, useState } from "react";
import { getMealById } from "../api";
import { ingredientsFromMeal } from "../utils/format";
import { MdClose } from "react-icons/md";
import Loader from "./Loader";

export default function RecipeModal({ id, onClose }) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Disable background scroll when modal is open
  useEffect(() => {
    if (id) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [id]);

  // ✅ Fetch meal details
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getMealById(id)
      .then((data) => {
        setMeal(data.meals ? data.meals[0] : null);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load recipe details.");
        setLoading(false);
      });
  }, [id]);

  if (!id) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-2 sm:p-4">
      {/* Modal Card */}
      <div
        className="relative bg-[#e8e0fe] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto 
                   p-5 sm:p-6 shadow-xl animate-fadeIn"
      >
        {/* ✅ Close Button (inside modal, stays visible while scrolling) */}
        <div className="sticky top-0 flex justify-end z-20">
          <button
            onClick={onClose}
            className="mt-1 mr-1 bg-white/90 backdrop-blur-md rounded-full p-2 
                       text-slate-700 hover:text-red-500 shadow-md transition-all duration-300"
            aria-label="Close"
          >
            <MdClose size={28} />
          </button>
        </div>

        {/* ✅ Loader */}
        {loading && (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader />
          </div>
        )}

        {/* ⚠️ Error */}
        {error && !loading && (
          <p className="text-red-500 text-center py-10">{error}</p>
        )}

        {/* ✅ Recipe Content */}
        {meal && !loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left — Image */}
            <div className="md:col-span-1">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="rounded-lg w-full animate-fadeIn"
              />
              <h2 className="text-2xl font-semibold mt-3">{meal.strMeal}</h2>
              <p className="text-slate-500 text-sm">
                {meal.strArea} • {meal.strCategory}
              </p>
            </div>

            {/* Right — Ingredients & Instructions */}
            <div className="md:col-span-2">
              <h3 className="font-semibold mb-2 text-lg">Ingredients</h3>
              <ul className="grid grid-cols-2 gap-2">
                {ingredientsFromMeal(meal).map((it, i) => (
                  <li key={i} className="text-sm">
                    {it.measure} {it.ingredient}
                  </li>
                ))}
              </ul>

              <h3 className="mt-4 font-semibold text-lg">Instructions</h3>
              <p className="text-sm text-slate-700 whitespace-pre-line mt-2 leading-relaxed">
                {meal.strInstructions}
              </p>

              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 underline text-primary hover:text-indigo-700"
                >
                  Watch on YouTube
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
