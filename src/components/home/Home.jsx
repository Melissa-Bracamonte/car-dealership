// import React, { useEffect, useState, useContext } from "react";
// import Navbar from "./Navbar";
// import Cars from "./Cars";

// const Home = () => {
//   const [cars, setCars] = useState([]);

//   const initialUrl = "http://localhost:3004/vehicles";

//   const fetchApi = (url) => {
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => setCars(data))
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     fetchApi(initialUrl);
//   }, []);

//   console.log(cars);

//   return (
//     <>
//       <Navbar />
//       <Cars cars={cars} />
//     </>
//   );
// };

// export default Home;

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
