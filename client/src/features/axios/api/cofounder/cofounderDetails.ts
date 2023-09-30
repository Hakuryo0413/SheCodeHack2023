import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptorsCofounder from "../../interceptors/axiosInterceptorCofounder";
import { CofounderRegisterPayload } from "../../../../types/PayloadInterface";

const api = setupAxiosInterceptorsCofounder();

export const cofounderData = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.cofounderData,
      method: "get",
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("error while getting cofounder data");
  }
};

export const updateCofounder = async (
  payload: CofounderRegisterPayload
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.updateCofounder,
      method: "put",
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await api(config);
    return response;
  } catch (error) {
    throw new Error("error while updating cofounder");
  }
};
