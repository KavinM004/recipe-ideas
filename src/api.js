import axios from "axios";

const BASE = "https://www.themealdb.com/api/json/v1/1";

export async function searchByIngredient(ingredient) {
  const q = encodeURIComponent(String(ingredient || "").trim());
  if (!q) return { meals: null };
  const res = await axios.get(`${BASE}/filter.php?i=${q}`);
  return res.data;
}

export async function getMealById(id) {
  const res = await axios.get(`${BASE}/lookup.php?i=${id}`);
  return res.data;
}
