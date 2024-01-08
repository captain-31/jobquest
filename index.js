import express from 'express'
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import UserController from './src/controllers/user.controller.js';
import JobController from './src/controllers/job.controller.js';

import { validateJobRequest, validateUserRequest} from './src/middlewares/validation.middleware.js';
import { auth } from './src/middlewares/auth.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
import sendMailMiddleware from './src/middlewares/sendMail.middleware.js';

const app = express();

app.use(cookieParser());

app.use(session({
    secret: 'secrectkey',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
}))

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'));
app.use(express.static('src/views'));

app.set('view engine', 'ejs')
app.set('views', path.join(path.resolve(), 'src', 'views') )

app.use(ejsLayouts)

const userController = new UserController();
const jobController = new JobController();

// setup routes 
app.get('/', userController.getIndex);
app.get('/all-jobs', jobController.getAllJobsForApplicants)

// user routes
app.get('/register', userController.getRegister);
app.post('/register', validateUserRequest, userController.postRegister);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);

// job routes
app.get('/postjob', auth, jobController.getNewJob);
app.post('/postjob', auth, validateJobRequest, jobController.postNewJob);
app.get('/jobs', setLastVisit, auth, jobController.getJobs);
app.get('/job/:id', jobController.getJobById);
app.delete('/delete-job/:id', auth, jobController.deleteJob);
app.get('/job/update/:id', auth, jobController.getUpdateJobView);
app.post('/job/update/:id', auth, validateJobRequest, jobController.postUpdateJob)
app.post(
    '/applyjob',
    uploadFile.single('resume'),
    jobController.postApplyJob, 
    sendMailMiddleware
);
app.get('/job/:id/applications', auth, jobController.getJobApplications);
app.post('/search', jobController.searchJobs);

// 404 route
app.use((req, res) => {
    res.status(404).render('404', { type: 'Page'});
});

export default app;