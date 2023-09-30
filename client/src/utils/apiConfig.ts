import configKeys from "./config";

const apiConfig = {
  userRegister: `${configKeys.API_URL}user-auth/register`,
  userLogin: `${configKeys.API_URL}user-auth/login`,
  googleSignIN: `${configKeys.API_URL}user-auth/sign-in-with-google`,
  userData: `${configKeys.API_URL}user/user-data`,
  updateUser: `${configKeys.API_URL}user/update-user`,
  uploadResume: `${configKeys.API_URL}user/update-resume`,
  deleteResume: `${configKeys.API_URL}user/delete-resume`,
  userCheckIn: `${configKeys.API_URL}user/check-in`,

  cofounderRegister: `${configKeys.API_URL}cofounder-auth/register`,
  cofounderLogin: `${configKeys.API_URL}cofounder-auth/login`,
  emailVerify: `${configKeys.API_URL}cofounder-auth/email-verify`,
  OTPVerify: `${configKeys.API_URL}cofounder-auth/email-OTP`,
  cofounderData: `${configKeys.API_URL}cofounder/cofounder-data`,
  updateCofounder: `${configKeys.API_URL}cofounder/update-cofounder`,

  cofounderJObs: `${configKeys.API_URL}job/cofounder-jobs`,
  createNewJob: `${configKeys.API_URL}job/create-job`,
  updateJob: `${configKeys.API_URL}job/update-job`,
  deleteJob: `${configKeys.API_URL}job/delete-job`,
  jobData: `${configKeys.API_URL}job/job-data`,
  allJobs: `${configKeys.API_URL}job/all-jobs`,
  filterJobs: `${configKeys.API_URL}job/filter-jobs`,
  type: `${configKeys.API_URL}job/distinct`,

  applyJob: `${configKeys.API_URL}job-application/create-application`,
  isApplied: `${configKeys.API_URL}job-application/is-applied`,
  allApplication: `${configKeys.API_URL}job-application/all-applications`,
  applicationDetails: `${configKeys.API_URL}job-application/applicant-details`,
  changeStatus: `${configKeys.API_URL}job-application/change-status`,
  allUserApplications: `${configKeys.API_URL}job-application/user-applications`,

  getConversations: `${configKeys.API_URL}messenger-conversation`,
  getMessages: `${configKeys.API_URL}messenger-message`,
};

export default apiConfig;
