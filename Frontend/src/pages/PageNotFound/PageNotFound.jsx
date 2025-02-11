import { Link } from "react-router-dom";
import "./PageNotFound.scss";

function PageNotFound() {
  return (
    <div className="notFound">
      <h2 className="title">404</h2>
      <p className="error">
        Oups ! La page que vous demandez n {"'"}existe pas.
      </p>
      <Link to="/" className="link">
        Retourner sur la page d {"'"}accueil
      </Link>
    </div>
  );
}

export default PageNotFound;
