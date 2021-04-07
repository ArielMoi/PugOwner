import "./GameBoard.css";
import { useState, useEffect, useRef } from "react";
import Item from "../Item/Item.Component";
import axios from "axios";

import appleImg from "../../img/apple.png";
import bananaImg from "../../img/banana.png";
import bawlImg from "../../img/bawl-food.png";
import chickenImg from "../../img/chicken.png";
import ballToy from "../../img/ball.png";
import ballsToy from "../../img/balls.png";
import chewingToy from "../../img/chawing-toy.png";
import stickToy from "../../img/stick.png";
import pugJetpack from "../../img/jetpack-pug.png";

const API = `https://605b251627f0050017c0645f.mockapi.io/users/`;

const GameBoard = () => {
  let key = 0;
  const [board, setBoard] = useState([]);

  // initalizing board
  useEffect(() => {
    const createBaseWorld = () => {
      let tempArray = [];
      for (let row = 0; row < 15; row++) {
        let currentRow = [];
        for (let column = 0; column < 25; column++) {
          currentRow.push(<div key={key++} />);
          if (column === 24) {
            tempArray.push(currentRow);
          }
        }
      }
      setBoard(tempArray);
    };
    createBaseWorld();
  }, []);

  const obstacleCreator = (positions, material) => {
    // pop first el and push in new one.
    let tempBoard = board.map((e, i) => {
      if (positions.includes(i)) {
        e.shift();
        e.push(<div className={material} />);
        return e;
      } else {
        e.shift();
        e.push(<div />);
        return e;
      }
    });
    setBoard(tempBoard);
  };

  function moveWorld(board) {
    let tempBoard = board.map((e) => {
      e.shift();
      e.push(<div />);
      return e;
    });
    setBoard(tempBoard);
  }

  const arrayOfObstacles = [
    [[0, 1, 2], "rock"],
    [[0, 1, 2, 3, 4], "rock"],
    [[0, 1, 2], "grass"],
    [[0, 1, 2, 3, 4], "grass"],
    [[0, 1, 2], "land"],
    [[0, 1, 2, 3, 4], "land"],
    [[14, 13, 12], "rock"],
    [[14, 13, 12, 11, 10], "rock"],
    [[14, 13, 12], "grass"],
    [[14, 13, 12, 11, 10], "grass"],
    [[14, 13, 12], "land"],
    [[14, 13, 12, 11, 10], "land"],
    [[5, 6, 7, 8], "rock"],
    [[6, 7, 8, 9], "grass"],
    [[3, 4, 5, 6], "land"],
  ];

  const arrayOfItems = [
    "apple",
    "banana",
    "bawl",
    "chicken",
    "ball",
    "balls",
    "chawing",
    "stick",
  ];

  const shopItemsGenerator = (position, item) => {
    let tempBoard = board.map((e, i) => {
      if (position === i) {
        e.shift();
        e.push(<div className={item} key={item} />);
        return e;
      } else {
        e.shift();
        e.push(<div />);
        return e;
      }
    });
    setBoard(tempBoard);
  };

  const [startGameVisibility, setStartGameVisibility] = useState("visible");
  let first = true;
  const startGame = () => {
    let round = 1;
    setInterval(() => {
      switch (round) {
        case 0:
          obstacleCreator(
            ...arrayOfObstacles[
              Math.floor(Math.random() * arrayOfObstacles.length)
            ]
          );
          round++;
          break;
        case 1:
        case 2:
        case 3:
          moveWorld(board);
          round++;
          break;
        case 4:
          obstacleCreator(
            ...arrayOfObstacles[
              Math.floor(Math.random() * arrayOfObstacles.length)
            ]
          );
          round++;
          break;
        case 5:
        case 6:
        case 7:
          moveWorld(board);
          round++;
          break;
        case 8:
          obstacleCreator(
            ...arrayOfObstacles[
              Math.floor(Math.random() * arrayOfObstacles.length)
            ]
          );
          round++;
          break;
        case 9:
        case 10:
        case 11:
        case 12:
          moveWorld(board);
          round++;
          break;
        case 13:
          obstacleCreator(
            ...arrayOfObstacles[
              Math.floor(Math.random() * arrayOfObstacles.length)
            ]
          );
          round++;
          break;
        case 14:
        case 15:
        case 16:
          moveWorld(board);
          round++;
          break;
        case 17:
          shopItemsGenerator(
            Math.floor(Math.random() * 14),
            arrayOfItems[Math.floor(Math.random() * arrayOfItems.length)]
          );
          round++;
          break;
        case 18:
          moveWorld(board);
          round = 0;
          break;
      }
    }, 500);
    window.addEventListener("mouseover", meetObstacle);

    gameScreen.current.classList.remove("stop-game");
    setStartGameVisibility("hidden");
  };

  // create event listener for window - recognize mouse location
  const gameScreen = useRef(null);
  const [gameBag, setGameBag] = useState({
    food: {
      apple: [appleImg, 0],
      banana: [bananaImg, 0],
      bawl: [bawlImg, 0],
      chicken: [chickenImg, 0],
    },
    toys: {
      ball: [ballToy, 0],
      balls: [ballsToy, 0],
      chawing: [chewingToy, 0],
      stick: [stickToy, 0],
    },
  });

  const stopGame = () => {
    gameScreen.current.classList.add("stop-game");
    window.removeEventListener("mouseover", meetObstacle);
  };

  const meetObstacle = (event) => {
    if (
      event.target.classList.length > 0 &&
      !event.target.classList.contains("Nav")
    ) {
      if (arrayOfItems.includes(event.target.classList[0])) {
        // if is bag item
        const bag = { ...gameBag };

        if (bag.food[event.target.classList[0]]) {
          bag.food[event.target.classList[0]] = [
            bag.food[event.target.classList[0]][0],
            bag.food[event.target.classList[0]][1] + 1,
          ];
        }
        if (bag.toys[event.target.classList[0]]) {
          bag.toys[event.target.classList[0]] = [
            bag.toys[event.target.classList[0]][0],
            bag.toys[event.target.classList[0]][1] + 1,
          ];
        }

        setGameBag(bag);
        cleanItemInBoard(event.target.classList[0]);
        // event.target.classList.remove(event.target.classList[0]); // doesn't work cause moving world keep updating -> disappea for only a sec
      } else if (
        // if obstacle
        ["rock", "grass", "land"].includes(event.target.classList[0])
      ) {
        stopGame();
        resetBag();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mouseover", meetObstacle);
    return () => window.removeEventListener("mouseover", meetObstacle);
  }, []);

  const cleanItemInBoard = (item) => {
    let boardWithoutItem = board.map((row) =>
      row.map((element) => {
        console.log(element);
        if (item == element.key) {
          console.log("match");
          return <div />;
        } else {
          console.log("not");
          return element;
        }
      })
    );

    console.log(boardWithoutItem);
    setBoard(boardWithoutItem);
  }; // disappeared for only a sec

  const resetBag = () => {
    // when player encounter obstacle
    setGameBag({
      food: {
        apple: [appleImg, 0],
        banana: [bananaImg, 0],
        bawl: [bawlImg, 0],
        chicken: [chickenImg, 0],
      },
      toys: {
        ball: [ballToy, 0],
        balls: [ballsToy, 0],
        chawing: [chewingToy, 0],
        stick: [stickToy, 0],
      },
    });
  };

  // -----------------------------------
  const [data, setData] = useState({});
  const collectStartData = async () => {
    try {
      let id = localStorage.getItem("id");
      let { data } = await axios.get(`${API}${id}`);

      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const unitingBags = () => {
    setGameBag({
      food: {
        apple: [appleImg, data.bag.food.apple + gameBag.food.apple],
        banana: [bananaImg, data.bag.food.banana + gameBag.food.banana],
        bawl: [bawlImg, data.bag.food.bawl + gameBag.food.bawl],
        chicken: [chickenImg, data.bag.food.chicken + gameBag.food.chicken],
      },
      toys: {
        ball: [ballToy, data.bag.toys.ball + gameBag.toys.ball],
        balls: [ballsToy, data.bag.toys.balls + gameBag.toys.balls],
        chawing: [chewingToy, data.bag.toys.chawing + gameBag.toys.chawing],
        stick: [stickToy, data.bag.toys.stick + gameBag.toys.stick],
      },
    });
  };

  const updateInApi = async () => {
    await unitingBags();
    try {
      await axios.put(`${API}${localStorage.getItem("id")}`, {
        album: data.album,
        bag: gameBag,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const collectMaterial = async () => {
    await collectStartData();
    await updateInApi();
    resetBag();
  };

  const restartGame = () => {
    window.addEventListener("mouseover", meetObstacle);
    gameScreen.current.classList.remove("stop-game");
  };

  return (
    <div id="game">
      <div className="header">
        <button onClick={startGame} style={{ visibility: startGameVisibility }}>
          Start Game
        </button>
        <button
          onClick={restartGame}
          style={{ display: startGameVisibility == "hidden" ? "" : "none" }}
        >
          Return To Game
        </button>
        <button onClick={collectMaterial}>collect material</button>
        <div className="game-bag">
          {Object.values(gameBag.food).map(([img, amount]) => (
            <Item imgUrl={img} amount={amount} />
          ))}
          {Object.values(gameBag.toys).map(([img, amount]) => (
            <Item imgUrl={img} amount={amount} />
          ))}
        </div>
        <button style={{ float: "right" }} onClick={stopGame}>
          Stop Game
        </button>
      </div>
      <div
        ref={gameScreen}
        className="game-board"
        style={{ cursor: `url(${pugJetpack}), auto;` }}
      >
        {board.map((row) => row.map((element) => element))}
      </div>
    </div>
  );
};

export default GameBoard;
