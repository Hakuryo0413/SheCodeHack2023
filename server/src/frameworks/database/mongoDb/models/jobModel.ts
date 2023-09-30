import { Schema, model } from "mongoose";

const jobSchema = new Schema({
  title: {
    type: String,
    required: [true, "please provide the title for the job "],
  },
  description: {
    type: String,
    required: [true, "please provide the job description"],
  },
  location: {
    type: String,
    required: [true, "please give the location"],
  },
  employmentType: {
    type: String,
    required: [false, "please give the employment type"],
  },
  education: {
    type: String,
    required: [true, "please give the education"],
  },
  timetable: {
    type: String,
    required: [true, "please give the timetable"],
  },
  language: {
    type: String,
    required: [true, "please give the language"],
  },
  experience: {
    type: Number,
    required: [true, "please give the experience"],
  },
  joined: {
    type: String,
    required: [true, "please give the joined"],
  },
  workplace: {
    type: String,
    required: [true, "please give the workplace"],
  },
  topic: {
    type: String,
    require: [true, "please give the topic"],
  },
  role: {
    type: String,
    require: [true, "please give the role"],
  },
  requirements: {
    type: Array,
    required: true,
  },
  responsibilities: {
    type: Array,
    required: true,
  },
  note: {
    type: String,
    require: false,
  },
  // salary: {
  //     type: Number,
  //     required: false
  // },
  openings: {
    type: Number,
    required: [true, "please add the number of openings"],
  },
  cofounder: {
    type: Schema.Types.ObjectId,
    ref: "Cofounder",
    required: [true, "please add cofounderId"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Job = model("Job", jobSchema, "jobs");
export type JobModel = typeof Job;
