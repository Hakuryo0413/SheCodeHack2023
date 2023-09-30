import { Request, Response } from "express";
import { CustomRequest } from "../../types/expressRequest";
import { CofounderDbInterface } from "../../app/repositories/cofounderDbRepository";
import { CofounderRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/cofounderRepositoryMongoDB";
import expressAsyncHandler from "express-async-handler";
import { CofounderModel } from "../../frameworks/database/mongoDb/models/cofounderModel";
import { CofounderInterface } from "../../types/cofounderInterface";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";
import {
  updatedCofounder,
  findCofounderById,
} from "../../app/useCases/cofounder/cofounder";

const cofounderController = (
  cofounderDbRepository: CofounderDbInterface,
  cofounderDbRepositoryImpl: CofounderRepositoryMongoDB,
  cofounderModel: CofounderModel
) => {
  const dbRepositoryCofounder = cofounderDbRepository(
    cofounderDbRepositoryImpl(cofounderModel)
  );

  //for getting the data with token data.
  const getCofounderById = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const customReq = req as CustomRequest;
      const id = customReq.payload ?? "";
      const cofounderData = await findCofounderById(id, dbRepositoryCofounder);
      res.json({ status: "success", cofounderData });
    }
  );
  //for getting the data with id only.
  const getCofounderByIdParam = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const cofounderId = req.params.empId;
      const cofounderData = await findCofounderById(
        cofounderId,
        dbRepositoryCofounder
      );
      res.json(cofounderData);
    }
  );

  const updateCofounder = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const customReq = req as CustomRequest;
      const cofounderId = customReq.payload ?? "";
      if (!cofounderId) {
        throw new AppError(
          "unauthorized request, invalid token",
          HttpStatus.UNAUTHORIZED
        );
      }
      const updates: CofounderInterface = req.body;
      if (req?.file?.path) {
        updates.image = req?.file?.path;
      }
      const updateCofounderData = await updatedCofounder(
        cofounderId,
        updates,
        dbRepositoryCofounder
      );

      res.json({
        status: "success",
        updateCofounderData,
      });
    }
  );

  return {
    getCofounderById,
    updateCofounder,
    getCofounderByIdParam,
  };
};

export default cofounderController;
