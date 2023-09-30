import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import { JobCreationPayload } from "../../../../types/PayloadInterface";
import setupAxiosInterceptorsCofounder from "../../interceptors/axiosInterceptorCofounder";

const api = setupAxiosInterceptorsCofounder();

const updateJob = async (
  payload: JobCreationPayload,
  jobId: string
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.updateJob}/${jobId}`,
      method: "put",
      data: payload,
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("error while updating new job");
  }
};

export default updateJob;
