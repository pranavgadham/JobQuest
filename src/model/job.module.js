const jobs = [
    {id:1,companey:"xyz",role:"SDE",location:"Gurgaon HR IND Remote",package:"14-20lpa",deadline:"30 Aug 2023",openings:5,applicants:[],skills:["Nodejs","Express","Reactjs"]},
    {id:2,companey:"lmn",role:"Angular Developer",location:"Gurgaon HR IND Remote",package:"20-27lpa",deadline:"30 Aug 2023",openings:5,applicants:[],skills:["Nodejs","Express","Reactjs"]},
]

export const getAllJobs = ()=>{
    return jobs;
}

export const getJobById = (id) =>{
    const job = jobs.find(j => j.id == Number(id));
    return job;
}

export const addApplicant = (id, { name, email, contact, resumeURL }) => {
    const resumePath = '/resumes/' + resumeURL;
  
    const applicant = {
      id: Date.now(),
      name: name,
      email: email,
      contact: contact,
      resume: resumePath
    };
    console.log(applicant);
    const job = getJobById(id);
    job.applicants.push(applicant);
  
    return true;
  };
  