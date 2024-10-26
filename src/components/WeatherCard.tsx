type WeatherCardProps = {
  city: string;
  temperature: number;
  condition: string;
};

export default function WeatherCard({
  city,
  temperature,
  condition,
}: WeatherCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{city}</h2>
      <p className="text-2xl">{temperature}</p>
      <p className="text-gray-500">{condition}</p>
    </div>
  );
}
