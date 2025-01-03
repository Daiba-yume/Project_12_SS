import { Link } from "react-router-dom";
import "./Header.scss";
import logoNav from "../../assets/logoNav.png";

function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logoNav} alt="logo" />
      </Link>
      <div className="navContainer">
        <Link to="/">Accueil</Link>
        <Link to="/">Profil</Link>
        <Link to="/">Réglages</Link>
        <Link to="/">Communauté</Link>
      </div>
    </header>
  );
}

export default Header;
