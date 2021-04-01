import PugStage from '../../Components/PugStage/PugStage.Component'
import LifeBarsBoard from '../../Components/LifeBarsBoard/LifeBarsBoard.Component'
import Bag from '../../Components/Bag/Bag.Component'
import Button from '../../Components/Button/Button.Component'
import bagImg from "../../img/bag.png";
import { useState, useEffect } from "react";


const Home = () => {

  const [bagVisibility, setBagVisibility] = useState('hidden');

  const clickOnBag = () => {
    bagVisibility == "hidden"
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
      </div>
    );
}

export default Home;