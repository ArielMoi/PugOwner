import PugStage from "../../Components/PugStage/PugStage.Component";
import LifeBarsBoard from "../../Components/LifeBarsBoard/LifeBarsBoard.Component";
import Bag from "../../Components/Bag/Bag.Component";
import Button from "../../Components/Button/Button.Component";
import { useState, useEffect } from "react";
import ItemSpend from "../../Components/ItemSpend/ItemSpend.Component";
import axios from "axios";
import "./Home.css";

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

const Home = () => {
  // * initializing states
  const [bagVisibility, setBagVisibility] = useState("hidden");
  const [currentItem, setCurrentItem] = useState("");
  const [itemSpendWindowVisibility, setItemSpendWindowVisibility] = useState(
    "hidden"
  );
  const [hunger, setHunger] = useState(100);
  const [happy, setHappy] = useState(100);
  const [userBag, setUserBag] = useState({
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
  });

  // * UPDATE API functions
  const postCurrentUser = async () => {
    try {
      let { data } = await axios.post(API, {
        hunger: 100,
        happy: 100,
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

      localStorage.setItem("id", `${data.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const collectStartData = async () => {
    try {
      let id = localStorage.getItem("id");
      let { data } = await axios.get(`${API}${id}`);

      setHunger(data.hunger);
      setHappy(data.happy);
      setUserBag(data.bag);
    } catch (e) {
      console.log(e);
    }
  };

  async function updateUserInApi() {
    await axios.put(`${API}${localStorage.getItem("id")}`, {
      hunger,
      happy,
      bag: userBag,
    });
  }


  // * CLICK ON function
  const clickOnBag = () => {
    // open and close bag
    bagVisibility === "hidden"
      ? setBagVisibility("visible")
      : setBagVisibility("hidden");
  };

  const clickOnItem = async (userItem) => {
    let bagTemp = { ...userBag };

    // updates user bag - iterate over food and over toys
    Object.entries(bagTemp.food).forEach(([name, item]) => {
      if (name === userItem.target.alt) {
        hunger <= 95 && setHunger(hunger + 5);
        if (item[1] !== 0) bagTemp[name] = [item[0], --item[1]];
      }
    });

    Object.entries(bagTemp.toys).forEach(([name, item]) => {
      // iterate over current bag to update the right item
      if (name === userItem.target.alt) {
        happy <= 95 && setHappy(happy + 5);
        if (item[1] !== 0) bagTemp[name] = [item[0], --item[1]];
      }
    });

    await setUserBag(bagTemp); // update state
    updateUserInApi();

    // show message of item used
    setCurrentItem(userItem.target.src);
    setItemSpendWindowVisibility("visible");
    setTimeout(() => {
      setItemSpendWindowVisibility("hidden");
    }, 2000);
  };


  //* rendering methods
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      console.log("not found user");
      postCurrentUser();
    } else {
      console.log("found user");
      collectStartData();
    }
  }, []);

  useEffect(
    () => {
      setTimeout(async () => {
        await setHunger(hunger >= 5 && hunger - 5);
        await setHappy(happy >= 5 && happy - 5);
        updateUserInApi();
      }, 30000); // 900000 -> 15min
    },
    [hunger, happy],
    []
  );

  return (
    <div className="home">
      <PugStage />
      <LifeBarsBoard foodAmount={hunger} happinessAmount={happy} />
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

// TODO:
// render don't work as expected -> bars don't update correctly.