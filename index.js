import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import multer from 'multer';
import expressEjsLayouts from 'express-ejs-layouts';
import { homeController,jobController, jobDetailController } from './src/controller/controller.js';
// Express App Configuration
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(expressEjsLayouts);
app.set('view engine', 'ejs'); 
app.set('views', './src/views');
app.use(express.static('./public'));
app.use(cookieParser());
dotenv.config();

// Session configuration
app.use(session({
    secret: process.env.secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 24 * 3600 * 1000
    }
}));

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resumes/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

const upload = multer({ storage });

// Routes
app.get('/', homeController);
app.get('/jobs',jobController);
app.get('/job/:id',jobDetailController);

export default app;
