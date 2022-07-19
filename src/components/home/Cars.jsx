// import React from "react";
// import "./cars.css";

// const Cars = ({ cars = [] }) => {
//   return (
//     <section className="row">
//       {cars.map((item) => (
//         <section key={item} className="col mb-4">
//           <section className="card" >
//             <img src={item.img} alt=""  className="imgCar"/>
//             <section className="card-body">
//                 <h5 className="card-title">{item.brand}</h5>
//                 <hr/>
//                 <p>Category: {item.category}</p>
//                 <p>Model: {item.model}</p>
//             </section>
//           </section>
//         </section>
//       ))}
//     </section>
//   );
// };

// export default Cars;

import React from "react";
import styles from "./cars.module.css";

const Cars = ({ cars = [] }) => {
  return (
    <>
      <section>
        <div className={styles.containerCars}>
          <ul className={styles.listGroup}>
            {cars.map((item) => {
              return (
                <li key={item.id} className={styles.items}>
                  <h3>
                    <strong>{item.brand}</strong>
                  </h3>
                  {/* <img src={item.img} alt="" className={styles.imgCar} /> */}
                  <img src={item.img} alt="" />
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <strong>Model:</strong> {item.model}
                  </p>
                  {/* <button className="btnBuy">Add to list</button> */}
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
      </section>
    </>
  );
};

export default Cars;
