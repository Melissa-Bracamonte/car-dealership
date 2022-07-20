import React, { useContext } from "react";
import { UserContext } from "../context/ContextUser";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./login.module.css";
import women from "../../img/women.jpg";
import Navbar from "../home/Navbar";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  const { loginUser } = useContext(UserContext);

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      navigate("/products");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("email", {
            message: "User not found",
          });
          break;
        default:
      }
    }
  };

  return (
    <>
      <Navbar />

      <section className={styles.loginAndPicture}>
        <section className={styles.containerLoginArea}>
          <form
            className={styles.formContainer}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className={styles.loginTitle}>Login</h1>
            <div>
              <input
                type={"email"}
                placeholder="E-mail"
                className={styles.inputLogin}
                id="inputEmail"
                {...register("email", {
                  required: { value: true, message: "This field is required" },
                  pattern: {
                    value:
                      /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                    message: "Wrong email format",
                  },
                })}
              />
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                type={"password"}
                placeholder="Password"
                className={styles.inputLogin}
                id="inputPassword"
                {...register("password", {
                  setValueAs: (v) => v.trim(),
                  minLength: {
                    value: 6,
                    message: "Min 6 characters",
                  },
                  validate: {
                    trim: (v) => {
                      if (!v.trim())
                        return "Enter letters, characters or numbers";
                      return true;
                    },
                  },
                })}
              />
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className={styles.loginButton}
              id="buttonContinue"
            >
              Login
            </button>
          </form>
        </section>
        <section className={styles.imgWomen}>
          <picture>
            <img className={styles.women} src={women} alt="women" />
          </picture>
        </section>
      </section>
    </>
  );
};

export default Login;
