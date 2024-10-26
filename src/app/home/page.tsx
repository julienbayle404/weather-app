import WeatherCard from "@/components/WeatherCard";

type WeatherData = {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
  };
};

export default async function Home() {
  // Définir la ville par défaut pour la météo
  const city = "Paris";
  let weatherData;

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}`
    );

    // Vérifier que la requête est passée
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API response error:", errorText);
      throw new Error("Erreur lors de la récupération des données météo");
    }

    // Convertir la réponse en JSON et la typer
    const data: WeatherData = await res.json();
    weatherData = {
      city: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
    };
  } catch (error) {
    console.error(error);
    weatherData = {
      city: "Donnes non disponibles",
      temperature: 0,
      condition: "Erreur",
    };
  }

  // Renvoyer le composant WeatherCard avec les données récupérées
  return (
    <WeatherCard
      city={weatherData.city}
      temperature={weatherData.temperature}
      condition={weatherData.condition}
    />
  );
}
