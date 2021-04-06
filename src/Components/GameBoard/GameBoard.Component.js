import "./GameBoard.css";
import { useState, useEffect } from "react";

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

  const moveWorld = () => {
    let tempBoard = board.map((e) => {
      e.shift();
      e.push(<div />);
      return e;
    });

    setBoard(tempBoard);
  };

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
        e.push(<div className={item} />);
        return e;
      } else {
        e.shift();
        e.push(<div />);
        return e;
      }
    });
    setBoard(tempBoard);
  };

  const startGame = () => {
    setInterval(() => {
      obstacleCreator(
        ...arrayOfObstacles[Math.floor(Math.random() * arrayOfObstacles.length)]
      );
    }, 1250);

    setInterval(() => {
      shopItemsGenerator(
        Math.floor(Math.random() * 14),
        arrayOfItems[Math.floor(Math.random() * arrayOfItems.length)]
      );
    }, 3750);

    setInterval(moveWorld, 500);
  };

  // create event listener for window - recognize mouse location
  useEffect(() => {
    const meetObstacle = (event) => {
      if (
        event.target.classList.length > 0 &&
        !event.target.classList.contains("Nav")
      ) {
        console.log(event.target.classList);
        // evoke func of player fail
      }
    };

    const meetItem = (event) => {
      if (
        event.target.classList.length > 0 &&
        !event.target.classList.contains("Nav")
      ) {
        console.log(event.target.classList);
        // evoke func of player collecting
      }
    };

    // const arrayOfObstaclesClasses = ["land", "rock", "grass"];
    window.addEventListener("mouseover", meetObstacle);
    window.addEventListener("mouseover", meetItem);

    return () => {
      window.removeEventListener("mouseover", meetObstacle);
      window.removeEventListener("mouseover", meetItem);
    };
  }, []);

  return (
    <div>
      <button onClick={startGame}>start</button>
      <div className="game-board">
        {/* {Object.values(boardObj).map((div) => div)} */}
        {board.map((row) =>
          row.map((element) => {
            return element;
          })
        )}
      </div>
    </div>
  );
};

export default GameBoard;
