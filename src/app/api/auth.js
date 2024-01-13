import axios from "axios";
import { AUTH } from "../constants/global";

const authAPI = {
  register: async (body) => {
    try {
      const response = await axios.post(`${AUTH.REGISTER}`, body);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  login: async (body) => {
    try {
      const response = await axios.post(`${AUTH.LOGIN}`, body);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authAPI;
