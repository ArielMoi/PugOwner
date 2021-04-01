import './LifeBar.css'

function LifeBar(props){
    return (
      <div className='life-bar'>
        <p>{props.name}</p>
        <div className="bar-container">
          <div className="bar" style={{ width: `${props.amount}%` }}>
            <p>{props.amount}%</p>
          </div>
        </div>
      </div>
    );
}

export default LifeBar;