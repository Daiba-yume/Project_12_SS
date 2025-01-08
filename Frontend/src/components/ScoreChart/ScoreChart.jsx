import "./ScoreChart.scss";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Score", value: 12 }, // 12% de l'objectif
  { name: "Restant", value: 88 }, // Le reste pour atteindre 100%
];

const COLORS = ["#FF0000", "#E8E8E8"]; // Couleur du score et de l'arrière-plan
function ScoreChart() {
  return (
    <div className="score-container">
      <h1>Score</h1>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            startAngle={90}
            endAngle={450} // Pour faire tourner le graphique
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export default ScoreChart;
