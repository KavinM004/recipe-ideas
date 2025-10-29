import React from "react";

export default function RecipeCard({ meal, onOpen }) {
  return (
    <article
      data-aos="fade-up"
      className="bg-white rounded-2xl overflow-hidden card-shadow 
             transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] 
             hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_12px_28px_rgba(102,72,225,0.15)] 
             hover:brightness-105 animate-fadeUp animate-float-card"
    >
      <button
        onClick={() => onOpen(meal.idMeal)}
        className="group block text-left w-full"
      >
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 text-slate-800 group-hover:text-[#6648E1] transition-colors duration-500">
            {meal.strMeal}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {meal.strArea || ""} • {meal.strCategory || ""}
          </p>
        </div>
      </button>
    </article>
  );
}
