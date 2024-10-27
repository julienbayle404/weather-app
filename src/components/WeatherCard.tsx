import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type WeatherCardProps = {
  city: string;
  temperature: number;
  conditionText?: string;
  conditionIcon?: string | StaticImport;
};

export default function WeatherCard({
  city,
  temperature,
  conditionText,
  conditionIcon,
}: WeatherCardProps) {
  const iconUrl =
    typeof conditionIcon === "string" && conditionIcon.startsWith("//")
      ? `https:${conditionIcon}`
      : conditionIcon ?? "";

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
      <div>
        <h2 className="text-xl font-semibold">{city}</h2>
        <p className="text-2xl">{temperature}°C</p>
        <p className="text-gray-500">{conditionText}</p>
      </div>
      {iconUrl && (
        <Image
          src={iconUrl}
          alt={conditionText || "Information unavailable"}
          width={48}
          height={48}
        />
      )}
    </div>
  );
}
