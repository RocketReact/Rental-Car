import css from "./Banner.module.css";
import bannerImg from "../../../public/Banner.webp";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function Banner() {
  const { pathname } = useLocation();

  //Dont scroll => y-coordinate
  useEffect(() => {
    if (pathname === "/") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [pathname]);

  return (
    <div className={css.banner}>
      <img
        src={bannerImg}
        alt="Banner"
        className={css.bannerImg}
        fetchPriority="high"
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
