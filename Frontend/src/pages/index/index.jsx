import ActivityChart from "../../components/ActivityChart/ActivityChart";
import WaveChart from "../../components/WaveChart/WaveChart";
import ChartRadar from "../../components/RadarChart/ChartRadar";
import ScoreChart from "../../components/ScoreChart/ScoreChart";
import SideBar from "../../components/SideBar/SideBar";
import UserProfile from "../../components/Profil/UserProfile";
import "./index.scss";
import NutritionBloc from "../../components/NutritionBloc/NutritionBloc";

function Index() {
  return (
    <>
      <SideBar />
      <div className="main-content">
        <div className="left-content">
          <UserProfile />
          <ActivityChart />
          <div className="row-chart">
            <WaveChart />
            <ChartRadar />
            <ScoreChart />
          </div>
        </div>
        <NutritionBloc />
      </div>
    </>
  );
}

export default Index;
