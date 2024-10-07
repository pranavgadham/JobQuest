import jobQuestRepository from "../model/repository.js";

const repository = new jobQuestRepository();

export class recruiter {
  registerController = async (req, res) => {
    try {
      if (req.body) {
        const newUser = await repository.addUser(req.body);
        if (newUser) {
          res.status(200).render("login", { login: req.session.userName });
        } else {
          res
            .status(500)
            .render("404", {
              login: req.session.userName,
              message: "Something went wrong please try again",
            });
        }
      }
    } catch (error) {
      res
        .status(404)
        .render("404", { login: req.session.userName, message: error.message });
    }
  };

  loginPageController = (req, res) => {
    res.render("login", { login: req.session.userName });
  };

  loginController = async (req, res) => {
    try {
      if (req.body) {
        const user = await repository.verify(req.body);
        if (user) {
          req.session.userName = user.name;
          req.session.userId = user._id;
          res.status(200).render("home", { login: user.name });
        } else {
          res.status(401).render("login", {
            login: req.session.userName,
            error: "Invalid email or password",
          });
        }
      } else {
        res.status(400).render("login", {
          login: req.session.userName,
          error: "Email and password are required",
        });
      }
    } catch (error) {
      res.status(500).render("login", {
        login: req.session.userName,
        error: error.message,
      });
    }
  };

  logOut = (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/");
      }
    });
  };
}

export class application {
  applyHandler = async (req, res) => {
    const id = req.params.id;
    try {
      if (req.file && req.body) {
        const { name, email, contact } = req.body;
        const resumeURL = req.file.filename;

        await repository.addApplicant(id, { name, email, contact, resumeURL });

        res.status(200).redirect("/jobs");
      } else {
        res.status(404).render("404", {
          login: req.session.userName,
          message: "Something went wrong",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  applicantsHandler = async (req, res) => {
    try {
      if (req.session.userName) {
        const id = req.params.id;
        const applicants = await repository.getApplicants(id);
        if (applicants) {
          res.status(200).render("applicantsList", {
            login: req.session.userName,
            applicants: applicants,
          });
        } else {
          res.status(500).render("404", {
            login: req.session.userName,
            message: "Something went wrong",
          });
        }
      } else {
        res
          .status(404)
          .render("404", { login: req.session.userName, message: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export class job {
  homeController = (req, res) => {
    res.render("home", { login: req.session.userName });
  };

  jobController = async (req, res) => {
    try {
      const jobs = await repository.getAllJobs();
      res.render("jobs", { login: req.session.userName, jobs: jobs });
    } catch (error) {
      console.log(error);
    }
  };

  jobDetailController = async (req, res) => {
    const id = req.params.id;
    try {
      const job = await repository.getJobById(id);
      if (job) {
        res
          .status(200)
          .render("jobdetail", { login: req.session.userName, job: job });
      } else {
        res
          .status(404)
          .render("404", {
            login: req.session.userName,
            message: "Job not found",
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getFormController = (req, res) => {
    if (req.session.userName) {
      res.status(200).render("jobPostForm", { login: req.session.userName });
    } else {
      res
        .status(404)
        .render("404", { login: req.session.userName, message: "" });
    }
  };

  jobPostController = async (req, res) => {
    try {
      const id = req.session.userId;
      if (req.body) {
        await repository.addJob(id, req.body);
        res.status(200).redirect("/jobs");
      } else {
        res
          .status(404)
          .render("404", { login: req.session.userName, message: "" });
      }
    } catch (error) {
      console.log(eror);
    }
  };

  jobDeleteController = async (req, res) => {
    const id = req.params.id;
    const hostId = req.session.userId;
    try {
      await repository.deleteJob(id,hostId);
        res.status(200).redirect("/jobs");
    } catch (error) {
      res
        .status(404)
        .render("404", { login: req.session.userName, message: error.message });
    }
  };

  getJobUpdateController = async (req, res) => {
    const id = req.params.id;
    try {
      const job = await repository.getJobById(id);
      if (job) {
        res
          .status(200)
          .render("jobPostUpdateForm", {
            login: req.session.userName,
            job: job,
          });
      } else {
        res
          .status(500)
          .render("404", {
            login: req.session.userName,
            message: "Job not found",
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  jobUpdateController = async (req, res) => {
    const id = req.params.id;
    try {
      const job = await repository.updateJob(id, req.body, req.session.userId);
      if (job) {
        res.status(200).redirect("/jobs");
      } else {
        res
          .status(404)
          .render("404", { login: req.session.userName, message: "" });
      }
    } catch (error) {
      res
        .status(404)
        .render("404", { login: req.session.userName, message: error.message });
    }
  };

  jobSearchController = async (req, res) => {
    const search = req.query.search;
    try {
      const jobs = await repository.getJobsByCompany(search);
      if (jobs) {
        res.render("jobs", { login: req.session.userName, jobs: jobs });
      } else {
        res
          .status(200)
          .render("404", {
            login: req.session.userName,
            message: "No job found",
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
