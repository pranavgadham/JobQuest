import { getAllJobs,getJobById } from "../model/job.module.js";

export const homeController = (req, res) => {
    res.render('home',{login:true}); 
}

export const jobController = (req,res) =>{
    const jobs = getAllJobs();
    res.render('jobs',{login:true ,jobs:jobs});
}

export const jobDetailController = (req,res) =>{
    const id = req.params.id;
    const job = getJobById(id);
    
    if(job){
        res.render('jobDetail',{login:true ,job:job});
    }
    else{
        res.render('404',{login:false});
    }
}

export const registerController = (req,res)=>{
    
}