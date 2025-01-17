import axios from "axios";
import Cookies from "js-cookie";

// export const baseUrl = "http://localhost:8000";
export const baseUrl = "https://admin.wefaq-co.com";

const axiosInstace = axios.create({ baseURL: `${baseUrl}/api` });

axiosInstace.interceptors.request.use(config => {
  config.headers['Authorization'] = Cookies.get("token");
  return config;
});

export default axiosInstace;