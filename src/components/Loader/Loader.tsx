//@ts-ignore
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loadingBackdrop}>
      <div className={css.spinner}></div>
    </div>
  );
}
