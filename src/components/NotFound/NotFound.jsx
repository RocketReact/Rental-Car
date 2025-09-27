import css from "./NotFound.module.css";
import carCrash from "/carCrashed.webp";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className={css.mainContainerNotFound}>
      <h1 className={css.notFoundFirstTittle}>404</h1>

      <img src={carCrash} alt="Not found" className={css.notFoundImg} />
      <h2 className={css.notFoundSecondTittle}>Page Not Found</h2>
      <p className={css.notFoundDescription}>
        The page you are looking for does not exist or has been permanently
        deleted.
      </p>

      <Link to="/">
        <button className={css.btnNotFound}>Back to homepage</button>
      </Link>
    </div>
  );
}
