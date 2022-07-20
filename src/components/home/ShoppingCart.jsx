import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./shoppingCart.module.css";
import imgDelete from "../../img/imgDelete.png";
import imgMinus from "../../img/imgMinus.png";
import imgPlus from "../../img/imgPlus.png";
import ContextCars from "../context/ContextCars";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ShoppingCart = () => {
  const navigate = useNavigate();

  const { order, sendContextOrder, amount, sendContextAmount } =
    useContext(ContextCars);

  const { handleSubmit } = useForm();

  const minusProducts = (product) => (e) => {
    e.preventDefault();
    let productExist = order.find((itemOrder) => {
      return itemOrder.id === product.id;
    });
    if (productExist) {
      sendContextAmount(parseFloat(amount) - parseFloat(product.price));
      product = { ...productExist, qty: productExist.qty - 1 };
      if (product.qty <= 0) {
        sendContextOrder(order.filter((item) => item.id !== product.id));
      } else {
        sendContextOrder(
          order.map((item) =>
            item.id === product.id ? { ...item, qty: product.qty } : item
          )
        );
      }
    }
  };

  const plusProducts = (product) => (e) => {
    e.preventDefault();
    let productExist = order.find((itemOrder) => {
      return itemOrder.id === product.id;
    });

    if (productExist) {
      sendContextAmount(parseFloat(amount) + parseFloat(product.price));
      product = { ...productExist, qty: productExist.qty + 1 };
      sendContextOrder(
        order.map((item) =>
          item.id === product.id ? { ...item, qty: product.qty } : item
        )
      );
    }
  };

  const deleteProducts = (product) => (e) => {
    e.preventDefault();
    if (product.qty > 0) {
      sendContextAmount(
        parseFloat(amount) - parseFloat(product.price) * parseInt(product.qty)
      );
    }
    sendContextOrder(order.filter((item) => item.id !== product.id));
  };

  const sendToPay = (data) => {
    sendContextOrder(
      order.map(
        (itemOrder) => Object.assign({}, { ...itemOrder })
      )
    );
    let sendChosenProduct = order.map((itemOrder) =>
      Object.assign(
        {},
        {
          brand: itemOrder.brand,
          category: itemOrder.category,
          model: itemOrder.model,
          color: itemOrder.color,
          price: data.price,
          qty: itemOrder.qty,
          soldDate: new Date().toISOString(),
        }
      )
    );
    sendChosenProduct.forEach((ChosenProduct) => {
      fetch("http://localhost:3004/chosenCar", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(ChosenProduct),
      })
        .then((response) => response.json())
        .then((addedProduct) => {
          console.log(addedProduct);
          sendContextOrder([]);
          sendContextAmount(0);
        });
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Registered order",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/pay-on-line");
  };

  return (
    <>
      <section className={styles.containerNewOrder}>
        <form
          className={styles.newOrderSection}
          onSubmit={handleSubmit(sendToPay)}
        >
          <div>
            <div className={styles.titleNewOrder}>Quote</div>
          </div>
          <div>
            <section className={styles.inputsOrder}>
              <p className={styles.titleAccount}>
                Account total $
                <input
                  id="inputAccount"
                  className={styles.account}
                  value={amount}
                  disabled
                ></input>
              </p>
            </section>
            <hr></hr>
          </div>
          <section className={styles.containerOrder}>
            {order.map((product) => {
              return (
                <div key={product.id} className={styles.productRow}>
                  <div className={styles.itemAlignStart}>{product.brand}</div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnIcons}
                      onClick={minusProducts(product)}
                    >
                      <img
                        alt="iconMinus"
                        className={styles.imgIcon}
                        src={imgMinus}
                      ></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <input
                      className={styles.inputCounter}
                      type="text"
                      value={product.qty}
                      disabled
                    />
                  </div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnIcons}
                      onClick={plusProducts(product)}
                    >
                      <img
                        alt="iconPlus"
                        className={styles.imgIcon}
                        src={imgPlus}
                      ></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnIcons}
                      onClick={deleteProducts(product)}
                    >
                      <img
                        alt="iconDelete"
                        className={styles.imgIcon}
                        src={imgDelete}
                      ></img>
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
          <section className={styles.bottonAreabtn}>
            <button type="submit" className={styles.bottonButtons}>
              Pay
            </button>
          </section>
        </form>
      </section>
    </>
  );
};

export default ShoppingCart;
