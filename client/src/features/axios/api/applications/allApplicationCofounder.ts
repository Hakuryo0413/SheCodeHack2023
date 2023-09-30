import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptorsCofounder from "../../interceptors/axiosInterceptorCofounder";

const api = setupAxiosInterceptorsCofounder();

export const allApplications = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.allApplication,
      method: "get",
    };
    const applications = await api(config);
    return applications.data;
  } catch (error) {
    throw new Error("error while getting applications");
  }
};
