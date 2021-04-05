import "./AlbumNote.css";

import pug1 from "../../img/cool-pug.png";
import pug2 from "../../img/drinking-pug.jpg";
import pug3 from "../../img/go-to-school-pug.jpg";
import pug4 from "../../img/jetpack-pug.png";
import pug5 from "../../img/magican-pug.jpg";
import pug6 from "../../img/music_pug.jpg";
import pug7 from "../../img/pug-dead.jpg";
import pug8 from "../../img/pug-eating.jpg";
import pug9 from "../../img/pug-waiting-food.png";
import pug10 from "../../img/pug-waiting-trip.jpg";
import pug11 from "../../img/pug-waving.jpg";

const pugPics = {
  1: pug1,
  2: pug2,
  3: pug3,
  4: pug4,
  5: pug5,
  6: pug6,
  7: pug7,
  8: pug8,
  9: pug9,
  10: pug10,
  11: pug11,
};

function NotificationWindow(props) {
  return (
    <div className="album-window">
      <img src={pugPics[props.pugNum]} alt="pug" />
      <h3>{props.message}</h3>
      <div className="btns">
        <button onClick={props.editClick}>
          <i className="far fa-edit"></i>
        </button>
        <button onClick={props.deleteClick}>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
}

export default NotificationWindow;
