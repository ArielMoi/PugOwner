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
    };
    createBaseWorld();
    let ar = ["bush", "rock", "wall"];
    obstacleCreator(ar[Math.floor(Math.random() * ar.length)]);
  }, []);

  const obstacleCreator = (obstacle) => {
    //   console.log(arrayOfObstacles);
    //   let obstacle = arrayOfObstacles[Math.random(Math.floor() * arrayOfObstacles.length)]
    // console.log(obstacle);

    // const worldCreator = (
    //   obstacle,
    //   columnStart = 23,
    //   rowStart = 0,
    //   rowEnd = 15
    // ) => {
    //   const tempBoardObj = boardObj;
    //   let key = 0;
    //   for (let row = rowStart; row < rowEnd; row++) {
    //     for (let column = columnStart; column < 25; column++) {
    //       tempBoardObj[`${row}.${column}`] = (
    //         <div className={obstacle} key={key++} />
    //       );
    //     }
    //   }
    // };

    function obstacleMaker(
      material,
      rowStart = 1,
      rowEnd = 20,
      columnStart = 1,
      columnEnd = 25
    ) {
      let key = 0;
      const tempBoardObj = { ...boardObj };
      console.log(tempBoardObj);
      for (let row = 0; row <= 20; row++) {
        for (let column = 0; column <= 25; column++) {
          if (
            column >= columnStart &&
            column <= columnEnd &&
            row >= rowStart &&
            row <= rowEnd
          ) {
            tempBoardObj[`${row}.${column}`] = (
              <div className={material} key={key++} />
            );
          }
          //   else {
          //       console.log(boardObj[`${row}.${column}`]);
          //       console.log('-----');
          //     tempBoardObj[`${row}.${column}`] = boardObj[`${row}.${column}`];
          //   }
        }
      }
      console.log(tempBoardObj);
      setBoardObj(tempBoardObj);
    }

    switch (obstacle) {
      case "bush":
        console.log("bush");
        obstacleMaker("grass", 0, 3, 22, 24);
        break;
      case "rock":
        console.log("rr");
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

  //   let ar = ["bush", "rock", "wall"];
  //   obstacleCreator(ar[Math.floor(Math.random() * ar.length)]);

  return (
    <div className="game-board">
      {Object.values(boardObj).map((divs) => divs)}
    </div>
  );
};

export default GameBoard;
