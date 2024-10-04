let jobs = [
  {
    id: 1728046867821,
    company: 'XYZ',
    role: 'SDE',
    location: 'Gurgaon HR IND Remote',
    salary: '14-20lpa',
    deadline: '2023-12-04',
    openings: '5',
    applicants: [
      {
        id: 1728045707660,
        name: 'xyz',
        email: 'xyz@gmail.com',
        contact: '8908908900',
        resume: '/resumes/1728045707656-resume 1.pdf'
      }
    ],
    skills: [ 'Django', 'Flutter', 'Java', 'HTML', 'CSS' ]
  },
  {
    id: 1728046730963,
    company: 'lmn',
    role: 'Angular Developer',
    location: 'Gurgaon HR IND Remote',
    salary: '20-27lpa',
    deadline: '2024-09-25',
    openings: '10',
    applicants: [],
    skills: [ 'NodeJS', 'ReactJS', 'Express' ]
  }
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
  let job = getJobById(id);
  job.company = updatedJob.company;
  job.role = updatedJob.role;
  job.role = updatedJob.role;
  job.location = updatedJob.location;
  job.salary = updatedJob.salary;
  job.deadline = updatedJob.deadline;
  job.openings = updatedJob.openings;
  job.skills = updatedJob.skills.split(",");
  return job;
} 

export const getApplicants = (id) => {
  const job = getJobById(id);
  return job.applicants;
}

export const getJobsByCompany = (company) => {
  const matchedJobs = jobs.filter(j => j.company.toLowerCase() === company.toLowerCase());
  return matchedJobs;
}