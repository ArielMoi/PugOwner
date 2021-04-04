import './CreatePugPic.css'
import {useRef} from 'react'

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

const pugPics = {
  1:pug1,
  2:pug2,
  3:pug3,
  4:pug4,
  5:pug5,
  6:pug6,
  7:pug7,
  8:pug8,
  9:pug9,
  10:pug10,
  11:pug11,
};

function CreatePugPic(props){
    return (
      <div className="create-pug-pic" style={{ visibility: props.visibility }}>
        <img
          src={pugPics[props.pugIndex]}
          //   src={pugPics[Math.floor(Math.random() * pugPics.length)]}
          alt="random pug pic"
        />
        {/* <textarea ref={userInput} rows="4" cols="50" /> */}
        {props.input}
        <button onClick={props.onClickSubmit} type="submit">
          Submit
        </button>
        <button onClick={props.onClickExit} id="x">
          <i className="fas fa-times-circle"></i>
        </button>
      </div>
    );
}

export default CreatePugPic;