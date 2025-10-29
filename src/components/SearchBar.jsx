import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchBar({ onSearch, initial = "" }) {
  const [q, setQ] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(q);
  };

  return (
    <form data-aos="fade-down" onSubmit={handleSubmit} className="w-full px-4 sm:px-6 mt-6">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center">
        {/* Input */}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search recipes by ingredient (e.g., chicken, rice)"
          className="flex-1 p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6648E1] focus:outline-none shadow-sm w-full"
        />

        {/* Button */}
        <button
          type="submit"
          className="flex justify-center items-center gap-2 px-4 py-3 sm:py-2 
                     bg-[#6648E1] text-white rounded-lg 
                     shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-95 
                     transition-all duration-300 w-full sm:w-auto"
        >
          <BiSearch size={20} /> <span className="sm:inline">Search</span>
        </button>
      </div>
    </form>
  );
}
