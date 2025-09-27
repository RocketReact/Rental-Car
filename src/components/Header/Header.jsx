import css from "./Header.module.css";
import { NavLink, Link } from "react-router-dom";
import RentalCar from "/RentalCar.svg";
const Header = () => {
  return (
    <header className={css.container}>
      <nav className={css.nav}>
        <Link to="/">
          <img src={RentalCar} alt="Rental Car" />
        </Link>
        <div className={css.menu}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? css.active : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) => (isActive ? css.active : "")}
          >
            Catalog
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
