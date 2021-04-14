import Item from '../Item/Item.Component';
import './GameHeaderBoard.css';

export default function GameHeaderBoard(props) {
  return (
    <div className="header">
      <button onClick={props.startGame} style={{ visibility: props.startGameVisibility }}>
        Start Game
      </button>
      <button
        onClick={props.restartGame}
        style={{ display: props.startGameVisibility === "hidden" ? "" : "none" }}
      >
        Return To Game
      </button>
      <button onClick={props.collectMaterial}>collect material</button>
      <div className="game-bag">
        {Object.values(props.gameBag.food).map(([img, amount]) => (
          <Item imgUrl={img} amount={amount} />
        ))}
        {Object.values(props.gameBag.toys).map(([img, amount]) => (
          <Item imgUrl={img} amount={amount} />
        ))}
      </div>
      <button style={{ float: "right" }} onClick={props.stopGame}>
        Stop Game
      </button>
    </div>
  );
}
