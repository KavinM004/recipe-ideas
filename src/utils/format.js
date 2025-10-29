export const ingredientsFromMeal = (meal) =>
  Array.from({ length: 20 }, (_, i) => i + 1)
    .map((n) => ({
      ingredient: meal[`strIngredient${n}`]?.trim(),
      measure: meal[`strMeasure${n}`]?.trim() || "",
    }))
    .filter((it) => it.ingredient);
