"use client";

import { useState } from "react";

type SearchBarProps = {
  onSearchAction: (city: string) => void;
};

export default function SearchBar({ onSearchAction }: SearchBarProps) {
  const [city, setCity] = useState<string>("");

  const handleSearch = () => {
    if (city.trim()) {
      onSearchAction(city);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Entrez une ville"
        className="p-2 border rounded-l-md"
      />
      <button
        onClick={handleSearch}
        className="p-2 text-white bg-blue-500 rounded-r-md"
      >
        Rechercher
      </button>
    </div>
  );
}
