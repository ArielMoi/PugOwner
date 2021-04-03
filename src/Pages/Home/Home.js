import PugStage from '../../Components/PugStage/PugStage.Component'
import LifeBarsBoard from '../../Components/LifeBarsBoard/LifeBarsBoard.Component'
import Bag from '../../Components/Bag/Bag.Component'
import Button from '../../Components/Button/Button.Component'
import { useState, useEffect, useImperativeHandle } from "react";
import ItemSpend from '../../Components/ItemSpend/ItemSpend.Component'

//imgs
import bagImg from "../../img/bag.png"; 
import appleImg from '../../img/apple.jpg'
import bananaImg from '../../img/banana.jpg'
import bawlImg from '../../img/bawl-food.jpg'
import chickenImg from '../../img/chicken.jpg'
import ballToy from '../../img/ball.jpg'
import ballsToy from '../../img/balls.jpg'
import chewingToy from "../../img/chweing-toy.jpg";
import stickToy from "../../img/stick.jpg";

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
  const [currentItem, setCurrentItem] = useState('')
  const [itemSpendWindowVisibility, setItemSpendWindowVisibility] = useState('hidden')
  const [userBag, setUserBag] = useState({
    food: {'apple': [appleImg, 1], 'banana': [bananaImg,2 ], 'bawl': [bawlImg,1 ], 'chicken':[chickenImg, 1]},
    toys: {'ball': [ballToy, 1], 'balls': [ballsToy, 1], 'chewing':[chewingToy, 1], 'stick': [stickToy, 1]},
  })

  const clickOnBag = () => { // open and close bag
    bagVisibility === "hidden"
      ? setBagVisibility("visible")
      : setBagVisibility("hidden");
  }

  useEffect(()=> {
      setTimeout(() => {
    setHealth([health[0]-5, health[1]-5, health[2]-5]);
  }, 55000); // 900000 -> 15min
  }, [health], [])



  // on mouse down on mouse up

  const clickOnItem = (userItem) => {
    console.log(userBag[userItem.target.alt]);
    let bagTemp = { ...userBag };

    // updates usr bag for food anf for toys
    Object.entries(bagTemp.food).forEach(([name, item]) => {
      if (name === userItem.target.alt){
        if (item[1] !== 0) bagTemp[name] = [item[0], --item[1]];
      }
    });

    Object.entries(bagTemp.toys).forEach(([name, item]) => {
      if (name === userItem.target.alt){
        if (item[1] !== 0) bagTemp[name] = [item[0], --item[1]];
      }
    });

    setUserBag(bagTemp) // update state

    // show message of item used
    setCurrentItem(userItem.target.src);
    setItemSpendWindowVisibility("visible");
    setTimeout(() => {
      setItemSpendWindowVisibility('hidden')
    }, 3000)
  }

    return (
      <div>
        <PugStage />
        <LifeBarsBoard
          foodAmount={health[0]}
          sleepAmount={health[1]}
          happinessAmount={health[2]}
        />
        <Button img={bagImg} onClickFunc={clickOnBag} />
        <Bag
          clickOnItem={(event) => clickOnItem(event)} 
          bagObj={userBag}
          visibility={bagVisibility}
        />
        < ItemSpend img={currentItem  } visibility={itemSpendWindowVisibility}/>
      </div>
    );
}

export default Home;