import "./ScoreChart.scss";
import {
  ResponsiveContainer,
  RadialBar,
  RadialBarChart,
  PolarAngleAxis,
  Legend,
} from "recharts";

const data = [
  { name: "Score", value: 18 }, // 12% de l'objectif
  { name: "Restant", value: 88 }, // Le reste pour atteindre 100%
];

function ScoreChart() {
  const legendScore = () => {
    return (
      <div className="legendScore">
        <div className="score">{}%</div>
        <div className="detail">de votre objectif</div>
      </div>
    );
  };
  return (
    <div className="scoreContainer">
      <h1>Score</h1>
      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart
          data={data}
          innerRadius={70}
          outerRadius={90}
          startAngle={90}
          paddingAngle={5}
        >
          <Legend content={legendScore} />
          <RadialBar
            dataKey="value"
            cornerRadius={20}
            style={{ zIndex: "2", position: "absolute" }}
          />
          <PolarAngleAxis type="number" domain={[0, 1]} tick={false} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default ScoreChart;
