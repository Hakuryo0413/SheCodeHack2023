import axios, { AxiosRequestConfig } from "axios";
import {
  CofounderRegisterPayload,
  LoginPayload,
} from "../../../../types/PayloadInterface";
import apiConfig from "../../../../utils/apiConfig";

export const cofounderLogin = async (payload: LoginPayload): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.cofounderLogin}`,
      method: "post",
      data: payload,
    };
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 401") {
      throw new Error("Incorrect email or password !!");
    } else {
      throw new Error("Login failed, try again later");
    }
  }
};

export const registerCofounder = async (payload: CofounderRegisterPayload) => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.cofounderRegister}`,
      method: "post",
      data: payload,
    };
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 409") {
      throw new Error("Email already exists !!!");
    } else {
      throw new Error("Signup failed, try again");
    }
  }
};

export const emailVerify = async (email: string) => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.emailVerify}/${email}`,
      method: "get",
    };
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 409") {
      throw new Error("Try another email !!!");
    } else {
      throw new Error("verification failed");
    }
  }
};

export const OTPVerify = async (OTP: string) => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.OTPVerify}/${OTP}`,
      method: "get",
    };
    const response = await axios(config);
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 400") {
      throw new Error("Invalid OTP !!!");
    } else {
      throw new Error("verification failed");
    }
  }
};
