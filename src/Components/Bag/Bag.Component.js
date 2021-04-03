import "./Bag.css";
import Item from "../Item/Item.Component";

const Bag = (props) => {
  const toys = [];
  const foods = [];
  let key = 0;

  Object.entries(props.bagObj.food).forEach(([amount, item]) => {
    // iterate over the obj and creating the items accordingly
    foods.push(
      <Item
        onClickItem={props.clickOnItem}
        key={key++}
        imgUrl={item[0]}
        product={item[1]}
        amount={amount}
      />
    ); 
  });

  Object.entries(props.bagObj.toys).forEach(([amount, item]) => {
    toys.push(
      <Item
        onClickItem={props.clickOnItem}
        key={key++}
        imgUrl={item[0]}
        product={item[1]}
        amount={amount}
      />
    ); 
  });

  return (
    <div className="bag" style={{ visibility: props.visibility }}>
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
