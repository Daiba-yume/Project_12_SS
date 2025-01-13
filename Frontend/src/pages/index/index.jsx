import ActivityChart from "../../components/Activity/ActivityChart";
import SessionChart from "../../components/Sessions/SessionChart";
import Performance from "../../components/Performances/Performance";
import ScoreChart from "../../components/Score/ScoreChart";
import SideBar from "../../components/SideBar/SideBar";
import UserProfile from "../../components/Profil/UserProfile";
import "./index.scss";
import NutritionBloc from "../../components/Nutrition/NutritionBloc";

function Index() {
  return (
    <>
      <SideBar />
      <div className="main-content">
        <div className="left-content">
          <UserProfile />
          <ActivityChart />
          <div className="row-chart">
            <SessionChart />
            <Performance />
            <ScoreChart />
          </div>
        </div>
        <NutritionBloc />
      </div>
    </>
  );
}

export default Index;
