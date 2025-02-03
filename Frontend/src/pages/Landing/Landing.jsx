import { Link } from "react-router-dom";
import "./Landing.scss";

function Landing() {
  return (
    <div className="landing-container">
      <h1>Bienvenue sur SportSee !</h1>
      <p>Sélectionnez votre profil pour suivre vos performances.</p>
      <div className="buttons">
        <Link to="/user/18">
          <button>Utilisateur 18</button>
        </Link>
        <Link to="/user/12">
          <button>Utilisateur 12</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
