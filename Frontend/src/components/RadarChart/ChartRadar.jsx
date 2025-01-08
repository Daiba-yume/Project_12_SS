import "./ChartRadar.scss";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

function ChartRadar() {
  const data = [
    { subject: "Intensité", A: 30, fullMark: 150 },
    { subject: "Vitesse", A: 98, fullMark: 150 },
    { subject: "Force", A: 65, fullMark: 150 },
    { subject: "Endurance", A: 89, fullMark: 150 },
    { subject: "Energie", A: 85, fullMark: 150 },
    { subject: "Cardio", A: 45, fullMark: 150 },
  ];
  return (
    <div className="radar-container">
      <ResponsiveContainer width="100%" height={200}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="80%">
          {/* Désactivation des lignes radiales */}
          <PolarGrid radialLines={false} />
          <PolarAngleAxis dataKey="subject" />
          <Radar name="Mike" dataKey="A" fill="#E60000" fillOpacity={0.8} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default ChartRadar;
