import "./App.css";
import { useState, useEffect } from "react";
import Item from "./Components/Item/Item.Component";
import pugDefault from "./img/pug-default.png";


function App() {
  return (
    <div className="App">
      <Item imgUrl={pugDefault} product='apple' price='80'/>
    </div>
  );
}

export default App;
