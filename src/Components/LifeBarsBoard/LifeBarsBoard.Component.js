import './LifeBarsBoard.css'
import LifeBar from '../LifeBar/LifeBar.Component'

function LifeBarsBoard(props){
    return (
      <div className="life-board">
        <LifeBar name="food" amount={props.foodAmount} />
        <LifeBar name="sleep" amount={props.sleepAmount} />
        <LifeBar name="trip" amount={props.tripAmount} />
        <LifeBar name="happiness" amount={props.happinessAmount} />
      </div>
    );
}

export default LifeBarsBoard;