import { JobInterface } from "../../../../types/jobInterface";
import { JobEntity } from "../../../../entities/JobEntity";
import { JobModel } from "../models/jobModel";

export const JobRepositoryMongoDB = (model: JobModel) => {
  const jobEntity = new JobEntity(model);

  const createJob = async (job: JobInterface) => {
    const newJob = await jobEntity.createJob(job);
    return newJob;
  };

  const updateJob = async (jobId: string, updates: Partial<JobInterface>) => {
    const updatedJob = await jobEntity.updateJob(jobId, updates);
    return updatedJob;
  };

  const deleteJob = async (jobId: string) => {
    await jobEntity.deleteJob(jobId);
  };

  const findJobByCofounder = async (cofounderId: string) => {
    const jobs = await jobEntity.getJobByCofounder(cofounderId);
    return jobs;
  };

  const findAllJobs = async () => {
    const allJobs = await jobEntity.getAllJobs();
    return allJobs;
  };

  const findJobById = async (id: string) => {
    const jobData = await jobEntity.getJobById(id);
    return jobData;
  };

  const titlePlaceSalary = async (title: string) => {
    const distinct = await jobEntity.titleLocationSalary(title);
    return distinct;
  };

  const filterJobs = async (role: string, location: string, topic: string) => {
    const jobs = await jobEntity.filterJob(role, location, topic);
    return jobs;
  };

  return {
    createJob,
    updateJob,
    deleteJob,
    findJobByCofounder,
    findAllJobs,
    findJobById,
    titlePlaceSalary,
    filterJobs,
  };
};

export type JobRepositoryMongoDB = typeof JobRepositoryMongoDB;
