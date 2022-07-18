import React, { useEffect } from "react";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

Modal.propTypes = {
  attrProduct: PropTypes.object,
  onClickCloseModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export function Modal({ attrProduct, onClickCloseModal, visible }) {
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
    setValue("color", attrProduct?.color);
    setValue("mileage", attrProduct?.mileage);
    setValue("price", attrProduct?.price);
    setValue("status", attrProduct?.status);
  }, [attrProduct]);

  const onSubmit = async (data) => {
    saveProduct({
      ...attrProduct,
      brand: data.brand,
      category: data.category,
      model: data.model,
      color: data.color,
      mileage: data.mileage,
      price: data.price,
      status: data.status,
    });
  };

  const saveProduct = (product) => {
    if (product && product.id) {
      fetch(`http://localhost:3004/vehicles/${product.id}`, {
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
      fetch("http://localhost:3004/vehicles", {
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
          <section className={styles.titleModal}>Vehicle</section>
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
                  id="color"
                  placeholder="Color"
                  {...register("color", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                ></input>
                {errors.color && (
                  <p className={styles.errorMessage}>{errors.color.message}</p>
                )}
              </div>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="mileage"
                  placeholder="Mileage"
                  {...register("mileage", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                ></input>
                {errors.mileage && (
                  <p className={styles.errorMessage}>
                    {errors.mileage.message}
                  </p>
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
              <div className={styles.selectStatus}>
                <select
                  className={styles.selectModal}
                  id="status"
                  {...register("status", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                >
                  <option value="">Status</option>
                  <option value="In stock">In stock</option>
                  <option value="Sold">Sold</option>
                </select>
                {errors.status && (
                  <p className={styles.errorMessage}>{errors.status.message}</p>
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
