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
      x={x - 25}
      opacity={0.1}
      y={y - 10}
      width={width * 100}
      height={height * 200}
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
      <ResponsiveContainer width="100%" height="100%">
        {" "}
        <div className="titleApp">
          <h2>Durée moyenne des sessions</h2>
        </div>
        <LineChart
          data={userSession}
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
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
          <Line
            type="monotone"
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
