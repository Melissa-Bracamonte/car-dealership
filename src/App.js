import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./components/context/ContextUser";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Vehicles from "./components/vehicles/Vehicles";
import Sales from "./components/sales/Sales";
import Team from "./components/team/Team";
import WelcomeTeam from "./components/welcomeTeam/WelcomeTeam";
import "./App.css";

function App() {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      {user && <Route exact path="/welcome" element={<WelcomeTeam />} />}
      {user && <Route exact path="/products" element={<Vehicles />} />}
      {user && <Route exact path="/sales" element={<Sales />} />}
      {user && <Route exact path="/team" element={<Team />} />}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
