import { HttpStatus } from "../../../types/httpStatus";
import { CreateCofounderInterface } from "../../../types/cofounderInterface";
import AppError from "../../../utils/appError";
import { CofounderDbInterface } from "../../repositories/cofounderDbRepository";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { EmailServiceInterface } from "../../services/emailServiceInterface";

export const registerCofounder = async (
  cofounder: CreateCofounderInterface,
  cofounderRepository: ReturnType<CofounderDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  cofounder.email = cofounder?.email?.toLowerCase();
  const isExistingEmail = await cofounderRepository.getCofounderByEmail(
    cofounder.email ?? ""
  );
  if (isExistingEmail) {
    throw new AppError("email already exists", HttpStatus.CONFLICT);
  }
  cofounder.password = await authService.encryptPassword(
    cofounder.password ?? ""
  );
  const result = await cofounderRepository.createCofounder(cofounder);
  return result;
};

export const cofounderLogin = async (
  email: string,
  password: string,
  cofounderRepository: ReturnType<CofounderDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const cofounder = await cofounderRepository.getCofounderByEmail(email);
  if (!cofounder) {
    throw new AppError("no user found", HttpStatus.UNAUTHORIZED);
  }

  const isPasswordCorrect = await authService.comparePassword(
    password,
    cofounder.password ?? ""
  );
  if (!isPasswordCorrect) {
    throw new AppError("Incorrect password", HttpStatus.UNAUTHORIZED);
  }
  const token = authService.generateToken(
    cofounder._id.toString(),
    "cofounder"
  );
  return token;
};

export const cofounderEmailVerification = async (
  email: string,
  cofounderRepository: ReturnType<CofounderDbInterface>,
  emailService: ReturnType<EmailServiceInterface>
) => {
  const existingEmail = await cofounderRepository.getCofounderByEmail(email);

  if (existingEmail) {
    throw new AppError("email already exists", HttpStatus.CONFLICT);
  }

  emailService.sendOtpEmail(email);
};

export const verifyEmailOTP = async (
  OTP: string,
  emailService: ReturnType<EmailServiceInterface>
) => {
  const response = emailService.verifyOTP(OTP);

  if (response.message !== "OTP verified") {
    throw new AppError("Invalid OTP", HttpStatus.BAD_REQUEST);
  }

  return response;
};
