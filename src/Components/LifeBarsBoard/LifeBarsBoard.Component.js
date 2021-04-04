import './LifeBarsBoard.css'
import LifeBar from '../LifeBar/LifeBar.Component'

function LifeBarsBoard(props){
    return (
      <div className="life-board">
        <LifeBar name="Hunger" amount={props.foodAmount} />
        {/* <LifeBar name="Tired" amount={props.sleepAmount} /> */}
        <LifeBar name="Happiness" amount={props.happinessAmount} />
      </div>
    );
}

export default LifeBarsBoard;