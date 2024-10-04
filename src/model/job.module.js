let jobs = [
  {
    id: 1,
    company: "xyz",
    role: "SDE",
    location: "Gurgaon HR IND Remote",
    salary: "14-20lpa",
    deadline: "30 Aug 2023",
    openings: 5,
    applicants: [
      {
        id: 1728045707660,
        name: 'xyz',
        email: 'xyz@gmail.com',
        contact: '8908908900',
        resume: '/resumes/1728045707656-resume 1.pdf'
      }
    ],
    skills: ["Nodejs", "Express", "Reactjs"],
  },
  {
    id: 2,
    company: "lmn",
    role: "Angular Developer",
    location: "Gurgaon HR IND Remote",
    salary: "20-27lpa",
    deadline: "30 Aug 2023",
    openings: 5,
    applicants: [],
    skills: ["Nodejs", "Express", "Reactjs"],
  },
];

export const getAllJobs = () => {
  return jobs;
};

export const getJobById = (id) => {
  const job = jobs.find((j) => j.id == Number(id));
  return job;
};

export const addApplicant = (id, { name, email, contact, resumeURL }) => {
  const resumePath = "/resumes/" + resumeURL;

  const applicant = {
    id: Date.now(),
    name: name,
    email: email,
    contact: contact,
    resume: resumePath,
  };
  console.log(applicant);
  const job = getJobById(id);
  job.applicants.push(applicant);

  return true;
};

export const addJob = ({company,role,location,salary,deadline,openings,skills}) => {
  const skill = skills.split(",");
  const job = {
    id:Date.now(),
    company: company,
    role: role,
    location: location,
    salary: salary,
    deadline: deadline,
    openings: openings,
    applicants: [],
    skills: skill,
  };
  jobs.push(job);
  return;
};

export const deleteJob = (id) => {
  if(id){
    const job = getJobById(id);
    jobs = jobs.filter(j=> j.id != id);
    return job;
  }
  else{
    throw new Error("Job not Found");
  }
}

export const updateJob = (id,updatedJob) => {
  const job = getJobById(id);

} 