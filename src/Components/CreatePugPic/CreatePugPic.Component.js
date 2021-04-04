import './CreatePugPic.css'

import pug1 from '../../img/cool-pug.png'
import pug2 from '../../img/drinking-pug.jpg'
import pug3 from '../../img/go-to-school-pug.jpg'
import pug4 from '../../img/jetpack-pug.jpg'
import pug5 from '../../img/magican-pug.jpg'
import pug6 from '../../img/music_pug.jpg'
import pug7 from '../../img/pug-dead.jpg'
import pug8 from '../../img/pug-eating.jpg'
import pug9 from '../../img/pug-waiting-food.png'
import pug10 from '../../img/pug-waiting-trip.jpg'
import pug11 from '../../img/pug-waving.jpg'

const pugPics = [
  pug1,
  pug2,
  pug3,
  pug4,
  pug5,
  pug6,
  pug7,
  pug8,
  pug9,
  pug10,
  pug11
];

function CreatePugPic(props){
    return (
      <div className="create-pug-pic">
        <img
          src={pugPics[Math.floor(Math.random() * pugPics.length)]}
          alt="random pug pic"
        />
        <textarea rows="4" cols="50" />
        <button onClick={props.onClickSubmit} type="submit">Submit</button>
        <button onClick={props.onClickExit} id="x" >
          <i class="fas fa-times-circle"></i>
        </button>
      </div>
    );
}

export default CreatePugPic;