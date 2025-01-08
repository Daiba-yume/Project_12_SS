import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./WaveChart.scss";

const data = [
  { day: "L", sessionLength: 30 },
  { day: "M", sessionLength: 40 },
  { day: "M", sessionLength: 35 },
  { day: "J", sessionLength: 50 },
  { day: "V", sessionLength: 45 },
  { day: "S", sessionLength: 60 },
  { day: "D", sessionLength: 55 },
];

function WaveChart() {
  return (
    <div className="wave-container">
      <ResponsiveContainer width="100%" height={200}>
        <h1>Durée moyenne des sessions</h1>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis hide={true} /> {/* Cache l'axe Y */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#FF0000"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default WaveChart;
