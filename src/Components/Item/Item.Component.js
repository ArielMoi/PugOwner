import './Item.css'

const Item = (details) => {
    return (
      <div className='item'>
        <img src={details.imgUrl} />
        <h4>{details.product}</h4>
        <h6>{details.price && `Price: ${details.price}`}</h6>
      </div>
    );
}

export default Item;