import "./NutritionBloc.scss";
import caloriesIcon from "../../assets/calories.png";
import proteinsIcon from "../../assets/proteins.png";
import glucidesIcon from "../../assets/glucides.png";
import lipidesIcon from "../../assets/lipides.png";
import { getUserData } from "../../Service/apiService";
import { useEffect, useState } from "react";

function NutritionBloc({ id }) {
  const [userKpis, setUserKpis] = useState({}); // stock les datas

  // On récupére les données KPIS au chargement ou quand l'id change
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData(id); // call API to recover les datas
      setUserKpis(data.keyData); // met à jour l'état userKPIS avec les dataMocked
    };
    if (id) {
      fetchData(); // recover datas if id present
    }
  }, [id]); // If "id" change relance l'éxécution

  if (!userKpis) {
    return <p>Aucune donnée Kpis trouvée pour cet utilisateur.</p>;
  }

  const nutrients = [
    {
      label: "Calories",
      value: userKpis.calorieCount,
      unit: "kCal",
      icon: caloriesIcon,
    },
    {
      label: "Proteins",
      value: userKpis.proteinCount,
      unit: "g",
      icon: proteinsIcon,
    },
    {
      label: "Glucides",
      value: userKpis.carbohydrateCount,
      unit: "g",
      icon: glucidesIcon,
    },
    {
      label: "Lipides",
      value: userKpis.lipidCount,
      unit: "g",
      icon: lipidesIcon,
    },
  ];

  return (
    <section className="nutriBloc">
      {nutrients.map(({ label, value, unit, icon }, index) => (
        <div className="nutriInfo" key={index}>
          <div className="icon">
            <img src={icon} alt={label} />
          </div>
          <div className="details">
            <p className="value">
              {/* Affiche la valeur de la nutrition avec son unité, formatée avec une virgule pour les milliers */}
              {value ? value.toLocaleString("en-US") + unit : ""}
            </p>
            <p className="label">{label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default NutritionBloc;
