import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./components/login/ContextUser";
import Login from "./components/login/Login";
import Home from "./components/home/Home"
import Vehicles from "./components/vehicles/Vehicles"
import "./App.css";

function App() {
  const { user } = useContext(UserContext);

  return (
      <Routes>
        <Route exact path="/" element={<Login />} />
        {user && <Route exact path="/home" element={<Home />} />}
        {user && <Route exact path="/products" element={<Vehicles />} />}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
  );
};

export default App;
