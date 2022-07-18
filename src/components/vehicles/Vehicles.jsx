import React, { useState, useEffect } from "react";
import styles from "./vehicles.module.css";
import imgDelete from "../../img/imgDelete.png";
import imgEdit from "../../img/imgEdit.png";
import addIcon from "../../img/addIcon.png";
import { Modal } from "../modal/Modal";

const Vehicles = () => {
  const [products, setProducts] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [idDeletedProduct, setIdDeletedProduct] = useState("");

  const getAllProduct = () => {
    fetch("http://localhost:3004/vehicles")
      .then((response) => response.json())
      .then((products) => setProducts(products));
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const deleteProducts = (product) => {
    fetch(`http://localhost:3004/vehicles/${product.id}`, {
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

  const deleteVehicle= (id) => {
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
      <Modal
        onClickCloseModal={onClickHide}
        visible={objPopup.visibility}
        attrProduct={objPopup.popupProduct}
      />

      <section>
        <div className={styles.productsTable}>
          <div>
            <div className={styles.titleTable}>
              VEHICLES
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
            <div className={styles.headerTable}>Color</div>
            <div className={styles.headerTable}>Mileage</div>
            <div className={styles.headerTable}>Price</div>
            <div className={styles.headerTable}>Status</div>
            <div className={styles.headerTable}>Edit</div>
            <div className={styles.headerTable}>Delete</div>
          </div>
          <div className={styles.scrollProduct}>
            {products.map((product) => {
              return (
                <div key={product.id} className={styles.containerItems}>
                  <div className={styles.itemAlignStart}>{product.brand}</div>
                  <div className={styles.itemTable}>{product.category}</div>
                  <div className={styles.itemTable}>{product.model}</div>
                  <div className={styles.itemTable}>{product.color}</div>
                  <div className={styles.itemTable}>{product.mileage}</div>
                  <div className={styles.itemTable}>{product.price}</div>
                  <div className={styles.itemTable}>{product.status}</div>
                  <div className={styles.itemTable}>
                    <button className={styles.btnEditAndDelete}>
                      <img
                        alt="imgEdit"
                        className={styles.imgEdit}
                        src={imgEdit}
                        onClick={() => editProducts(product)}
                      ></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnEditAndDelete}
                      onClick={() => deleteVehicle(product)}
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

export default Vehicles;