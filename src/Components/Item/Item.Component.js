import "./Item.css";

const Item = (details) => {
  return (
    <div className="item" onClick={details.onClickItem}>
      <img src={details.imgUrl} alt={details.product} />
      <h4>{details.amount}</h4>
    </div>
  );
};

export default Item;
