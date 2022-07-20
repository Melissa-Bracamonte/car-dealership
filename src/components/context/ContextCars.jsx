import React, { useState } from "react";
import PropTypes from "prop-types";
 
const ContextCars = React.createContext();
 
export const OrderContextProvider = (props) => {
  const [order, setOrder] = useState([]);
  const [amount, setAmount] = useState(0);
 
  const sendContextOrder = (car) => {
    setOrder(car);
  };
  const sendContextAmount = (total) => {
    setAmount(total);
  };
 
  return (
    <ContextCars.Provider
      value={{ order, sendContextOrder, amount, sendContextAmount }}
    >
      {props.children}
    </ContextCars.Provider>
  );
};
 
export default ContextCars;
 
OrderContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
