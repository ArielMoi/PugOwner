import PugStage from "../../Components/PugStage/PugStage.Component";
import LifeBarsBoard from "../../Components/LifeBarsBoard/LifeBarsBoard.Component";
import Bag from "../../Components/Bag/Bag.Component";
import Button from "../../Components/Button/Button.Component";
import { useState, useEffect } from "react";
import ItemSpend from "../../Components/ItemSpend/ItemSpend.Component";
import axios from "axios";

//imgs
import bagImg from "../../img/bag.png";
import appleImg from "../../img/apple.jpg";
import bananaImg from "../../img/banana.jpg";
import bawlImg from "../../img/bawl-food.jpg";
import chickenImg from "../../img/chicken.jpg";
import ballToy from "../../img/ball.jpg";
import ballsToy from "../../img/balls.jpg";
import chewingToy from "../../img/chweing-toy.jpg";
import stickToy from "../../img/stick.jpg";

const API = `https://605b251627f0050017c0645f.mockapi.io/users/`;
let currentUserId;

const Home = () => {
  let currentUserHealth, currentUserBag;

  const postCurrentUser = async () => {
    let { data } = await axios.post(API, {
      health: [100, 100, 100],
      bag: {
        food: {
          apple: [appleImg, 1],
          banana: [bananaImg, 1],
          bawl: [bawlImg, 1],
          chicken: [chickenImg, 1],
        },
        toys: {
          ball: [ballToy, 1],
          balls: [ballsToy, 1],
          chewing: [chewingToy, 1],
          stick: [stickToy, 1],
        },
      },
    });

    currentUserId = data.id;
    localStorage.setItem("id", { currentUserId });  
  };

  const collectStartData = async () => {
    let { data } = await axios.get(`${API}${localStorage.getItem("id")}`);
    currentUserHealth = data.health;
    currentUserBag = data.bag;
    console.log(data);
  };

  if (localStorage.getItem("id")) {
    collectStartData();
  } else {
    postCurrentUser();
    collectStartData();
  }

  const [bagVisibility, setBagVisibility] = useState("hidden");
  // const [health, setHealth] = useState([100, 100, 100]); // [0] -> hunger, [1] -> happy, [2] -> tired
  const [currentItem, setCurrentItem] = useState("");
  const [itemSpendWindowVisibility, setItemSpendWindowVisibility] = useState(
    "hidden"
  );
  const [health, setHealth] = useState(currentUserHealth);
  const [userBag, setUserBag] = useState(currentUserBag);
  // const [userBag, setUserBag] = useState({
  //   food: {
  //     apple: [appleImg, 1],
  //     banana: [bananaImg, 1],
  //     bawl: [bawlImg, 1],
  //     chicken: [chickenImg, 1],
  //   },
  //   toys: {
  //     ball: [ballToy, 1],
  //     balls: [ballsToy, 1],
  //     chewing: [chewingToy, 1],
  //     stick: [stickToy, 1],
  //   },
  // });

  const clickOnBag = () => {
    // open and close bag
    bagVisibility === "hidden"
      ? setBagVisibility("visible")
      : setBagVisibility("hidden");
  };

  useEffect(
    () => {
      setTimeout(() => {
        setHealth([health[0] - 5, health[1] - 5, health[2] - 5]);
      }, 55000); // 900000 -> 15min
    },
    [health],
    []
  );

  const clickOnItem = (userItem) => {
    let bagTemp = { ...userBag };

    // updates user bag for food and for toys
    Object.entries(bagTemp.food).forEach(([name, item]) => {
      if (name === userItem.target.alt) {
        health[0] <= 95 && setHealth([health[0] + 5, health[1], health[2]]); // adding to hunger health
        if (item[1] !== 0) bagTemp[name] = [item[0], --item[1]];
      }
    });

    Object.entries(bagTemp.toys).forEach(([name, item]) => {
      // iterate over current bag to update the right item
      if (name === userItem.target.alt) {
        health[1] <= 95 && setHealth([health[0], health[1] + 5, health[2]]); // adding to happy health
        if (item[1] !== 0) bagTemp[name] = [item[0], --item[1]];
      }
    });

    setUserBag(bagTemp); // update state

    // show message of item used
    setCurrentItem(userItem.target.src);
    setItemSpendWindowVisibility("visible");
    setTimeout(() => {
      setItemSpendWindowVisibility("hidden");
    }, 3000);
  };

  return (
    <div>
      <PugStage />
      <LifeBarsBoard
        foodAmount={health[0]}
        happinessAmount={health[1]}
        sleepAmount={health[2]}
      />
      <Button img={bagImg} onClickFunc={clickOnBag} />
      <Bag
        clickOnItem={(event) => clickOnItem(event)}
        bagObj={userBag}
        visibility={bagVisibility}
      />
      <ItemSpend img={currentItem} visibility={itemSpendWindowVisibility} />
    </div>
  );
};

export default Home;
