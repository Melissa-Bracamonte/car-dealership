import React, { useEffect } from "react";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export function ModalSales({ attrProduct, onClickCloseModal, visible }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("brand", attrProduct?.brand);
    setValue("category", attrProduct?.category);
    setValue("model", attrProduct?.model);
    setValue("qty", attrProduct?.qty);
    setValue("price", attrProduct?.price);
    setValue("buyerName", attrProduct?.buyerName);
    setValue("addressBuyer", attrProduct?.addressBuyer);
    setValue("soldDate", attrProduct?.soldDate);
    setValue("sellerName", attrProduct?.sellerName);
  }, [attrProduct]);

  const onSubmit = async (data) => {
    saveProduct({
      ...attrProduct,
      brand: data.brand,
      category: data.category,
      model: data.model,
      qty: data.qty,
      price: data.price,
      buyerName: data.buyerName,
      addressBuyer: data.addressBuyer,
      soldDate: data.soldDate,
      sellerName: data.sellerName,
    });
  };

  const saveProduct = (product) => {
    if (product && product.id) {
      // fetch(`http://localhost:3004/vehicles/${product.id}`, {
        fetch(`https://62d9b3b89eedb69963614c4e.mockapi.io/api/vehicles/carSold/${product.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((addedProduct) => {
          console.log(addedProduct);
          onClickCloseModal();
        });
    } else {
      // fetch("http://localhost:3004/vehicles", {
        fetch("https://62d9b3b89eedb69963614c4e.mockapi.io/api/vehicles/carSold", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((addedProduct) => {
          console.log(addedProduct);
          onClickCloseModal();
        });
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Product added",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return visible ? (
    <>
      <div id="myModal" className={styles.modal}>
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={onClickCloseModal}>
            &times;
          </span>
          <section className={styles.titleModal}>Sales</section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className={styles.AllInputs}>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="brand"
                  placeholder="Brand"
                  {...register("brand", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                ></input>
                {errors.brand && (
                  <p className={styles.errorMessage}>{errors.brand.message}</p>
                )}
              </div>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="category"
                  placeholder="Category"
                  {...register("category", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                ></input>
                {errors.category && (
                  <p className={styles.errorMessage}>
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="model"
                  placeholder="Model"
                  {...register("model", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                ></input>
                {errors.model && (
                  <p className={styles.errorMessage}>{errors.model.message}</p>
                )}
              </div>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="qty"
                  placeholder="Quantity"
                  {...register("qty", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                ></input>
                {errors.qty && (
                  <p className={styles.errorMessage}>{errors.qty.message}</p>
                )}
              </div>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="price"
                  placeholder="Price"
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                ></input>
                {errors.price && (
                  <p className={styles.errorMessage}>{errors.price.message}</p>
                )}
              </div>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="buyerName"
                  placeholder="Buyer name"
                  {...register("buyerName", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                ></input>
                {errors.buyerName && (
                  <p className={styles.errorMessage}>
                    {errors.buyerName.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="addressBuyer"
                  placeholder="Address buyer"
                  {...register("addressBuyer", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                ></input>
                {errors.addressBuyer && (
                  <p className={styles.errorMessage}>
                    {errors.addressBuyer.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="soldDate"
                  placeholder="Sold date"
                  {...register("soldDate", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                ></input>
                {errors.soldDate && (
                  <p className={styles.errorMessage}>
                    {errors.soldDate.message}
                  </p>
                )}
              </div>
              <div className={styles.selectStatus}>
                <select
                  className={styles.selectModal}
                  id="sellerName"
                  {...register("sellerName", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                >
                  <option value="">seller name</option>
                  <option value="Rocio Esther Alvarado Gomez">
                    Rocio Alvarado
                  </option>
                  <option value="Juan José Casas Rubio">Juan Casas</option>
                  <option value="Mariana Rios">Mariana Rios</option>
                </select>
                {errors.sellerName && (
                  <p className={styles.errorMessage}>
                    {errors.sellerName.message}
                  </p>
                )}
              </div>
            </section>
            <section className={styles.areaSaveButton}>
              <button type="submit" className={styles.saveEditButton}>
                Save
              </button>
            </section>
          </form>
        </div>
      </div>
    </>
  ) : null;
}

ModalSales.propTypes = {
  attrProduct: PropTypes.object,
  onClickCloseModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};