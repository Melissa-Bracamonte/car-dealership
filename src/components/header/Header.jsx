import React, { useContext } from "react";
import { UserContext } from "../context/ContextUser";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";

const Header = () => {
  const navigate = useNavigate();

  const { logOut } = useContext(UserContext);

  const handleClickLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const menu = document.getElementById("menu");
  const activateBtn = () => {
    menu.classList.toggle("hidden");
  };

  const logoStyle = {
    width: "100px",
    height: "35px",
  };

  return (
    <>
      <nav class="flex items-center justify-between flex-wrap bg-teal-900 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <span class="font-semibold text-xl tracking-tight">
            <a href="/products">
              <img src={logo} alt="logo" style={logoStyle} />
            </a>
          </span>
        </div>
        <div class="block lg:hidden">
          <button
            onClick={activateBtn}
            id="btnNav"
            class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          >
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          id="menu"
          class="w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        >
          <div class="text-sm lg:flex-grow">
            <a
              href="/products"
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Products
            </a>
            <a
              href="/sales"
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Sales
            </a>
            <a
              href="/team"
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Team
            </a>
          </div>
          <button
            onClick={handleClickLogout}
            class="bg-red-800 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full"
          >
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
