import { Link } from "react-router-dom";
import "./Header.scss";
import logoNav from "../../assets/logoNav.png";

function Header() {
  // Fonction pr empêcher la navigation par défaut
  const handlClick = (e) => {
    e.preventDefault();
  };
  return (
    <header>
      <Link to="/">
        <img src={logoNav} alt="logo" />
      </Link>
      <div className="navContainer">
        <Link to="/">Accueil</Link>
        <Link to="/" onClick={handlClick}>
          Profil
        </Link>
        <Link to="/" onClick={handlClick}>
          Réglages
        </Link>
        <Link to="/" onClick={handlClick}>
          Communauté
        </Link>
      </div>
    </header>
  );
}

export default Header;
