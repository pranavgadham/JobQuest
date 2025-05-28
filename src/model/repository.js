import { recruiterSchem } from "./recruiter.schema.js";
import { applicantSchema } from "./applicant.schema.js";
import { jobSchema } from "./jobs.schema.js";
import mongoose from "mongoose";
import { hashPassword,compareHashedPassword } from "../utils/hashPassword.js";

const jobModel = mongoose.model("Job", jobSchema);
const recruiterModel = mongoose.model("Recruiter", recruiterSchem);
const applicantModel = mongoose.model("Applicants", applicantSchema);

export default class jobQuestRepository {
  // Recruiter Operations
  async addUser({ name, email, password }) {
    const encryptedPass = await hashPassword(password)
    const newUser = new recruiterModel({ name, email,password:encryptedPass });
    const result = await newUser.save();
    return result;
  }
  async verify({ email, password }) {
    const recruiter = await recruiterModel.findOne({ email: email });
    if (!recruiter) {
      throw new Error("Recruiter not found");
    }
    const isPasswordValid = await compareHashedPassword(password, recruiter.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return recruiter;
  }

  //Job Operations
  async getAllJobs() {
    const jobs = await jobModel.find({});
    return jobs;
  }
  async getJobById(id) {
    const job = await jobModel.findById(id);
    return job;
  }
  async addJob(
    hostId,
    { company, role, location, salary, deadline, openings, skills }
  ) {
    const skill = skills.split(",");
    const job = new jobModel({
      id: Date.now(),
      company: company,
      role: role,
      location: location,
      salary: salary,
      deadline: deadline,
      openings: openings,
      skills: skill,
      host: hostId,
    });
    await job.save();
    return;
  }

  async deleteJob(id, hostId) {
    const job = await jobModel.findOneAndDelete({ _id: id, host: hostId });
    if (job) {
      return job;
    } else {
      throw new Error("You are not authorized to update this job or job not found");
    }
  }

  async updateJob(id, updatedJob, hostId) {
    let job = await jobModel.findOne({ _id: id, host: hostId });
    if (job) {
      Object.assign(job, {
        company: updatedJob.company,
        role: updatedJob.role,
        location: updatedJob.location,
        salary: updatedJob.salary,
        deadline: updatedJob.deadline,
        openings: updatedJob.openings,
        skills: updatedJob.skills.split(","),
      });
      await job.save();
      return job;
    } else {
      throw new Error("You are not authorized to update this job or job not found");
    }
  }

  async getJobsByCompany(company) {
    const matchedJobs = await jobModel.find({ company: { $regex: new RegExp(company, 'i') } });
    return matchedJobs;
  }

  //Applicant Operation
  async addApplicant(id, { name, email, contact, resumeURL }) {
    const resumePath = "/resumes/" + resumeURL;
    const newapplicant = new applicantModel({
      name: name,
      email: email,
      contact: contact,
      resume: resumePath,
    });
    const job = await jobModel.findById(id);
    job.applicants.push(newapplicant._id);
    await job.save();
    await newapplicant.save();
    return true;
  }
  async getApplicants(id) {
    const job = await jobModel.findById(id).populate("applicants");
    return job.applicants;
  }
}
