import PugStage from '../../Components/PugStage/PugStage.Component'
import LifeBarsBoard from '../../Components/LifeBarsBoard/LifeBarsBoard.Component'
import Bag from '../../Components/Bag/Bag.Component'
import Button from '../../Components/Button/Button.Component'
import bagImg from "../../img/bag.png";
import { useState, useEffect, useImperativeHandle } from "react";
import appleImg from '../../img/apple.jpg'
import bananaImg from '../../img/banana.jpg'
import bawlImg from '../../img/bawl-food.jpg'
import chickenImg from '../../img/chicken.jpg'
import ballToy from '../../img/ball.jpg'
import ballsToy from '../../img/balls.jpg'
import chewingToy from "../../img/chweing-toy.jpg";
import stickToy from "../../img/stick.jpg";

const tempBag = {
  food: {1: [appleImg, 'apple'], 5: [bananaImg, 'banana'], 2: [bawlImg, 'bawl'], 3:[chickenImg, 'chicken']},
  toys: {2: [ballToy, 'ball']}
}

const item = {
  'apple': appleImg,
  'banana': bananaImg,
  'bawl': bawlImg,
  'chicken':chickenImg,
  'ball':ballToy,
  'balls':ballsToy,
  'chewing':chewingToy,
  'stick':stickToy,
}

// func to reduce health
// timer

// func to apply item

// func to choose item ( reduce amount )

const Home = () => {

  const [bagVisibility, setBagVisibility] = useState('hidden');
  const [health, setHealth] = useState([100, 100, 100]) // [0] -> hunger, [1] -> tired, [2] -> happy
  const [currentItem, setCurrentItem] = useState([])

  const clickOnBag = () => { // open and close bag
    bagVisibility === "hidden"
      ? setBagVisibility("visible")
      : setBagVisibility("hidden");
  }

  useEffect(()=> {
    console.log(health);
      setTimeout(() => {
    console.log(health);
    setHealth([health[0] - 5, health[1]-5, health[2]-5]);
  }, 55000); // 900000 -> 15min
  }, [health], [])



  // on mouse down on mouse up

  const mouseDownOnItem = (userItem) => {
    console.log(userItem.target.src);
    setCurrentItem(userItem.target.src);
  }

    return (
      <div style={{ cursor: `url(${currentItem}), auto` }}>
        <PugStage />
        <LifeBarsBoard
          foodAmount={health[0]}
          sleepAmount={health[1]}
          happinessAmount={health[2]}
          // foodAmount={hunger}
          // sleepAmount={tired}
          // happinessAmount={happy}
        />
        <Button img={bagImg} onClickFunc={clickOnBag} />
        <Bag
          clickOnItem={(event) => mouseDownOnItem(event)}
          bagObj={tempBag}
          visibility={bagVisibility}
        />
      </div>
    );
}

export default Home;