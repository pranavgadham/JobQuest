import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import resumeUpload from './middlewar/fileUploadMiddleware.js'
import expressEjsLayouts from "express-ejs-layouts";
import {job,recruiter,application} from "./src/controller/controller.js";

// Express App Configuration
const app = express();

// Serve static files from the 'public' directory (ensure this comes before the dynamic routes)
app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(cookieParser());
dotenv.config();

// Session configuration
app.use(
  session({
    secret: process.env.secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 3600 * 1000,
    },
  })
);

//Controller class objects
const jobsController = new job();
const recruiterController = new recruiter();
const applicationController = new application();

//Application routes
app.post("/apply/:id", resumeUpload.single("resume"), applicationController.applyHandler);
app.get("/applicants/:id", applicationController.applicantsHandler);

//Recruiter routes
app.post("/register", recruiterController.registerController);
app.get("/login", recruiterController.loginPageController);
app.post("/login", recruiterController.loginController);
app.get("/logout", recruiterController.logOut);


//Job routes
app.get("/", jobsController.homeController);
app.get("/jobs", jobsController.jobController);
app.get("/job/:id", jobsController.jobDetailController);
app.get('/postjob',jobsController.getFormController);
app.post('/postjob',jobsController.jobPostController)
app.get('/job/:id/delete',jobsController.jobDeleteController);
app.get('/job/:id/update',jobsController.getJobUpdateController);
app.post('/job/:id/update',jobsController.jobUpdateController);
app.get('/search',jobsController.jobSearchController)

export default app;