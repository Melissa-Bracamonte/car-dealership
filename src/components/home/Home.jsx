import React from "react";
import Navbar from "./Navbar";
import Cars from "./Cars";
import ShoppingCart from "./ShoppingCart";
import { OrderContextProvider } from "../context/ContextCars";
import styles from "./home.module.css";

const Home = () => {
  return (
    <>
        <Navbar />
      <OrderContextProvider>
      <section className={styles.containerHome}>
        <Cars />
        <ShoppingCart/>
        </section>
      </OrderContextProvider>
    </>
  );
};

export default Home;
