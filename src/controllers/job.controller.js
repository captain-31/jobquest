import JobModel from "../models/job.model.js";
import moment from "moment";

import dotenv from 'dotenv';
dotenv.config();

export default class JobController {

    getNewJob(req, res) {
        
        const jobData = {
            companyName: '',
            location: '',
            salary: '',
            totalPositions: '',
            applyby: '',
            category: '',
            designation: '',
            skills: [],
        }
        res.render('new-job', { 
            error: null,
            success: false,
            userId: req.session.userId, 
            userEmail: req.session.userEmail,
            jobData: jobData
        });
    }

    postNewJob(req, res) {
        
        const { userId, companyName, location, salary, totalPositions, category, designation, skills, applyby } = req.body;
        const timeStamp = moment().format('DD MMM YYYY hh:mm A');

        JobModel.add(designation, location, category, companyName, salary, totalPositions, skills, applyby, userId, timeStamp);

        const jobData = {
            companyName: '',
            location: '',
            salary: '',
            totalPositions: '',
            applyby: '',
            category: '',
            designation: '',
            skills: [],
        }

        res.render('new-job', { 
            success: true, 
            message: 'Job created successfully!',
            userId: req.session.userId,
            userEmail: req.session.userEmail,
            error: null, 
            jobData: jobData
        });

    }

    getAllJobsForApplicants(req, res) {
        const jobs = JobModel.get();
        res.render('all-jobs-for-applicants', { jobs: jobs });
    }

    getJobs(req, res) {
        const jobs = JobModel.getJobsByUserId(req.session.userId);
        res.render('all-jobs', {
            userEmail: req.session.userEmail,
            userId: req.session.userId, 
            jobs: jobs
        });
    }

    getJobById(req, res) {

        const id = req.params.id;
        const jobFound = JobModel.getJobById(id);
        
        if(jobFound) {
            res.render('job-details', {
                jobData: jobFound,
                error: null,
                userEmail: req.session.userEmail,
                applicationSubmitted: false,
                formatDate: function (inputDate) {
                    const date = new Date(inputDate);
                    const options = { day: 'numeric', month: 'short', year: 'numeric' };
                    return date.toLocaleDateString('en-GB', options);
                }
            })
        } else {
            res.status(401).render('404', { type: 'Job'});
        }
    }

    deleteJob(req, res) {
        const id = req.params.id;
        const jobFound = JobModel.getJobById(id);

        if(!jobFound) {
            return res.status(401).render('404', { type: 'Job'});
        }
        JobModel.delete(id);
        const jobs = JobModel.getJobsByUserId(req.session.userId);
        res.render('all-jobs', {
            userEmail: req.session.userEmail,
            userId: req.session.userId, 
            jobs: jobs
        });
    }

    getUpdateJobView(req, res) {
        
        const id = req.params.id;
        const jobFound = JobModel.getJobById(id);

        if(jobFound) {
            res.render('update-job', {
                jobData: jobFound, 
                error: null,
                success: false,
                userEmail: req.session.userEmail,
                userId: req.session.userId
            });
        } else {
            res.status(401).render('404', { type: 'Job'});
        }
    }

    postUpdateJob(req, res) {

        req.body.timeStamp = moment().format('DD MMM YYYY hh:mm A');
        JobModel.update(req.body);
        
        const jobs = JobModel.getJobsByUserId(req.body.userId)
        res.render('all-jobs', {
            userEmail: req.session.userEmail,
            userId: req.session.userId, 
            jobs: jobs
        });
    }

    getJobApplications(req, res) {
        const id = req.params.id;
        const jobApplications = JobModel.getJobApplicationsById(id);
        return res.render('view-applications', { 
            applications: jobApplications,
            userEmail: req.session.userEmail,
            userId: req.session.userId,  
        });
    }

    searchJobs(req, res) {
        const searchResults = JobModel.getJobsBySearch(req.body.search);
        res.render('all-jobs-for-applicants', { jobs: searchResults });
        return;
    }

    async postApplyJob(req, res, next) {

        try {
            const { jobId, name, email, contact } = req.body;
            const resumeUrl = "resumes/" + req.file.filename;
            const timeStamp = moment().format('DD MMM YYYY hh:mm A');

            JobModel.saveApplication(jobId, name, email, contact, resumeUrl, timeStamp);

            const jobData = JobModel.getJobById(jobId);

            // Store jobData in res.locals for later use
            res.locals.jobData = jobData;

            // Pass user name, job designation, company name to send mail middleware through locals
            res.locals._companyName = jobData.companyName;
            res.locals._designation = jobData.designation;
            res.locals._name = name;
            res.locals._email = email;

            next();

        } catch (error) {
            console.error('Error saving application:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}