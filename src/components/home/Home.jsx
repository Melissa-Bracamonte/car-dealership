import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
// import Pages from "./Pages";
import Cars from "./Cars";
// import styles from "./home.module.css";

const Home = () => {
  const [cars, setCars] = useState([]);

  const initialUrl = "http://localhost:3004/vehicles";

  const fetchApi = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchApi(initialUrl);
  }, []);

  console.log(cars);

  return (
    <>
      <Navbar />
      {/* <section className="container mt-5"> */}
        <Cars cars={cars} />
        {/* <Pages /> */}
      {/* </section> */}
    </>
  );
};

export default Home;

