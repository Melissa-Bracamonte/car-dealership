import React, { useEffect } from "react";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export function ModalTeam({ attrProduct, onClickCloseModal, visible }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("employee", attrProduct?.employee);
    setValue("email", attrProduct?.email);
    setValue("rol", attrProduct?.rol);
  }, [attrProduct]);

  const onSubmit = async (data) => {
    saveEmployee({
      ...attrProduct,
      employee: data.employee,
      email: data.email,
      rol: data.rol,
    });
  };

  const saveEmployee = (employee) => {
    if (employee && employee.id) {
      // fetch(`http://localhost:3004/team/${employee.id}`, {
        fetch(`https://62d9b3b89eedb69963614c4e.mockapi.io/api/vehicles/team/${employee.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(employee),
      })
        .then((response) => response.json())
        .then((addedEmployee) => {
          console.log(addedEmployee);
          onClickCloseModal();
        });
    } else {
      // fetch("http://localhost:3004/team", {
        fetch("https://62d9b3b89eedb69963614c4e.mockapi.io/api/vehicles/team", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(employee),
      })
        .then((response) => response.json())
        .then((addedEmployee) => {
          console.log(addedEmployee);
          onClickCloseModal();
        });
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Employee saved",
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
          <section className={styles.titleModal}>Team</section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className={styles.AllInputs}>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="employee"
                  placeholder="Name"
                  {...register("employee", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                ></input>
                {errors.employee && (
                  <p className={styles.errorMessage}>
                    {errors.employee.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="email"
                  placeholder="E-mail"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                ></input>
                {errors.email && (
                  <p className={styles.errorMessage}>{errors.email.message}</p>
                )}
              </div>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="rol"
                  placeholder="Rol"
                  {...register("rol", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                ></input>
                {errors.rol && (
                  <p className={styles.errorMessage}>{errors.rol.message}</p>
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

ModalTeam.propTypes = {
  attrProduct: PropTypes.object,
  onClickCloseModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
