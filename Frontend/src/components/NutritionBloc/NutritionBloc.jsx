import "./NutritionBloc.scss";
import caloriesIcon from "../../assets/calories.png";
import proteinsIcon from "../../assets/proteins.png";
import glucidesIcon from "../../assets/glucides.png";
import lipidesIcon from "../../assets/lipides.png";

function NutritionBloc() {
  const nutritionData = [
    { icon: caloriesIcon, label: "Calories", value: "1.930Cal" },
    { icon: proteinsIcon, label: "Proteines", value: "155g" },
    { icon: glucidesIcon, label: "Glucides", value: "290g" },
    { icon: lipidesIcon, label: "Lipides", value: "50g" },
  ];
  return (
    <div className="nutrition-bloc">
      {nutritionData.map((item, index) => (
        <div key={index} className="nutrition-info">
          <div className="icon">
            <img src={item.icon} alt={item.label} />
          </div>
          <div className="details">
            <p className="value">{item.value}</p>
            <p className="label">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NutritionBloc;
