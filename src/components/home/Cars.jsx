import React from "react";
import styles from "./cars.module.css";

const Cars = ({ cars = [] }) => {
  // const { cars = [],  } = props;
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
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full content-center">
                    Add to list
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Cars;
