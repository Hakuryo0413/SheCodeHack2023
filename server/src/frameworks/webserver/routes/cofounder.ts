import express from "express";
import cofounderController from "../../../adapters/controllers/cofounderController";
import { cofounderDbRepository } from "../../../app/repositories/cofounderDbRepository";
import { CofounderRepositoryMongoDB } from "../../database/mongoDb/repositories/cofounderRepositoryMongoDB";
import { Cofounder } from "../../database/mongoDb/models/cofounderModel";
import { upload } from "../middleware/multerCloudinary";
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

const cofounderMiddleware = roleMiddleware("cofounder");

const cofounderRouter = () => {
  const route = express.Router();

  const controller = cofounderController(
    cofounderDbRepository,
    CofounderRepositoryMongoDB,
    Cofounder
  );

  route.get(
    "/cofounder-data",
    authenticationMiddleware,
    cofounderMiddleware,
    controller.getCofounderById
  );
  route.put(
    "/update-cofounder",
    authenticationMiddleware,
    cofounderMiddleware,
    upload,
    controller.updateCofounder
  );
  route.get("/cofounder-data/:empId", controller.getCofounderByIdParam);

  return route;
};

export default cofounderRouter;
