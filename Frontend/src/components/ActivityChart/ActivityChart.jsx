import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { USER_ACTIVITY } from "../../data/data";
import "./ActivityChart.scss";

const ActivityChart = () => {
  const userId = 12;
  // On Récupére les données de l'utilisateur
  const userActivity = USER_ACTIVITY.find((user) => user.userId === userId);

  // Vérification des données
  if (!userActivity) {
    return <p>Aucune donnée d`activité trouvée pour cet utilisateur.</p>;
  }

  return (
    <div className="char-container">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={userActivity.sessions} // Passez les sessions comme données
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            tickFormatter={(_, index) => index + 1} // Numéros 1 à 10 sur l'axe X
          />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="kilogram"
            fill="#282D30"
            name="Poids (kg)"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="calories"
            fill="#E60000"
            name="Calories brûlées"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
