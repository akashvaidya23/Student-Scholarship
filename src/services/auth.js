import axios from "axios";
import { localBaseUrl } from "../constants";

const login = async (payload) => {
  try {
    const login = await axios({
      method: "post",
      url: `${localBaseUrl}api/login`,
      data: payload,
    });

    if (login.data.status == false) {
      return login.data;
    } else {
      localStorage.setItem("token", login.data.user.id);
      return { status: true, user: login.data.user };
    }
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      return {
        status: false,
        message: "Unable to connect to the server. Please try again later.",
      };
    } else if (error.response) {
      return {
        status: false,
        message: error.response.data.message,
      };
    } else {
      return {
        status: false,
        message: "An unexpected error occurred. Please try again.",
      };
    }
  }
};

const registerUser = async (payload) => {
  try {
    const response = await axios({
      method: "post",
      url: `http://localhost:8080/api/users`,
      data: payload,
    });

    if (response.data.status == false) {
      return response.data;
    } else {
      localStorage.setItem("token", response.data.user.insertId);
      return { status: true, user: response.data.user };
    }
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      return {
        status: false,
        message: "Unable to connect to the server. Please try again later.",
      };
    } else if (error.response) {
      return {
        status: false,
        message: error.response.data.message,
      };
    } else {
      return {
        status: false,
        message: "An unexpected error occurred. Please try again.",
      };
    }
  }
};

const logout = () => {
  localStorage.clear();
};

const checkIfLoggedIn = () => {
  const token = localStorage.getItem("token");
  return token;
};

const createAdmin = async () => {
  try {
    const response = await axios({
      method: "post",
      url: `http://localhost:8080/api/users`,
      data: {
        name: "Admin",
        email: "admin@gmail.com",
        mobileNo: "1234568753",
        userName: "admin",
        role: "admin",
        password: "Admin@123",
      },
    });
    if (response.data.status == false) {
      return response.data;
    } else {
      return { status: true, user: response.data.user };
    }
  } catch (err) {
    console.log(err);
  }
};

export { login, registerUser, logout, checkIfLoggedIn, createAdmin };
