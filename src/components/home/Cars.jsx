import React from "react";

const Cars = ({ cars = [] }) => {
  return (
    <section className="row">
      {cars.map((item, index) => (
        <section key={index} className="col mb-4">
          <section className="card" style={{minWidth: "200px"}}>
            <img src={item.img} alt="" />
            <section className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <hr/>
                <p>Brand: {item.brand}</p>
                <p>Category: {item.category}</p>
            </section>
          </section>
        </section>
      ))}
    </section>
  );
};

export default Cars;