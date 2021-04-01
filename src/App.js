import "./App.css";
// import { useState, useEffect } from "react";
import Nav from "./Components/Nav/Nav.Component";
import LifeBarsBoard from "./Components/LifeBarsBoard/LifeBarsBoard.Component";
// import pugDefault from "./img/pug-default.png";
import Home from './Pages/Home/Home'

function App() {
  return (
    <div className="App">
      <Nav />
      <Home />
    </div>
  );
}

export default App;
