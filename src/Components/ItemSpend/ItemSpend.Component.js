import './ItemSpend.css'

function ItemSpend(props){

    return (
      <div className='item-spend' style={{visibility: props.visibility}}>
        <i className="fas fa-minus fa-3x"></i>
        <img src={props.img} alt='item' />
      </div>
    );
}

export default ItemSpend;