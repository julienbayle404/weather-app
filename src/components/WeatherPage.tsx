"use client";

import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { useState } from "react";

type WeatherData = {
  city: string;
  temperature: number;
  conditionText: string;
  conditionIcon: string;
};

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeather = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}`
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API response error:", errorText);
        throw new Error("Erreur lors de la récupération des données météo");
      }

      const data = await res.json();
      setWeatherData({
        city: data.location.name,
        temperature: data.current.temp_c,
        conditionText: data.current.condition.text,
        conditionIcon: data.current.condition.icon,
      });
    } catch (error) {
      console.error(error);
      setWeatherData({
        city: "Données non disponibles",
        temperature: 0,
        conditionText: "Erreur",
        conditionIcon: "",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <SearchBar onSearchAction={fetchWeather} />
      {weatherData && (
        <WeatherCard
          city={weatherData.city}
          temperature={weatherData.temperature}
          conditionText={weatherData.conditionText}
          conditionIcon={weatherData.conditionIcon}
        />
      )}
    </div>
  );
}
