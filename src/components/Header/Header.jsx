import css from "./Header.module.css";
import { Link } from "react-router-dom";
import RentalCar from "/RentalCar.svg";
const Header = () => {
  return (
    <header className="container">
      <nav className={css.nav}>
        <Link to="/">
          <img src={RentalCar} alt="Rental Car" />
        </Link>
        <menu className={css.menu}>
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
        </menu>
      </nav>
    </header>
  );
};

export default Header;
