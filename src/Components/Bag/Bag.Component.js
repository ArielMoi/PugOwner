import "./Bag.css";
import Item from "../Item/Item.Component";

const Bag = (props) => {
  const toys = [];
  const foods = [];

  Object.entries(props.bagObj.food).forEach(([amount, item]) => {
    Array(Number(amount))
      .fill()
      .forEach(() => {
        // creates array to iterate over with map
        foods.push(<Item imgUrl={item[0]} product={item[1]} />); // doesn't return for some reason
      });
  });

  Object.entries(props.bagObj.toys).forEach(([amount, item]) => {
    Array(Number(amount))
      .fill()
      .forEach(() => {
        // creates array to iterate over with map
        toys.push(<Item imgUrl={item[0]} product={item[1]} />); // doesn't return for some reason
      });
  });

  return (
    <div className='bag' style={{visibility:props.visibility}}>
      <h1>YOUR BAG</h1>

      <div>
        <h3 className="bag-type-header">Food</h3>
        <div className="bag-type">{foods}</div>
      </div>

      <div>
        <h3 className="bag-type-header">Toys</h3>
        <div className="bag-type">{toys}</div>
      </div>
    </div>
  );
};

export default Bag;
