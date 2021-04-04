import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="Nav">
      <ol>
        <li>
          <Link to="/">PugOwner</Link>
        </li>
        <li>
          <Link to="/Notifications">Notifications</Link>
        </li>
        <li>
          <Link to="/Shop">Shop</Link>
        </li>
      </ol>
    </div>
  );
}

export default Nav;
