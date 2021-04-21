import "./GameShop.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import GameHeaderBoard from "../../Components/GameHeaderBoard/GameHeaderBoard.Component";
import { v4 as uuidv4 } from "uuid";

import appleImg from "../../img/apple.png";
import bananaImg from "../../img/banana.png";
import bawlImg from "../../img/bawl-food.png";
import chickenImg from "../../img/chicken.png";
import ballToy from "../../img/ball.png";
import ballsToy from "../../img/balls.png";
import chewingToy from "../../img/chawing-toy.png";
import stickToy from "../../img/stick.png";
import pugJetpack from "../../img/game-cursor.png";

const API = `https://605b251627f0050017c0645f.mockapi.io/users/`;

const GameBoard = () => {
  const [board, setBoard] = useState([]);
  const [startGameVisibility, setStartGameVisibility] = useState("visible");
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
  const [data, setData] = useState({});

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

  // * FUNCTIONS

  const obstacleCreator = (positions, material) => {
    // pop first element and push in new one.
    let tempBoard = board.map((e, i) => {
      if (positions.includes(i)) {
        e.shift();
        e.push(<div key={uuidv4()} className={material} />);
        return e;
      } else {
        e.shift();
        e.push(<div key={uuidv4()} />);
        return e;
      }
    });
    setBoard(tempBoard);
  };

  function moveWorld(board) {
    let tempBoard = board.map((e) => {
      e.shift();
      e.push(<div key={uuidv4()} />);
      return e;
    });
    setBoard(tempBoard);
  }

  const shopItemsGenerator = (position, item) => {
    let tempBoard = board.map((e, i) => {
      if (position === i) {
        e.shift();
        e.push(<div className={item} key={`${item},${uuidv4()}`} />);
        return e;
      } else {
        e.shift();
        e.push(<div key={uuidv4()} />);
        return e;
      }
    });
    setBoard(tempBoard);
  };

  let gameInterval;
  const gameIntervalRunner = (reInterval = false) => {
    let round = 1;
    if (reInterval) {
      clearInterval(gameInterval);
    } else {
      gameInterval = setInterval(() => {
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
          default:
            break;
        }
      }, 500);
    }
  };

  const startGame = () => {
    gameIntervalRunner();
    window.addEventListener("mouseover", meetObstacle);
    gameScreen.current.classList.remove("stop-game");
    setStartGameVisibility("hidden"); // button visibility
  };

  const stopGame = () => {
    gameScreen.current && gameScreen.current.classList.add("stop-game");
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
            ++bag.food[event.target.classList[0]][1],
          ];
        } else if (bag.toys[event.target.classList[0]]) {
          bag.toys[event.target.classList[0]] = [
            bag.toys[event.target.classList[0]][0],
            ++bag.toys[event.target.classList[0]][1],
          ];
        }

        setGameBag(bag);
        cleanItemInBoard(event.target.classList[0]);
      } else if (
        // if obstacle
        ["rock", "grass", "land"].includes(event.target.classList[0])
      ) {
        stopGame();
        resetBag();
      }
    }
  };

  // tried to add item found state and from that change arrise a use effect to restart game interval
  // ! because like this item disappears for only a sec.
  // ! if i use the itemFound to evoke game interval it works the first time and then the sec time board goes crazy
  // const [itemFound, setItemFound] = useState('')
  const cleanItemInBoard = async (item) => {
    gameIntervalRunner(true);
    let boardWithoutItem = board.map((row) =>
      row.map((element) => {
        if (item === element.key.split(",")[0]) {
          console.log("match");
          return <div key={uuidv4()} />;
        } else {
          console.log("not");
          return element;
        }
      })
    );

    await setBoard(boardWithoutItem);
    // await setItemFound(item);
    gameIntervalRunner();
  };

  // useEffect(() => {
  //   console.log(itemFound);
  //   if (itemFound !== '') gameIntervalRunner();
  // }, [itemFound]);

  const resetBag = () => {
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

  const collectMaterial = () => {
    updateInApi();
    stopGame();
    resetBag();
  };

  const restartGame = () => {
    window.addEventListener("mouseover", meetObstacle);
    gameScreen.current.classList.remove("stop-game");
  };

  // * API COLLECTING DATA FUNCTIONS

  const collectStartData = async () => {
    try {
      let { data } = await axios.get(`${API}${localStorage.getItem("id")}`);

      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const updateInApi = async () => {
    try {
      await axios.put(`${API}${localStorage.getItem("id")}`, {
        album: data.album,
        bag: {
          food: {
            apple: [appleImg, data.bag.food.apple[1] + gameBag.food.apple[1]],
            banana: [
              bananaImg,
              data.bag.food.banana[1] + gameBag.food.banana[1],
            ],
            bawl: [bawlImg, data.bag.food.bawl[1] + gameBag.food.bawl[1]],
            chicken: [
              chickenImg,
              data.bag.food.chicken[1] + gameBag.food.chicken[1],
            ],
          },
          toys: {
            ball: [ballToy, data.bag.toys.ball[1] + gameBag.toys.ball[1]],
            balls: [ballsToy, data.bag.toys.balls[1] + gameBag.toys.balls[1]],
            chewing: [
              chewingToy,
              data.bag.toys.chewing[1] + gameBag.toys.chawing[1],
            ],
            stick: [stickToy, data.bag.toys.stick[1] + gameBag.toys.stick[1]],
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  // * RENDERING FUNCTIONS
  // initalizing board
  useEffect(() => {
    const createBaseWorld = () => {
      let tempArray = [];
      for (let row = 0; row < 15; row++) {
        let currentRow = [];
        for (let column = 0; column < 25; column++) {
          currentRow.push(<div key={uuidv4()} />);
          if (column === 24) {
            tempArray.push(currentRow);
          }
        }
      }
      setBoard(tempArray);
    };
    createBaseWorld();
  }, []);

  // initializing bag

  useEffect(() => {
    collectStartData();

    // return () => gameIntervalRunner(true);
  }, []);

  // -----------------------------------

  return (
    <div id="game">
      <GameHeaderBoard
        startGame={startGame}
        startGameVisibility={startGameVisibility}
        restartGame={restartGame}
        collectMaterial={collectMaterial}
        gameBag={gameBag}
        stopGame={stopGame}
      />
      <div
        ref={gameScreen}
        className="game-board"
        style={{ cursor: `url("${pugJetpack}"), auto` }}
      >
        {board.map((row) => row.map((element) => element))}
      </div>
    </div>
  );
};

export default GameBoard;
