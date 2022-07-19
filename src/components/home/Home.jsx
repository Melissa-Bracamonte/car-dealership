import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Pages from "./Pages";
import Cars from "./Cars";
import styles from "./home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const redirectProduct = () => {
    navigate("/products");
  };

  const [cars, setCars] = useState([]);
  // const [info, setInfo] = useState({});

  const initialUrl = "http://localhost:3004/vehicles";

  const fetchApi = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.log(error));
  };

  // const onPrevious = () => {
  //   fetchApi(info.prev)
  // };

  // const onNext = () => {
  //   fetchApi(info.next)
  // };

  useEffect(() => {
    fetchApi(initialUrl);
  }, []);

  console.log(cars);

  return (
    <>
      <button className={styles.welcomeButtons} onClick={redirectProduct}>
        Product
      </button>

      <Navbar />
      <section className="container mt-5">x
        <Cars cars={cars} />
        <Pages />
        {/* <Pages prev={info.prev} next={info.next}/> */}
      </section>
    </>
  );
};

export default Home;

