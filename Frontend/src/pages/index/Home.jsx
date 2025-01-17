import ActivityChart from "../../components/Activity/ActivityChart";
import SessionChart from "../../components/Sessions/SessionChart";
import Performance from "../../components/Performances/Performance";
import ScoreChart from "../../components/Score/ScoreChart";
import SideBar from "../../components/SideBar/SideBar";
import UserProfile from "../../components/Profil/UserProfile";
import "./Home.scss";
import NutritionBloc from "../../components/Nutrition/NutritionBloc";
import { useParams } from "react-router-dom";

function Home() {
  const { id } = useParams(); /*  récupérer l'ID depuis l'URL. */
  console.log("User ID:", id);
  return (
    <>
      <SideBar />
      <div className="main-content">
        <div className="left-content">
          <UserProfile id={id} />
          <ActivityChart id={id} />
          <div className="row-chart">
            <SessionChart id={id} />
            <Performance id={id} />
            <ScoreChart id={id} />
          </div>
        </div>
        <NutritionBloc id={id} />
      </div>
    </>
  );
}

export default Home;
