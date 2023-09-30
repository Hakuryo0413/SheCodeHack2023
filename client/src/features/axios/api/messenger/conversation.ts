import axios, { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import setupAxiosInterceptorsCofounder from "../../interceptors/axiosInterceptorCofounder";

const userApi = setupAxiosInterceptors();
const empApi = setupAxiosInterceptorsCofounder();

export const getUserConversations = async (userId: string): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.getConversations}/${userId}`,
      method: "get",
    };
    const res = await userApi(config);
    return res.data;
  } catch (error) {
    throw new Error("Error while getting user conversations");
  }
};

export const getCofounderConversations = async (
  empId: string
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.getConversations}/${empId}`,
      method: "get",
    };
    const res = await empApi(config);
    return res.data;
  } catch (error) {
    throw new Error("Error while getting cofounder conversations");
  }
};

export const createConversation = async (
  user1: string,
  user2: string
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.getConversations}`,
      method: "post",
      data: {
        senderId: user1,
        receiverId: user2,
      },
    };
    const res = await axios(config);
    return res.data;
  } catch (error) {
    throw new Error("Error while creating conversation");
  }
};
