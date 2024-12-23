import axios from "axios";
import { localBaseUrl } from "../constants";

/**
 * Logs a user in and returns a response with a status and a user object.
 *
 * If the request is successful, the status will be true and the user object
 * will contain the user's id and role.
 *
 * If the request is unsuccessful, the status will be false and the message
 * will contain the error message returned from the server.
 *
 * @param {Object} payload
 * @param {string} payload.username
 * @param {string} payload.password
 * @param {string} payload.role
 * @returns {Promise<Object>}
 */
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
      localStorage.setItem("token", JSON.stringify(login.data.user));
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

/**
 * Registers a user and logs them in if successful.
 *
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} payload.email
 * @param {string} payload.mobile_no
 * @param {string} payload.username
 * @param {string} payload.password
 * @param {string} payload.role
 * @returns {Promise<Object>}
 */
const registerUser = async (payload) => {
  try {
    const response = await axios({
      method: "post",
      url: `${localBaseUrl}api/users`,
      data: payload,
    });

    if (response.data.status == false) {
      return response.data;
    } else {
      localStorage.setItem("token", JSON.stringify(response.data.user));
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

/**
 * Logs out the current user by clearing all data stored in localStorage.
 *
 * This function removes the authentication token and any other information
 * stored in localStorage, effectively logging the user out of the application.
 */

const logout = () => {
  localStorage.clear();
};

/**
 * Checks if a user is logged in by checking for the existence of a valid
 * authentication token in localStorage.
 *
 * @returns {string|null} The authentication token if a user is logged in,
 *   null otherwise.
 */
const checkIfLoggedIn = () => {
  const token = localStorage.getItem("token");
  return JSON.parse(token);
};

/**
 * Creates an admin user in the database.
 *
 * This function creates a new user in the database with the given
 * information. It returns a response object with a status and a user
 * object if the request is successful, or an error message if the
 * request is unsuccessful.
 *
 * @returns {Promise<Object>} A response object with a status and a user
 *   object if the request is successful, or an error message if the
 *   request is unsuccessful.
 */
const createAdmin = async () => {
  try {
    const response = await axios({
      method: "post",
      url: `${localBaseUrl}api/users`,
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
