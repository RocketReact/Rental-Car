import css from "./NotFound.module.css";
import carCrash from "/carCrashed.webp";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCarsBrand } from "../../lib/api/brands.js";

export default function NotFound() {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    async function fetchProduct() {
      const data = await getCarsBrand();
      setBrands(data);
    }
    fetchProduct();
  }, []);
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
