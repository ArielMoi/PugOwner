import "./Nav.css";
import { Link } from "react-router-dom";
import logo from '../../img/logo.png'

function Nav() {
  return (
    <div className="Nav">
      <img src={logo} alt='logo' />
      <ol>
        <li>
          <Link to="/">MyPug</Link>
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
