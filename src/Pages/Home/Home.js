import PugStage from "../../Components/PugStage/PugStage.Component";
import LifeBarsBoard from "../../Components/LifeBarsBoard/LifeBarsBoard.Component";
import Bag from "../../Components/Bag/Bag.Component";
import Button from "../../Components/Button/Button.Component";
import { useState, useEffect, useRef } from "react";
import ItemSpend from "../../Components/ItemSpend/ItemSpend.Component";
import axios from "axios";
import "./Home.css";
import CreatePugPic from "../../Components/CreatePugPic/CreatePugPic.Component";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage.Component";

//imgs
import bagImg from "../../img/bag.png";
import appleImg from "../../img/apple.png";
import bananaImg from "../../img/banana.png";
import bawlImg from "../../img/bawl-food.png";
import chickenImg from "../../img/chicken.png";
import ballToy from "../../img/ball.png";
import ballsToy from "../../img/balls.png";
import chewingToy from "../../img/chawing-toy.png";
import stickToy from "../../img/stick.png";

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
  const [albumNotes, setAlbumNotes] = useState({});
  const [errorMessage, setErrorMessage] = useState("hidden");
  const [takePicNoteVisibility, setTakePicNoteVisibility] = useState("hidden");
  const userInput = useRef(null);
  let pugIndex = Math.floor(Math.random() * 11); // randomize pug picture

  // * UPDATE API functions
  const postCurrentUser = async () => {
    try {
      let { data } = await axios.post(API, {
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
        album: {},
      });

      localStorage.setItem("id", `${data.id}`);
    } catch (e) {
      console.log(e);
      setErrorMessage("visible");
    }

    const now = new Date();
    localStorage.setItem(
      "health",
      JSON.stringify({
        hunger: 100,
        happy: 100,
        time: [now.getHours(), now.getMinutes()],
      })
    );
  };

  const collectStartData = async () => {
    try {
      let id = localStorage.getItem("id");
      let { data } = await axios.get(`${API}${id}`);

      setUserBag(data.bag);
      setAlbumNotes(data.album);
    } catch (e) {
      console.log(e);
      setErrorMessage("visible");
    }
  };

  const updateUserInApi = () => {
    axios.put(`${API}${localStorage.getItem("id")}`, {
      bag: userBag,
      album: albumNotes,
    });
  };

  // * CLICK ON functions
  const clickOnBag = () => {
    // open and close bag
    bagVisibility === "hidden"
      ? setBagVisibility("visible")
      : setBagVisibility("hidden");
  };

  const clickOnItem = async (userItem) => {
    let bagTemp = { ...userBag };
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
    updateHealth();

    // show message of item used
    setCurrentItem(userItem.target.src);
    setItemSpendWindowVisibility("visible");
    setTimeout(() => {
      setItemSpendWindowVisibility("hidden");
    }, 2000);
  };

  const clickOnTakePicture = () => {
    // open and close Pic maker
    takePicNoteVisibility === "hidden"
      ? setTakePicNoteVisibility("visible")
      : setTakePicNoteVisibility("hidden");
  };

  const clickSubmit = () => {
    localStorage.setItem(
      "album",
      JSON.stringify({
        ...albumNotes,
        [userInput.current.value]: [pugIndex],
      })
    );
    setAlbumNotes({ ...albumNotes, [userInput.current.value]: [pugIndex] }); // update in state of album notes

    try {
      axios.put(`${API}${localStorage.getItem("id")}`, {
        // add to data in api
        album: { ...albumNotes, [userInput.current.value]: [pugIndex] },
        bag: userBag,
      });
    } catch (e) {
      console.log(e);
    }

    userInput.current.value = ""; // reset text area input
    clickOnTakePicture(); // to close pic window
    pugIndex = Math.floor(Math.random() * 11); // initializing pug index
  };

  //* rendering functions
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      console.log("not found user");
      postCurrentUser();
    } else {
      console.log("found user");
      collectStartData();
    }
  }, []);

  // ---------------------------------------------------------------------------
  const updateHealth = () => {
    const health = JSON.parse(localStorage.getItem("health"));
    health.hunger = hunger;
    health.happy = happy;
    localStorage.setItem("health", JSON.stringify(health));
  };

  // func to down health and update it.
  const downingHealth = () => {
    const health = JSON.parse(localStorage.getItem("health"));
    const last = health.time;
    const now = [new Date().getHours(), new Date().getMinutes()];
    let numOfDowns;
    let differenceByMinutes;
    if (now[0] > last[0]) {
      const differenceByHours = (now[0] - last[0]) * 60;

      if (now[1] > last[1]) {
        differenceByMinutes = now[1] - last[1];
      } else {
        differenceByMinutes = now[1];
      }

      numOfDowns = (differenceByHours + differenceByMinutes) / 5;
    } else {
      if (now[1] > last[1]) {
        differenceByMinutes = now[1] - last[1];
      } else {
        differenceByMinutes = now[1];
      }

      numOfDowns = differenceByMinutes / 5;
    }

    if (differenceByMinutes >= 5) {
      health.time = now;
      health.hunger -= 5 * numOfDowns;
      health.happy -= 5 * numOfDowns;
      health.hunger = health.hunger < 0 ? 0 : health.hunger;
      health.happy = health.happy < 0 ? 0 : health.happy;

      setHappy(health.happy);
      setHunger(health.hunger);
      localStorage.setItem("health", JSON.stringify(health));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("health")) {
      setHunger(JSON.parse(localStorage.getItem("health")).hunger);
      setHappy(JSON.parse(localStorage.getItem("health")).happy);
      downingHealth();
    }
    const healthInterval = setInterval(downingHealth, 50000);

    return () => clearInterval(healthInterval);
  }, []);

  return (
    <div className="Home">
      <ErrorMessage
        visibility={errorMessage}
        onClickExit={() => setErrorMessage("hidden")}
      />
      <button className="home-btn" onClick={clickOnTakePicture}>
        <i className="fas fa-camera-retro fa-2x"></i>
      </button>
      <CreatePugPic
        visibility={takePicNoteVisibility}
        onClickExit={clickOnTakePicture}
        input={<textarea ref={userInput} rows="4" cols="50" />}
        onClickSubmit={clickSubmit}
        pugIndex={pugIndex}
      />
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
