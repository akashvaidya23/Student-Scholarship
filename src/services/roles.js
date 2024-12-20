import axios from "axios";
import { localBaseUrl } from "../constants";

const getStudents = async () => {
  try {
    const response = await axios.get(`${localBaseUrl}api/users/?role=students`);
    return response.data.users;
  } catch (error) {
    console.error(error);
  }
};

export { getStudents };
