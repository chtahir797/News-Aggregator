import "./NavBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <nav className="navbars">
          <ul className="nav-links">
            <li>
              <NavLink exact to="/" activeClassName="active-link">
                Top News
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" activeClassName="active-link">
                Search News
              </NavLink>
            </li>
            <li>
              <NavLink to="/category" activeClassName="active-link">
                Category News
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default NavBar;
