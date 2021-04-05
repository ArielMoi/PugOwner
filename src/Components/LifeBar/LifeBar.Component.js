import './LifeBar.css'

function LifeBar(props){
    return (
      <div className="life-bar">
        <div className="bar-container">
          <div className="bar" style={{ width: `${props.amount}%` }}>
            <p>{props.amount}%</p>
          </div>
        </div>
        <p>{props.name}</p>
      </div>
    );
}

export default LifeBar;