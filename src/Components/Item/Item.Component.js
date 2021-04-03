import "./Item.css";

const Item = (details) => {
  return (
    <div className="item" onClick={details.onClickItem}>
      <img src={details.imgUrl} alt={details.product} />
      <div className="item-details">
        <h4>{details.product}</h4>
        <h6>{details.price && `Price: ${details.price}`}</h6>
        <h6>{details.amount && `${details.amount}`}</h6>
      </div>
    </div>
  );
};

export default Item;
