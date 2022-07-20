import React, { useState, useEffect } from "react";
import styles from "./sales.module.css";
import imgDelete from "../../img/imgDelete.png";
import imgEdit from "../../img/imgEdit.png";
import addIcon from "../../img/addIcon.png";
import { ModalSales } from "../modal/ModalSales";
import Header from "../header/Header";

const Sales = () => {
  const [carSold, setCarSold] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [idDeletedProduct, setIdDeletedProduct] = useState("");

  const getAllProduct = () => {
    fetch("http://localhost:3004/carSold")
      .then((response) => response.json())
      .then((products) => setCarSold(products));
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const deleteProducts = (product) => {
    fetch(`http://localhost:3004/carSold/${product.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((deletedProduct) => {
        console.log(deletedProduct);
        getAllProduct();
      });
    toggleModalDelete();
  };

  const toggleModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const deleteVehicle = (id) => {
    setIdDeletedProduct(id);
    toggleModalDelete();
  };

  const [objPopup, setPopup] = useState({ visibility: false });

  const editProducts = (popupProduct) => {
    setPopup({ visibility: true, popupProduct });
  };

  const onAdd = () => {
    let popupProduct = {};
    setPopup({ visibility: true, popupProduct });
  };
  const onClickHide = () => {
    getAllProduct();
    setPopup({ visibility: false });
  };

  return (
    <>
      <Header />

      <ModalSales
        onClickCloseModal={onClickHide}
        visible={objPopup.visibility}
        attrProduct={objPopup.popupProduct}
      />

      <section>
        <div className={styles.productsTable}>
          <div>
            <div className={styles.titleTable}>
              SALES
              <button className={styles.addButton} onClick={onAdd}>
                <img
                  alt="imageAddButton"
                  className={styles.iconAdd}
                  src={addIcon}
                />
              </button>
            </div>
          </div>
          <div className={styles.mainHeaderTable}>
            <div className={styles.headerTable}>Brand</div>
            <div className={styles.headerTable}>Category</div>
            <div className={styles.headerTable}>Model</div>
            <div className={styles.headerTable}>Quantity</div>
            <div className={styles.headerTable}>Price</div>
            <div className={styles.headerTable}>Buyer name</div>
            <div className={styles.headerTable}>Address buyer</div>
            <div className={styles.headerTable}>Sold date</div>
            <div className={styles.headerTable}>Seller name</div>
            <div className={styles.headerTable}>Edit</div>
            <div className={styles.headerTable}>Delete</div>
          </div>
          <div className={styles.scrollProduct}>
            {carSold.map((car) => {
              return (
                <div key={car.id} className={styles.containerItems}>
                  <div className={styles.itemAlignStart}>{car.brand}</div>
                  <div className={styles.itemTable}>{car.category}</div>
                  <div className={styles.itemTable}>{car.model}</div>
                  <div className={styles.itemTable}>{car.qty}</div>
                  <div className={styles.itemTable}>{car.price}</div>
                  <div className={styles.itemTable}>{car.buyerName}</div>
                  <div className={styles.itemTable}>{car.addressBuyer}</div>
                  <div className={styles.itemTable}>{car.soldDate}</div>
                  <div className={styles.itemTable}>{car.sellerName}</div>
                  <div className={styles.itemTable}>
                    <button className={styles.btnEditAndDelete}>
                      <img
                        alt="imgEdit"
                        className={styles.imgEdit}
                        src={imgEdit}
                        onClick={() => editProducts(car)}
                      ></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnEditAndDelete}
                      onClick={() => deleteVehicle(car)}
                    >
                      <img
                        alt="imgDelete"
                        className={styles.imgDelete}
                        src={imgDelete}
                      ></img>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {modalDelete && (
        <section className={styles.modalDelete}>
          <section className={styles.overlayDelete}></section>
          <section className={styles.modalContentDelete}>
            <h2 className={styles.deleteOrCancel}>
              Are you sure you want to delete this product?
            </h2>
            <section className={styles.deleteAndCancel}>
              <button
                className={styles.deleteYes}
                onClick={() => deleteProducts(idDeletedProduct)}
              >
                Delete
              </button>
              <button
                type="submit"
                className={styles.cancel}
                onClick={toggleModalDelete}
              >
                Cancel
              </button>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default Sales;
