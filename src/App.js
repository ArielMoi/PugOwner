import "./App.css";
// import { useState, useEffect } from "react";
import Nav from "./Components/Nav/Nav.Component";
import Home from "./Pages/Home/Home";
import Notifications from './Pages/Notifications/Notifications'
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        {/* <Home /> */}
        <Route path="/" exact component={Home} />
        <Route path="/Notifications" exact component={Notifications} />
        {/* <Route path="/Shop" exact component={Shop} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
