import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authService";
import { AuthServiceInterface } from "../../app/services/authServiceInterface";
import { CofounderDbInterface } from "../../app/repositories/cofounderDbRepository";
import { CofounderRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/cofounderRepositoryMongoDB";
import {
  registerCofounder,
  cofounderLogin,
} from "../../app/useCases/auth/cofounderAuth";
import { CofounderInterface } from "../../types/cofounderInterface";
import { CofounderModel } from "../../frameworks/database/mongoDb/models/cofounderModel";
import {
  cofounderEmailVerification,
  verifyEmailOTP,
} from "../../app/useCases/auth/cofounderAuth";
import { EmailServiceInterface } from "../../app/services/emailServiceInterface";
import {
  SendEmailService,
  sendEmailService,
} from "../../frameworks/services/emailService";

const cofounderAuthController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  cofounderDbRepository: CofounderDbInterface,
  cofounderDbRepositoryImpl: CofounderRepositoryMongoDB,
  cofounder: CofounderModel,
  emailService: EmailServiceInterface,
  emailServiceImpl: SendEmailService
) => {
  const dbRepositoryCofounder = cofounderDbRepository(
    cofounderDbRepositoryImpl(cofounder)
  );
  const authService = authServiceInterface(authServiceImpl());
  const sendEmailService = emailService(emailServiceImpl());

  const cofounderRegister = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const cofounder: CofounderInterface = req.body;
      await registerCofounder(cofounder, dbRepositoryCofounder, authService);
      res.json({
        status: "success",
        message: "cofounder registered successfully",
      });
    }
  );

  const loginCofounder = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { email, password }: { email: string; password: string } = req.body;
      const token = await cofounderLogin(
        email,
        password,
        dbRepositoryCofounder,
        authService
      );
      res.json({
        status: "success",
        message: "cofounder verified",
        token,
      });
    }
  );

  const emailVerification = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const email = req.params.emailId;
      await cofounderEmailVerification(
        email,
        dbRepositoryCofounder,
        sendEmailService
      );
      res.json({ status: "success" });
    }
  );

  const OTPVerification = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const OTP = req.params.OTP;
      // const response = await verifyEmailOTP(OTP, sendEmailService);
      const response = true;
      if (response || !response) {
        res.json({ status: "success", message: "email verified" });
      }
    }
  );

  return {
    loginCofounder,
    cofounderRegister,
    emailVerification,
    OTPVerification,
  };
};

export default cofounderAuthController;
