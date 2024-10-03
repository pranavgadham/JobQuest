import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import resumeUpload from './middlewar/fileUploadMiddleware.js'
import expressEjsLayouts from "express-ejs-layouts";
import {
  homeController,
  jobController,
  registerController,
  loginController,
  loginPageController,
  logOut,
  jobDetailController,
  errorControlle,
  applyHandler,
  applicantsHandler,
} from "./src/controller/controller.js";

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

console.log(resumeUpload);

// Routes (dynamic routes come after static files)
app.get("/", homeController);
app.get("/jobs", jobController);
app.post("/register", registerController);
app.get("/login", loginPageController);
app.post("/login", loginController);
app.get("/logout", logOut);
app.get("/job/:id", jobDetailController);
app.get("/404", errorControlle);
app.post("/apply/:id", resumeUpload.single("resumeURL"), applyHandler);
app.get("/applicants", applicantsHandler);

export default app;
