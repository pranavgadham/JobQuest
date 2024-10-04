import {
  getAllJobs,
  getJobById,
  addApplicant,
  addJob,
  deleteJob,
  updateJob,
  getApplicants,
  getJobsByCompany
} from "../model/job.module.js";
import { addUser, verify } from "../model/user.module.js";

export const homeController = (req, res) => {
  res.render("home", { login: req.session.userName });
};

export const jobController = (req, res) => {
  const jobs = getAllJobs();
  res.render("jobs", { login: req.session.userName, jobs: jobs });
};

export const registerController = (req, res) => {
  if (req.body) {
    addUser(req.body);
    res.status(200).render("login", { login: req.session.userName });
  }
};

export const loginPageController = (req, res) => {
  res.render("login", { login: req.session.userName });
};

export const loginController = (req, res) => {
  if (req.body) {
    const user = verify(req.body);
    if (user) {
      req.session.userName = user.name;
      res.status(201).render("home", { login: user.name });
    } else {
      res.status(401).render("login", {
        login: req.session.userName,
        error: "Invalid email or password",
      });
    }
  }
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
};

export const jobDetailController = (req, res) => {
  const id = req.params.id;
  const job = getJobById(id);
  if (job) {
    res
      .status(200)
      .render("jobDetail", { login: req.session.userName, job: job });
  } else {
    res
      .status(404)
      .render("404", { login: req.session.userName, message: "Job not found" });
  }
};


export const applyHandler = (req, res) => {
  const id = req.params.id;
  if (req.file && req.body) {
    const { name, email, contact } = req.body;
    const resumeURL = req.file.filename;

    addApplicant(id, { name, email, contact, resumeURL });

    res.status(200).redirect("/jobs");
  } else {
    res
      .status(404)
      .render("404", {
        login: req.session.userName,
        message: "Something went wrong",
      });
  }
};

export const applicantsHandler = (req, res) => {
  if (req.session.userName) {
    const id = req.params.id;
    const applicants = getApplicants(id);
    if (applicants) {
      res
        .status(200)
        .render("applicantsList", {
          login: req.session.userName,
          applicants: applicants,
        });
    } else {
      res
        .status(500)
        .render("404", {
          login: req.session.userName,
          message: "Something went wrong",
        });
    }
  }else{
    res.status(404).render("404", { login: req.session.userName, message: "" });
  }
};

export const getFormController = (req, res) => {
  if (req.session.userName) {
    res.status(200).render("jobPostForm", { login: req.session.userName });
  } else {
    res.status(404).render("404", { login: req.session.userName, message: "" });
  }
};

export const jobPostController = (req, res) => {
  if (req.body) {
    addJob(req.body);
    res.status(200).redirect("/jobs");
  } else {
    res.status(404).render("404", { login: req.session.userName, message: "" });
  }
};

export const jobDeleteController = (req, res) => {
  const id = req.params.id;
  const deletedJob = deleteJob(id);
  if (deleteJob) {
    res.status(200).redirect("/jobs");
  } else {
    res
      .status(500)
      .render("404", { login: req.session.userName, message: "Job not found" });
  }
};

export const getJobUpdateController = (req, res) => {
  const id = req.params.id;
  const job = getJobById(id);
  if (job) {
    res
      .status(200)
      .render("jobPostUpdateForm", { login: req.session.userName, job: job });
  } else {
    res
      .status(500)
      .render("404", { login: req.session.userName, message: "Job not found" });
  }
};

export const jobUpdateController = (req, res) => {
  const id = req.params.id;
  const job = updateJob(id, req.body);
  if (job) {
    res.status(200).redirect("/jobs");
  } else {
    res.status(404).render("404", { login: req.session.userName, message: "" });
  }
};

export const jobSearchController = (req,res) => {
  const search = req.query.search;
  const jobs = getJobsByCompany(search);
  if(jobs){
    res.render("jobs", { login: req.session.userName, jobs: jobs });
  }else{
    res.status(200).render("404", { login: req.session.userName, message: "No job found" });
  }
}