import axios from "axios";
import { localBaseUrl } from "../constants";

const getUsers = async (role) => {
  try {
    const response = await axios.get(`${localBaseUrl}api/users/?role=${role}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getUsers };
