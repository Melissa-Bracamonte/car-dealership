import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
// import Pages from "./Pages";
import Cars from "./Cars";
// import OrderContext from "../context/ContextAddedToList"

const Home = () => {
  const [cars, setCars] = useState([]);

  // const { car, sendContextCar, amount, sendContextAmount } =
  // useContext(ContextAddedToList);
  // const { order, sendContextOrder, amount, sendContextAmount } =
  // useContext(OrderContext);

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

  // const breakfast = () => {
  //   let menuBreakfast = cars.filter(
  //     (menu) => menu.category === "Breakfast"
  //   );
  //   setBreakfastMenu(menuBreakfast);
  // };

  // const lunchDinner = () => {
  //   let menuLunch = products.filter((menu) => menu.category === "Lunch/Dinner");
  //   setLunchMenu(menuLunch);
  // };

  // const addProducts = (product) => {
  //   product["qty"] = 1;
  //   let productExist = order.find((itemOrder) => {
  //     return itemOrder.id === product.id;
  //   });
  //   sendContextAmount(parseFloat(amount) + parseFloat(product.price));
  //   if (productExist) {
  //     product = { ...productExist, qty: productExist.qty + 1 };
  //     sendContextOrder(
  //       order.map((item) =>
  //         item.id === product.id ? { ...item, qty: product.qty } : item
  //       )
  //     );
  //   } else {
  //     sendContextOrder([...order, product]);
  //   }
  // };

  return (
    <>
      <Navbar />
      <Cars cars={cars}/>
      {/* <Pages /> */}
    </>
  );
};

export default Home;
