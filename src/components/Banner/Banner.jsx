import css from "./Banner.module.css";
import bannerImg from "../../../public/Banner.webp";
export default function Banner() {
  return (
    <div className={css.banner}>
      <img src={bannerImg} alt="Banner" className={css.bannerImg} />
      <div className={css.textBannerContainer}>
        <h1 className={css.secondTitle}>Find your perfect rental car</h1>
        <h2>Reliable and budget-friendly rentals for any journey</h2>
        <button className={css.btnBanner}>View Catalog</button>
      </div>
    </div>
  );
}
