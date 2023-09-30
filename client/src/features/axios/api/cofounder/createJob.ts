import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import { JobCreationPayload } from "../../../../types/PayloadInterface";
import setupAxiosInterceptorsCofounder from "../../interceptors/axiosInterceptorCofounder";

const api = setupAxiosInterceptorsCofounder();

const createNewJob = async (payload: JobCreationPayload): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.createNewJob,
      method: "post",
      data: payload,
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("error while creating new job");
  }
};

export default createNewJob;
