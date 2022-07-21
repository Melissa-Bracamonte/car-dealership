import React, { useState, useEffect } from "react";
import styles from "./team.module.css";
import imgDelete from "../../img/imgDelete.png";
import imgEdit from "../../img/imgEdit.png";
import { ModalTeam } from "../modal/ModalTeam";
import Header from '../header/Header'

const Team = () => {
  const [team, setTeam] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [idDeletedEmployee, setIdDeletedEmployee] = useState("");
  const [objPopup, setPopup] = useState({ visibility: false });

  const getAllTeam = () => {
    // fetch("http://localhost:3004/team")
    fetch("https://62d9b3b89eedb69963614c4e.mockapi.io/api/vehicles/team")
      .then((response) => response.json())
      .then((employees) => setTeam(employees));
  };

  useEffect(() => {
    getAllTeam();
  }, []);

  const editEmployee = (popupProduct) => {
    setPopup({ visibility: true, popupProduct });
  };

  const onClickHide = () => {
    getAllTeam();
    setPopup({ visibility: false });
  };

  const toggleModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const deletePerson = (id) => {
    setIdDeletedEmployee(id);
    toggleModalDelete();
  };

  const deleteEmployee = (employee) => {
    // fetch(`http://localhost:3004/team/${employee.id}`, {
      fetch(`https://62d9b3b89eedb69963614c4e.mockapi.io/api/vehicles/team/${employee.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((deletedEmployee) => {
        console.log(deletedEmployee);
        getAllTeam();
      });
    toggleModalDelete();
  };

  const onAdd = () => {
    let popupProduct = {};
    setPopup({ visibility: true, popupProduct });
  };

  return (
    <>
      <Header />

      <ModalTeam
        onClickCloseModal={onClickHide}
        visible={objPopup.visibility}
        attrProduct={objPopup.popupProduct}
      />

      <section>
        <div className={styles.productsTable}>
          <div>
            <div className={styles.titleTable}>
            TEAM
              <button className={styles.addButton} onClick={onAdd}>
                <i class="fa-solid fa-user-plus"></i>
              </button>
            </div>
          </div>
          <div className={styles.mainHeaderTable}>
            <div className={styles.headerTable}>Employee</div>
            <div className={styles.headerTable}>E-mail</div>
            <div className={styles.headerTable}>Rol</div>
            <div className={styles.headerTable}>Id</div>
            <div className={styles.headerTable}>Edit</div>
            <div className={styles.headerTable}>Delete</div>
          </div>
          <div className={styles.scrollProduct}>
            {team.map((employee) => {
              return (
                <div key={employee.id} className={styles.containerItems}>
                  <div className={styles.itemAlignStart}>{employee.employee}</div>
                  <div className={styles.itemTable}>{employee.email}</div>
                  <div className={styles.itemTable}>{employee.rol}</div>
                  <div className={styles.itemTable}>{employee.id}</div>
                  <div className={styles.itemTable}>
                    <button className={styles.btnEditAndDelete}>
                      <img
                        alt="imgEdit"
                        className={styles.imgEdit}
                        src={imgEdit}
                        onClick={() => editEmployee(employee)}
                      ></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnEditAndDelete}
                      onClick={() => deletePerson(employee)}
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
                onClick={() => deleteEmployee(idDeletedEmployee)}
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
  )
}

export default Team