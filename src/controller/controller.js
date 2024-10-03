import { getAllJobs, getJobById, addApplicant, addJob } from "../model/job.module.js";
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
      res
        .status(401)
        .render("login", {
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

export const jobDetailController = (req,res) => {
  const id = req.params.id;
  const job  = getJobById(id);
  if(job){
    res.status(200).render('jobDetail',{ login: req.session.userName, job:job });
  }
  else{
    res.status(404).render('404',{login: req.session.userName,message:"Job not found"});
  }
}

export const errorControlle = (req,res) =>{
  res.status(404).render('404',{login: req.session.userName,message:""});
} 

export const applyHandler = (req, res) => {
  const id = req.params.id;
  if (req.file && req.body) {
    const { name, email, contact } = req.body;
    const resumeURL = req.file.filename;

    addApplicant(id, { name, email, contact, resumeURL });

    res.status(200).redirect('/jobs');
  } else {
    res.status(404).render('404', { login: req.session.userName, message: "Something went wrong" });
  }
};


export const applicantsHandler = (req,res) =>{

}

export const getFormController = (req,res) => {
  if(req.session.userName){
    res.status(200).render('jobPostForm',{login: req.session.userName});
  }else{
    res.status(404).render('404',{login: req.session.userName,message:""});
  }

}

export const jobPostController = (req,res) => {
  if(req.body){
    addJob(req.body);
    res.status(200).redirect('/jobs');
  }
  else{
    res.status(404).render('404',{login: req.session.userName,message:""});
  }
}

