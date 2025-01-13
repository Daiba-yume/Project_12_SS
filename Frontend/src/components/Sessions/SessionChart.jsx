import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./SessionChart.scss";

const data = [
  { day: "L", sessionLength: 30 },
  { day: "M", sessionLength: 40 },
  { day: "M", sessionLength: 35 },
  { day: "J", sessionLength: 50 },
  { day: "V", sessionLength: 45 },
  { day: "S", sessionLength: 60 },
  { day: "D", sessionLength: 55 },
];

function SessionChart() {
  return (
    <div className="sessionContainer">
      <ResponsiveContainer width="100%" height={200}>
        <h1 className="sessionTitle">Durée moyenne des sessions</h1>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {/* Dégradé linéaire du graphique */}
          <defs>
            <linearGradient id="gradient">
              <stop offset="5%" stopColor="#ffffff" stopOpacity={0.45} />
              <stop offset="60%" stopColor="#ffffff" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0.9} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            color="#ffffff"
            tickLine={false}
            axisLine={false}
            dy={10}
            padding={{ left: 10, right: 10 }}
            style={{
              fontSize: "12px",
              opacity: "0.66",
              fill: "#ffffff",
            }}
          />
          <YAxis hide /> {/* Cache l'axe Y */}
          <Tooltip cursor={false} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="url(#gradient)"
            strokeWidth={2}
            strokeOpacity={1}
            dot={null}
            activeDot={{ r: 4, fill: "white" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default SessionChart;
