import "./GameBoard.css";
import { useState, useEffect } from "react";

const GameBoard = () => {
  const [boardObj, setBoardObj] = useState({});
  let key = 0;

  // initalizing board
  useEffect(() => {
    const tempBoardObj = {};

    const createBaseWorld = () => {
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
              <div key={key++}>{/* {row}.{column} */}</div>
            );
          }
        }
      }
      setBoardObj(tempBoardObj);
    };
    createBaseWorld();
  }, []);

  const obstacleCreator = (obstacle) => {
    const tempBoardObj = {};
    function obstacleMaker(
      material,
      rowStart = 1,
      rowEnd = 20,
      columnStart = 1,
      columnEnd = 25
    ) {
      let key = 300;
      Object.entries(boardObj).forEach(([position, element]) => {
        const [row, column] = position.split(".");
        if (
          Number(columnStart) <= column &&
          column <= Number(columnEnd) &&
          Number(rowStart) <= row &&
          row <= Number(rowEnd)
        ) {
          tempBoardObj[`${row}.${column}`] = (
            <div className={material} key={key++} />
          );
        } else {
          tempBoardObj[`${row}.${column}`] = element;
        }
      });
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
        obstacleMaker("rock", 7, 13, 23, 24);
        break;
      default:
        break;
    }

    setBoardObj(tempBoardObj);
  };

  const startGame = () => {
    let obstaclesArray = ["bush", "rock", "wall"];

    obstacleCreator(
      obstaclesArray[Math.floor(Math.random() * obstaclesArray.length)]
    );

    // setTimeout(() => {
    //   obstacleCreator(
    //     obstaclesArray[Math.floor(Math.random() * obstaclesArray.length)]
    //   );
    // }, 1000);

    setTimeout(startMovingObstacles, 2500);
  };

  // func to move obstacles
  const startMovingObstacles = () => {
    let tempBoardObj = {};
    Object.entries(boardObj).forEach(([position, element]) => {
      const [row, column] = position.split(".");
      if (column !== 0) {
        console.log(`${row}.${Number(column) - 1}`);
        tempBoardObj[`${row}.${Number(column) - 1}`] = element;
      } else {
        console.log('0');
        // tempBoardObj[`${row}.${24}`] = element;
      }
    });

    setBoardObj(tempBoardObj);
  };

  return (
    <div>
      <button onClick={startGame}>start</button>
      <div className="game-board">
        {Object.values(boardObj).map((div) => div)}
      </div>
    </div>
  );
};

export default GameBoard;
