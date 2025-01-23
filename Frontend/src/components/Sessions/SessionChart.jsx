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
import PropTypes from "prop-types";

/* Custom Tooltip */
const CustomCursor = ({ points }) => {
  const { x } = points[0]; // Prend la position `x` de la souris
  return (
    <Rectangle
      fill="#000000"
      x={x}
      opacity={0.1}
      y={0}
      width={500}
      height={200}
    />
  );
};
// Validation des props pour CustomCursor
CustomCursor.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired, // Chaque point doit avoir `x` comme nombre
    }).isRequired
  ),
};

// eslint-disable-next-line react/prop-types
function SessionChart({ id }) {
  const [userSession, setUserSession] = useState(null);

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
      <ResponsiveContainer width="100%" height={200}>
        <h1 className="sessionTitle">Durée moyenne des sessions</h1>
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
          <Tooltip cursor={<CustomCursor />} />
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
