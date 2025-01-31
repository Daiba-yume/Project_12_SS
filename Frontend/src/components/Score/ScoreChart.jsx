/* eslint-disable react/prop-types */
import "./ScoreChart.scss";
import {
  ResponsiveContainer,
  RadialBar,
  RadialBarChart,
  PolarAngleAxis,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import { getUserScoreData } from "../../Service/apiService";

function ScoreChart({ id }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserScoreData(id);
        console.log("Données brutes reçues :", data);

        setUserData([{ name: "Score", value: (data?.score || 0) * 100 }]);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Vérification des données
  if (!userData) {
    return <p>Aucune donnée score trouvée pour cet utilisateur.</p>;
  }

  const legendScore = () => (
    <div className="legendScore">
      {userData.length > 0 && (
        <>
          <div className="score">{userData[0].value}%</div>
          <div className="detail">de votre objectif</div>
        </>
      )}
    </div>
  );
  return (
    <div className="scoreContainer">
      <h1>Score</h1>
      <ResponsiveContainer className="chartScore" width="100%" height="90%">
        <RadialBarChart
          data={userData}
          cx="50%"
          cy="50%"
          barSize={10}
          innerRadius={70}
          outerRadius={80}
          startAngle={90}
          endAngle={360}
        >
          <Legend content={legendScore} />
          <RadialBar dataKey="value" cornerRadius={20} fill="#E60000" />
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default ScoreChart;
