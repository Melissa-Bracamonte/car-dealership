// import React from "react";
// import styles from "./cars.module.css";

// const Cars = ({ cars = [] }) => {
//   return (
    // <>
    //   <div className={styles.containerCars}>
    //     <ul className={styles.listGroup}>
    //       {cars.map((item) => {
    //         return (
    //           <li key={item.id} className={styles.items}>
    //             <h3>
    //               <strong>{item.brand}</strong>
    //             </h3>
    //             <img src={item.img} alt="" />
    //             <p>
    //               <strong>Category:</strong> {item.category}
    //             </p>
    //             <p>
    //               <strong>Model:</strong> {item.model}
    //             </p>
    //             <p>
    //               <strong>Price:</strong> ${item.price} USD
    //             </p>
    //             <div className="inline-flex">
    //               <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full content-center">
    //                 Add to list
    //               </button>
    //             </div>
    //           </li>
    //         );
    //       })}
    //     </ul>
    //   </div>
    // </>
//   );
// };

// export default Cars;

import React, { useState, useEffect, useContext } from 'react'
import styles from "./cars.module.css";
import ContextCars from "../context/ContextCars";
// import { useNavigate } from "react-router-dom";

const Cars = () => {
  // const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  const { order, sendContextOrder, amount, sendContextAmount } =
  useContext(ContextCars);

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


  const addProducts = (product) => {
    product["qty"] = 1;
    let productExist = order.find((itemOrder) => {
      return itemOrder.id === product.id;
    });
    sendContextAmount(parseFloat(amount) + parseFloat(product.price));
    if (productExist) {
      product = { ...productExist, qty: productExist.qty + 1 };
      sendContextOrder(
        order.map((item) =>
          item.id === product.id ? { ...item, qty: product.qty } : item
        )
      );
    } else {
      sendContextOrder([...order, product]);
    }
    // navigate("/shoppingCart");
  };



  return (
    <>
    <div className={styles.containerCars}>
      <ul className={styles.listGroup}>
        {cars.map((item) => {
          return (
            <li key={item.id} className={styles.items}>
              <h3>
                <strong>{item.brand}</strong>
              </h3>
              <img src={item.img} alt="" />
              <p>
                <strong>Category:</strong> {item.category}
              </p>
              <p>
                <strong>Model:</strong> {item.model}
              </p>
              <p>
                <strong>Price:</strong> ${item.price} USD
              </p>
              <div className="inline-flex">
                <button onClick={() => addProducts(item)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full content-center">
                  Add to list
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </>
  )
}

export default Cars