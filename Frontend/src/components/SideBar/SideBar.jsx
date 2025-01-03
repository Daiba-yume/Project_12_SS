import { Link } from "react-router-dom";
import "./SideBar.scss";
import YogaIcon from "../../assets/yoga.png";
import SwimIcon from "../../assets/swim.png";
import BikeIcon from "../../assets/bike.png";
import WeightIcon from "../../assets/weight.png";

function SideBar() {
  return (
    <div className="sideBarContainer">
      <div className="imgSideBar">
        <Link to="/">
          <img src={YogaIcon} alt="Icon-Yoga" />
        </Link>
        <Link to="/">
          <img src={SwimIcon} alt="Icon-Swim" />
        </Link>
        <Link to="/">
          <img src={BikeIcon} alt="Icon-Bike" />
        </Link>
        <Link to="/">
          <img src={WeightIcon} alt="Icon-Weight" />
        </Link>
      </div>
      <footer className="footer">
        <p>Copyright, SportSee 2020</p>
      </footer>
    </div>
  );
}

export default SideBar;
