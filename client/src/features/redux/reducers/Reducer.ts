import { combineReducers } from "redux";
import tokenReducer from "../slices/user/tokenSlice";
import cofounderJobsReducer from "../slices/cofounder/cofounderJobsSlice";
import cofounderDetailsReducer from "../slices/cofounder/cofounderDetailsSlice";
import allJobReducer from "../slices/user/getAllJobsSlice";
import jobDetailReducer from "../slices/user/jobDetailsSlice";
import cofounderJobDetailReducer from "../slices/cofounder/cofounderJobDetailsSlice";
import cofounderTokenReducer from "../slices/cofounder/cofounderTokenSlice";
import userLoginAuthReducer from "../slices/user/userLoginAuthSlice";
import userDetailsReducer from "../slices/user/userDetailsSlice";
import userAllApplicationReducer from "../slices/user/allApplicationSlice";
import userApplicationDetailsReducer from "../slices/user/userApplicationDetailsSlice";

const rootReducer = combineReducers({
  token: tokenReducer,
  cofounderToken: cofounderTokenReducer,
  cofounderJobs: cofounderJobsReducer,
  cofounderDetails: cofounderDetailsReducer,
  allJobs: allJobReducer,
  jobDetails: jobDetailReducer,
  cofounderJobDetails: cofounderJobDetailReducer,
  userAuth: userLoginAuthReducer,
  userDetails: userDetailsReducer,
  userApplications: userAllApplicationReducer,
  applicationDetails: userApplicationDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
