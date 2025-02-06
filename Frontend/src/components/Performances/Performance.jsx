import "./Performance.scss";
import { getUserPerformanceData } from "../../Service/apiService";
import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

function Performance({ id }) {
  const [userPerformance, setUserPerformance] = useState([]); // stock les datas

  // On récupére les données performances au chargement ou quand l'id change
  useEffect(() => {
    const fetchData = async () => {
      const performance = await getUserPerformanceData(id); // call API to recover les datas
      setUserPerformance(performance); // met à jour l'état userPerformance avec les dataMocked
    };
    if (id) {
      fetchData(); // recover datas if id present
    }
  }, [id]); // If "id" change relance l'éxécution

  // Vérification des données
  if (!userPerformance) {
    return <p>Aucune donnée performance trouvée pour cet utilisateur.</p>;
  }

  return (
    <section className="perfoContainer">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={userPerformance}
          cx="48%"
          cy="50%"
          outerRadius={window.innerWidth > 1024 ? "70%" : "50%"}
        >
          {/* Désactivation des lignes radiales */}
          <PolarGrid className="radarGrid" radialLines={false} />
          <PolarAngleAxis
            dataKey="kind"
            tick={{ fontSize: 10, fill: "#fff", dy: 4 }}
          />
          <Radar
            name="Performance"
            dataKey="value"
            fill="#FF0101"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </section>
  );
}
export default Performance;
