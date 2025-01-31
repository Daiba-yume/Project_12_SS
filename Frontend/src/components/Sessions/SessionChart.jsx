/* eslint-disable react/prop-types */
import { getUserSessionData } from "../../Service/apiService";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import "./SessionChart.scss";

/* Custom Tooltip bloc de time */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="customTooltip">
        <p className="tooltipText">{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

/* Custom Cursor partie sombre */
const CustomCursor = ({ points, width, height }) => {
  const { x, y } = points[0]; // Prend la position `x` de la souris
  return (
    <Rectangle
      fill="#000000"
      x={x}
      opacity={0.1}
      y={y}
      width={width}
      height={height * 100}
    />
  );
};

function SessionChart({ id }) {
  const [userSession, setUserSession] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sessions = await getUserSessionData(id);
      setUserSession(sessions);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  if (!userSession) {
    return <p>Acune donnée session trouvée pour cet utilisateur</p>;
  }
  return (
    <div className="sessionContainer">
      <div className="titleApp">
        <h2>Durée moyenne des sessions</h2>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={userSession} margin={{ top: 0, bottom: 10 }}>
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
            tickFormatter={(day) =>
              ["L", "M", "M", "J", "V", "S", "D"][day - 1]
            }
            tickLine={false}
            axisLine={false}
            dy={10}
            padding={{ left: 0, right: 0 }}
            style={{
              fontSize: "12px",
              opacity: "0.66",
              fill: "#ffffff",
            }}
          />
          <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
          {/* Cache l'axe Y */}
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="url(#gradient)"
            strokeWidth={2}
            strokeOpacity={1}
            dot={null}
            /* POINT BLANC */
            activeDot={({ cx, cy }) => (
              <>
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill="#FFFFFF"
                  stroke="#FFF"
                  strokeWidth={2}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={8}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth={8}
                />
              </>
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SessionChart;
