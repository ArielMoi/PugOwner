import "./App.css";
// import { useState, useEffect } from "react";
import Nav from "./Components/Nav/Nav.Component";
import Home from "./Pages/Home/Home";
import MyAlbum from "./Pages/MyAlbum/MyAlbum";
import GameShop from "./Pages/GameShop/GameShop";

import { BrowserRouter, Route } from "react-router-dom";

function App() {
  // const [hunger, setHunger] = useState(100);
  // const [happy, setHappy] = useState(100);
  // moving health management here
  // forward to HOME through props
  // calculate time here

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        {/* <Home /> */}
        <Route path="/" exact component={Home} />
        <Route path="/MyAlbum" exact component={MyAlbum} />
        <Route path="/GameShop" exact component={GameShop} />
      </BrowserRouter>
    </div>
  );
}

export default App;
