import ActivityChart from "../../components/Activity/ActivityChart";
import SessionChart from "../../components/Sessions/SessionChart";
import Performance from "../../components/Performances/Performance";
import ScoreChart from "../../components/Score/ScoreChart";
import SideBar from "../../components/SideBar/SideBar";
import UserProfile from "../../components/Profil/UserProfile";
import "./index.scss";
import NutritionBloc from "../../components/Nutrition/NutritionBloc";
import { useParams } from "react-router-dom";

function Index() {
  const { id } = useParams(); /*  récupérer l'ID depuis l'URL. */
  return (
    <>
      <SideBar />
      <div className="main-content">
        <div className="left-content">
          <UserProfile useParamId={id} />
          <ActivityChart useParamId={id} />
          <div className="row-chart">
            <SessionChart useParamId={id} />
            <Performance useParamId={id} />
            <ScoreChart useParamId={id} />
          </div>
        </div>
        <NutritionBloc useParamId={id} />
      </div>
    </>
  );
}

export default Index;
