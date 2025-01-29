/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getUserActivityData } from "../../Service/apiService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./ActivityChart.scss";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="customTooltip">
        <p className="label">{`${payload[0].value}kg`}</p>
        <p className="label">{`${payload[1].value}Kcal`}</p>
      </div>
    );
  }
  return null;
};

const ActivityChart = ({ id }) => {
  const [userActivity, setUserActivity] = useState([]); // stocke les données d'activité de l'utilisateur

  // récupére les données de l'utilisateur lorsque l'ID change
  useEffect(() => {
    const fetchData = async () => {
      const activity = await getUserActivityData(id); // Passez l'ID récupéré à la fonction getUserData
      setUserActivity(activity); // met à jour l'état userActivity avec les dataMocked
    };
    // Si l'ID dispo, récupération des data
    if (id) {
      fetchData();
    }
  }, [id]);

  // Vérification des données
  if (!userActivity) {
    return <p>Aucune donnée d`activité trouvée pour cet utilisateur.</p>;
  }

  return (
    <div className="activityContainer">
      <h1>Activité quotidienne</h1>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={userActivity} // Passez les sessions comme données
          margin={{ top: 40, right: 10, left: 50, bottom: 5 }}
          barSize={10}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="2" vertical={false} />
          <XAxis
            dataKey="day"
            width={"auto"}
            tickLine={false}
            axisLine={{ stroke: "#d1d2d6", strokeWidth: "2" }}
            padding={{ left: -40, right: -40 }}
            dy={15}
          />
          {/* POIDS */}
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            dx={25}
            domain={["dataMin -1", "dataMax +2"]}
            interval={1}
          />
          {/* CALORIES */}
          <YAxis
            yAxisId="left"
            orientation="left"
            axisLine={false}
            tickLine={false}
            hide
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              top: -10,
              right: 20,
              fontSize: "14px",
            }}
            formatter={(value) => (
              <span style={{ marginLeft: 10, color: "#74798C" }}>{value}</span>
            )}
          />
          <Bar
            dataKey="kilogram"
            fill="#282D30"
            name="Poids (kg)"
            radius={[10, 10, 0, 0]}
            yAxisId="right"
          />
          <Bar
            dataKey="calories"
            fill="#E60000"
            name="Calories brûlées (Kcal)"
            radius={[10, 10, 0, 0]}
            yAxisId="left"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
