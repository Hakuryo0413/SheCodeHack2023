import { Schema, model } from "mongoose";

const cofounderSchema = new Schema({
  companyName: {
    type: String,
    required: [true, "Please add a company name"],
  },
  // industry: {
  //   type: String,
  //   required: [true, "Please add the industry name"],
  // },
  email: {
    type: String,
    required: [true, "Please add an email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: false,
  },
  experience: {
    type: String,
    required: false,
  },
  education: {
    type: String,
    required: false,
  },
  logo: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: "cofounder",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  image: {
    type: String,
  },
});

export const Cofounder = model("Cofounder", cofounderSchema, "cofounders");

export type CofounderModel = typeof Cofounder;
