import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ meals = [], onOpen }) {
  if (!meals)
    return <p className="text-center py-12 text-slate-500">No meals found.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-12">
      {meals.map((m) => (
        <RecipeCard key={m.idMeal} meal={m} onOpen={onOpen} />
      ))}
    </div>
  );
}
