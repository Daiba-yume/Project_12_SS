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

// eslint-disable-next-line react/prop-types
function Performance({ id }) {
  const [userPerformance, setUserPerformance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const performance = await getUserPerformanceData(id);

      console.log("Données récupérées :", performance); // Ajout pour debug
      setUserPerformance(performance);
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  // Vérification des données
  if (!userPerformance) {
    return <p>Aucune donnée performance trouvée pour cet utilisateur.</p>;
  }

  return (
    <div className="perfoContainer">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={userPerformance} cx="50%" cy="50%" outerRadius="70%">
          {/* Désactivation des lignes radiales */}
          <PolarGrid radialLines={false} />
          <PolarAngleAxis dataKey="kind" />
          <Radar
            name="Performance"
            dataKey="value"
            fill="#E60000"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default Performance;
