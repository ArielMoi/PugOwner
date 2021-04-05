import "./GameBoard.css";
import { useState, useEffect } from "react";

const GameBoard = () => {
  const [boardObj, setBoardObj] = useState({});
  let key = 0;

  // initalizing board
  useEffect(() => {
    const tempBoardObj = {};

    const createBaseWorld = async () => {
      for (let row = 0; row < 15; row++) {
        for (let column = 0; column < 25; column++) {
          if (row === 14) {
            tempBoardObj[`${row}.${column}`] = (
              <div className="land" key={key++} />
            );
          } else if (row === 6 && column === 1) {
            tempBoardObj[`${row}.${column}`] = (
              <div className="pug" key={key++} />
            );
          } else {
            tempBoardObj[`${row}.${column}`] = (
              <div key={key++}>
                {row}.{column}
              </div>
            );
          }
        }
      }
      await setBoardObj(tempBoardObj);
      console.log(boardObj);
    };

    createBaseWorld();

    // let ar = ["bush", "rock", "wall"];
    // obstacleCreator(ar[Math.floor(Math.random() * ar.length)]);
  }, []);

  useEffect(() => {
    console.log("-updated");
    console.log(boardObj);
  }, [boardObj]);

  // useEffect(() => {
  //   console.log(boardObj);
  //   let ar = ["bush", "rock", "wall"];
  //   obstacleCreator(ar[Math.floor(Math.random() * ar.length)]);
  // }, []);

  //   let ar = ["bush", "rock", "wall"];
  //   obstacleCreator(ar[Math.floor(Math.random() * ar.length)]);

  const obstacleCreator = (obstacle) => {
    function obstacleMaker(
      material,
      rowStart = 1,
      rowEnd = 20,
      columnStart = 1,
      columnEnd = 25
    ) {
      let key = 0;
      const tempBoardObj = { ...boardObj };
      console.log(boardObj);
      console.log(tempBoardObj);
      for (let row = 0; row <= 20; row++) {
        for (let column = 0; column <= 25; column++) {
          if (
            column >= columnStart &&
            column <= columnEnd &&
            row >= rowStart &&
            row <= rowEnd
          ) {
            boardObj[`${row}.${column}`] = (
              <div className={material} key={key++} />
            );
          }
        }
      }
      console.log(tempBoardObj);
      setBoardObj(boardObj);
    }

    switch (obstacle) {
      case "bush":
        console.log("bush");
        obstacleMaker("grass", 0, 3, 22, 24);
        break;
      case "rock":
        console.log("rock");
        obstacleMaker("rock", 10, 13, 22, 24);
        break;
      case "wall":
        console.log("wall");
        obstacleMaker("rock", 10, 13, 22, 24);
        break;
      default:
        break;
    }
  };

  return (
    <div className="game-board">
      {Object.values(boardObj).map((divs) => divs)}
    </div>
  );
};

export default GameBoard;
