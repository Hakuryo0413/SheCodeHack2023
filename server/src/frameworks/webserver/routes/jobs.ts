import express from "express";
import jobController from "../../../adapters/controllers/jobControllers";
import { jobDbRepository } from "../../../app/repositories/jobDbRepository";
import { JobRepositoryMongoDB } from "../../database/mongoDb/repositories/jobRepositoryMongoDB";
import { Job } from "../../database/mongoDb/models/jobModel";
import roleMiddleware from "../middleware/roleMiddleware";

const userMiddleware = roleMiddleware("user");
const cofounderMiddleware = roleMiddleware("cofounder");

const jobRouter = () => {
  const route = express.Router();

  const controller = jobController(jobDbRepository, JobRepositoryMongoDB, Job);

  route.get(
    "/cofounder-jobs",
    cofounderMiddleware,
    controller.getJobsByCofounder
  );
  route.post("/create-job", cofounderMiddleware, controller.createNewJob);
  route.put("/update-job/:id", cofounderMiddleware, controller.updateTheJob);
  route.delete("/delete-job/:id", cofounderMiddleware, controller.deleteTheJob);
  route.get("/all-jobs", userMiddleware, controller.findAllJobs);
  route.get("/job-data/:id", controller.jobDataById);
  route.get("/distinct/:field", userMiddleware, controller.titleLocationSalary);
  route.post("/filter-jobs", userMiddleware, controller.filterJobs);

  return route;
};

export default jobRouter;
