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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  // On récupére les données de l'utilisateur au chargement ou lorsque l'ID change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const activity = await getUserActivityData(id); // call API to recover les datas
        if (!activity) {
          // Si aucune donnée n'est retournée, on redirige vers la page 404
          navigate("/404");
        } else {
          setUserActivity(activity); // met à jour l'état userActivity avec les dataMocked
        }
      } catch (error) {
        console.log("Erreur lors de la récupération des données:", error);
        navigate("/404"); // En cas d'erreur dans l'appel API, on redirige également
      }
    };
    // Si l'ID dispo, récupération des data
    if (id) {
      fetchData();
    }
  }, [id, navigate]); // If "id" change relance l'éxécution

  // Vérification des données
  if (!userActivity) {
    return <p>Aucune donnée d`activité trouvée pour cet utilisateur.</p>;
  }

  return (
    <section className="activityContainer">
      <h1>Activité quotidienne</h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={userActivity} // Passez les sessions comme données
          margin={{ top: 5, right: 0, left: 20, bottom: 5 }}
          barSize={10}
          barGap={8}
          width={800}
          height={250}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="day"
            tickFormatter={(_, index) => index + 1} // Remplace les dates par des nombres séquentiels (1, 2, 3...)
            width={"auto"}
            tickLine={false}
            axisLine={{ stroke: "#d1d2d6", strokeWidth: "2" }}
            padding={{ left: -50, right: -50 }}
            dy={5}
            tick={{ fill: "#9B9EAC" }} // Applique couleur aux chiffres sur l'axe X
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
            tick={{ fill: "#9B9EAC" }} // Applique couleur aux chiffres sur l'axe Y to the right
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
            barSize={7}
            radius={[10, 10, 0, 0]}
            yAxisId="right"
          />
          <Bar
            dataKey="calories"
            fill="#E60000"
            name="Calories brûlées (Kcal)"
            barSize={7}
            radius={[10, 10, 0, 0]}
            yAxisId="left"
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default ActivityChart;
