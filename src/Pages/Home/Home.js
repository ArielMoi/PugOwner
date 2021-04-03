import PugStage from '../../Components/PugStage/PugStage.Component'
import LifeBarsBoard from '../../Components/LifeBarsBoard/LifeBarsBoard.Component'
import Bag from '../../Components/Bag/Bag.Component'
import Button from '../../Components/Button/Button.Component'
import bagImg from "../../img/bag.png";
import { useState, useEffect } from "react";
import appleImg from '../../img/apple.jpg'
import bananaImg from '../../img/banana.jpg'
import bawlImg from '../../img/bawl-food.jpg'
import chickenImg from '../../img/chicken.jpg'
import ballToy from '../../img/ball.jpg'

const tempBag = {
  food: {1: [appleImg, 'apple'], 5: [bananaImg, 'banana'], 2: [bawlImg, 'bawl'],},
  toys: {2: [ballToy, 'ball']}
}

const Home = () => {

  const [bagVisibility, setBagVisibility] = useState('hidden');

  const clickOnBag = () => {
    bagVisibility === "hidden"
      ? setBagVisibility("visible")
      : setBagVisibility("hidden");
  }

    return (
      <div>
        <PugStage />
        <LifeBarsBoard
          foodAmount="80"
          sleepAmount="90"
          tripAmount="50"
          happinessAmount="70"
        />
        <Button img={bagImg} onClickFunc={clickOnBag}/>
        <Bag bagObj={tempBag} visibility={bagVisibility}/>
      </div>
    );
}

export default Home;