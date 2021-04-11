import "./App.css";
import Nav from "./Components/Nav/Nav.Component";
import Home from "./Pages/Home/Home";
import MyAlbum from "./Pages/MyAlbum/MyAlbum";
import GameShop from "./Pages/GameShop/GameShop";

import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Route path="/" exact component={Home} />
        <Route path="/MyAlbum" exact component={MyAlbum} />
        <Route path="/GameShop" exact component={GameShop} />
      </BrowserRouter>
    </div>
  );
}

export default App;
