import Item from '../Item/Item.Component'

const Bag = (props) => {
    return (
      <div>
        <h1>YOUR BAG</h1>

        <div>
          <h3>Food</h3>
          <div className="bag-foods">
            {props.bagObj.food.map((item) => {
              <Item imgUrl={item.imgUrl} product={item.product} />;
            })}
          </div>
        </div>

        <div>
          <h3>TOYS</h3>
          <div className="bag-toys">
            {props.bagObj.toys.map((item) => {
              <Item imgUrl={item.imgUrl} product={item.product} />;
            })}
          </div>
        </div>
      </div>
    );
}

export default Bag;