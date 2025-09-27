import css from "./Banner.module.css";
import bannerImg from "../../../public/Banner.webp";
import { Link } from "react-router-dom";
export default function Banner() {
  return (
    <div className={css.banner}>
      <img
        src={bannerImg}
        alt="Banner"
        className={css.bannerImg}
        loading="lazy"
        fetchpriority="high"
        decoding="async"
      />
      <div className={css.textBannerContainer}>
        <h1 className={css.firstBannerTitle}>Find your perfect rental car</h1>
        <h2 className={css.secondBannerTitle}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <Link to="/catalog">
          <button className={css.btnBanner}>View Catalog</button>
        </Link>
      </div>
    </div>
  );
}
