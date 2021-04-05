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
          <Link to="/MyAlbum">MyAlbum</Link>
        </li>
        <li>
          <Link to="/GameShop">GameShop</Link>
        </li>
      </ol>
    </div>
  );
}

export default Nav;
