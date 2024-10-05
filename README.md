
# JobQuest

JobQuest is a web application where recruiters can post jobs, and applicants can apply for job listings. It includes features like job management, applicant tracking, and more.

## Live Demo
[Live JobQuest Application](#)  
*(Update the link above with your live application URL)*

## Features

- Recruiters can post jobs with relevant details.
- Applicants can view jobs and apply with their resumes.
- Secure user authentication with encrypted passwords.
- Session management and error handling.
- Job and applicant data stored in MongoDB.


## Prerequisites

Before setting up the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v16.x or higher recommended)
- [MongoDB](https://www.mongodb.com/)


## Setup Procedure

Follow these steps to set up the JobQuest project on your local machine:

### 1. Clone the Repository
git clone https://github.com/your-username/JobQuest.git

cd JobQuest

### 2. Install Dependencies
Install the required packages using npm:

npm install

### 3. Set Up Environment Variables
Create a .env file in the root directory with the following values:

.env file

Secret Key for Sessions

secretKey=your_64bit_hex_secret_key

mongoConnection=your_mongo_connection_url

secretKey: A 64-bit hexadecimal secret key for securing sessions.

mongoConnection: Your MongoDB connection string, including your database name.

### 5. Run the Application
To start the application in development mode:

npm run dev

The application will be available at http://localhost:3000.

### Technologies Used

- Frontend: EJS Templates, HTML, CSS
- Backend: Node.js, Express.js
- Database: MongoDB

Authentication: bcrypt for password hashing, express-session for session management
