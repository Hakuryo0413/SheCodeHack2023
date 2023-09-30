import express from "express";
import cofounderAuthController from "../../../adapters/controllers/cofounderAuthController";
import { cofounderDbRepository } from "../../../app/repositories/cofounderDbRepository";
import { CofounderRepositoryMongoDB } from "../../database/mongoDb/repositories/cofounderRepositoryMongoDB";
import { authService } from "../../services/authService";
import { authServiceInterface } from "../../../app/services/authServiceInterface";
import { Cofounder } from "../../database/mongoDb/models/cofounderModel";
import { emailServiceInterface } from "../../../app/services/emailServiceInterface";
import { sendEmailService } from "../../services/emailService";

const cofounderAuthRouter = () => {
  const route = express.Router();

  const controller = cofounderAuthController(
    authServiceInterface,
    authService,
    cofounderDbRepository,
    CofounderRepositoryMongoDB,
    Cofounder,
    emailServiceInterface,
    sendEmailService
  );

  route.post("/register", controller.cofounderRegister);
  route.post("/login", controller.loginCofounder);
  route.get("/email-verify/:emailId", controller.emailVerification);
  route.get("/email-OTP/:OTP", controller.OTPVerification);

  return route;
};

export default cofounderAuthRouter;
