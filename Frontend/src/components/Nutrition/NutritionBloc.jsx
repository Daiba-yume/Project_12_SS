/* eslint-disable react/prop-types */
import "./NutritionBloc.scss";
import caloriesIcon from "../../assets/calories.png";
import proteinsIcon from "../../assets/proteins.png";
import glucidesIcon from "../../assets/glucides.png";
import lipidesIcon from "../../assets/lipides.png";
import { getUserKpisData } from "../../Service/apiService";
import { useEffect, useState } from "react";

function NutritionBloc({ id }) {
  const [userKpis, setUserKpis] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserKpisData(id);
      setUserKpis(data);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  if (!userKpis) {
    return <p>Aucune donnée Kpis trouvée pour cet utilisateur.</p>;
  }

  return (
    <div className="nutriBloc">
      <div className="nutriInfo">
        <div className="icon">
          <img src={caloriesIcon} alt="Calories" />
        </div>
        <div className="details">
          <p className="value">
            {userKpis.calorieCount
              ? userKpis.calorieCount.toLocaleString("en-US") + "kCal"
              : ""}
          </p>
          <p className="label">Calories</p>
        </div>
      </div>

      <div className="nutriInfo">
        <div className="icon">
          <img src={proteinsIcon} alt="Protéines" />
        </div>
        <div className="details">
          <p className="value">
            {userKpis.proteinCount ? userKpis.proteinCount + "g" : ""}
          </p>
          <p className="label">Protéines</p>
        </div>
      </div>

      <div className="nutriInfo">
        <div className="icon">
          <img src={glucidesIcon} alt="Glucides" />
        </div>
        <div className="details">
          <p className="value">
            {userKpis.carbohydrateCount ? userKpis.carbohydrateCount + "g" : ""}
          </p>
          <p className="label">Glucides</p>
        </div>
      </div>

      <div className="nutriInfo">
        <div className="icon">
          <img src={lipidesIcon} alt="Lipides" />
        </div>
        <div className="details">
          <p className="value">
            {userKpis.lipidCount ? userKpis.lipidCount + "g" : ""}
          </p>
          <p className="label">Lipides</p>
        </div>
      </div>
    </div>
  );
}

export default NutritionBloc;
