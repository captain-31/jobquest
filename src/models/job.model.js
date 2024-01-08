export default class JobModel {

    constructor(id, designation, location, category, companyName, salary, totalPositions, skills, applyby, userId, timeStamp) {
        this.id = id;
        this.userId = userId;
        this.designation = designation;
        this.location = location;
        this.category = category;
        this.companyName = companyName;
        this.salary = salary;
        this.totalPositions = totalPositions;
        this.skills = skills;
        this.applyby = applyby;
        this.timeStamp = timeStamp;
        this.applications = [];
    }

    static add(designation, location, category, companyName, salary, totalPositions, skills, applyby, userId, timeStamp) {
        const newJob = new JobModel(
            jobs.length + 1, 
            designation, 
            location, 
            category,
            companyName,
            salary,
            totalPositions,
            skills,
            applyby,
            userId,
            timeStamp
        );
        jobs.push(newJob);
    }

    static getJobsByUserId(userId) {
        return jobs.filter((job) => job.userId == userId);
    }

    static getJobsBySearch(query) {
        const lowerCaseQuery = query.toLowerCase();
        return jobs.filter((job) => 
            job.companyName.toLowerCase().includes(lowerCaseQuery) ||
            job.designation.toLowerCase().includes(lowerCaseQuery)
        );
    }

    static getJobById(id) {
        return jobs.find((job) => job.id == id);
    }

    static getJobApplicationsById(id) {
        return jobs.find((job) => job.id == id).applications;
    }

    static get() {
        return jobs;
    }

    static delete(id) {
        const index = jobs.findIndex(j => j.id == id)
        jobs.splice(index, 1);
    }

    static update(jobObj) {
        jobObj.applications = JobModel.getJobApplicationsById(jobObj.id);
        const index = jobs.findIndex( (j) => j.id == jobObj.id );
        jobs[index] = jobObj;
    }

    static saveApplication(jobId, name, email, contact, resumeUrl, timeStamp) {
        
        const index = jobs.findIndex( (j) => j.id == jobId );

        const applicationObj = {
            applicationId: jobs[index].applications.length + 1, 
            name: name,
            email: email,
            contact: contact, 
            resumeUrl: resumeUrl, 
            timeStamp: timeStamp
        }

        jobs[index].applications.push(applicationObj);
    }
}

var jobs = [
    { 
        id: 1, 
        designation: 'SDE',
        location: 'Mumbai',
        category: 'Tech',
        companyName: 'Accenture',
        salary: '8 Lpa',
        totalPositions: '40',
        skills: [ 'NodeJs', 'ReactJS', 'MongoDB' ],
        applyby: '2023-12-30',
        userId: 1,
        timeStamp: "03 Jan 2024 11:24 PM",
        applications: [
            {
                applicationId: 1,
                name: 'Nikhil Shah',
                email: 'nikhil.shah12@gmail.com',
                contact: '8987766554',
                resumeUrl: 'resumes/resume-template.pdf',
                timeStamp: '02 Jan 2024 11:24 PM'
            },
            {
                applicationId: 2,
                name: 'Sourabh Patel',
                email: 'sourabh24patel@gmail.com',
                contact: '7898091324',
                resumeUrl: 'resumes/resume.pdf',
                timeStamp: '04 Jan 2024 05:26 AM'
            },
            {
                applicationId: 3,
                name: 'Tirth Desai',
                email: 'tirth.desai21@gmail.com',
                contact: '9098567508',
                resumeUrl: 'resumes/resume.pdf',
                timeStamp: '07 Jan 2024 07:26 AM'
            },
            {
                applicationId: 4,
                name: 'Ankush Roy',
                email: 'amkushroy@gmail.com',
                contact: '6765341120',
                resumeUrl: 'resumes/resume-template.pdf',
                timeStamp: '08 Jan 2024 09:26 AM'
            }
        ],
    },
    { 
        id: 2, 
        designation: 'Devops',
        location: 'Banglore',
        category: 'Tech',
        companyName: 'Cred',
        salary: '18 Lpa',
        totalPositions: '15',
        skills: [ 'DSA', 'Express', 'MongoDB' ],
        applyby: '2024-12-30',
        userId: 1,
        timeStamp: "02 Jan 2024 11:24 PM",
        applications: [
            {
                applicationId: 1,
                name: 'Alice Johnson',
                email: 'alice.johnson@example.com',
                contact: '9876543210',
                resumeUrl: 'resumes/resume-template.pdf',
                timeStamp: '03 Jan 2024 09:45 AM'
            },
            {
                applicationId: 2,
                name: 'John Smith',
                email: 'john.smith@example.com',
                contact: '8765432109',
                resumeUrl: 'resumes/resume-template.pdf',
                timeStamp: '04 Jan 2024 03:12 PM'
            },
            {
                applicationId: 3,
                name: 'Emily Davis',
                email: 'emily.davis@example.com',
                contact: '7654321098',
                resumeUrl: 'resumes/resume-template.pdf',
                timeStamp: '05 Jan 2024 07:30 AM'
            },
            {
                applicationId: 4,
                name: 'Daniel White',
                email: 'daniel.white@example.com',
                contact: '6543210987',
                resumeUrl: 'resumes/resume-template.pdf',
                timeStamp: '06 Jan 2024 02:55 PM'
            }
        ],
    },
    { 
        id: 3, 
        designation: 'Devops',
        location: 'Pube',
        category: 'Tech',
        companyName: 'Simpl',
        salary: '10 Lpa',
        totalPositions: '5',
        skills: [ 'DSA', 'MongoDB' ],
        applyby: '2024-10-30',
        userId: 2,
        timeStamp: "01 Jan 2024 11:24 PM",
        applications: [
            {
                applicationId: 1,
                name: 'Sophie Turner',
                email: 'sophie.turner@example.com',
                contact: '9870123456',
                resumeUrl: 'resumes/resume-template.pdf',
                timeStamp: '07 Jan 2024 11:55 PM'
            },
            {
                applicationId: 2,
                name: 'Michael Johnson',
                email: 'michael.johnson@example.com',
                contact: '8765432101',
                resumeUrl: 'resumes/resume-template.pdf',
                timeStamp: '08 Jan 2024 08:20 AM'
            }
        ],
    },
    { 
        id: 4, 
        designation: 'HR',
        location: 'Banglore',
        category: 'Non-Tech',
        companyName: 'Amazon Web Services',
        salary: '12 Lpa',
        totalPositions: '3',
        skills: [ 'DSA', 'SQL' ],
        applyby: '2024-02-10',
        userId: 2,
        timeStamp: "02 Jan 2024 10:24 PM",
        applications: [
            {
                applicationId: 1,
                name: 'Emma Rodriguez',
                email: 'emma.rodriguez@example.com',
                contact: '7651098765',
                resumeUrl: 'resumes/resume-template.pdf',
                timeStamp: '09 Jan 2024 04:30 PM'
            },
            {
                applicationId: 2,
                name: 'Christopher Lee',
                email: 'christopher.lee@example.com',
                contact: '6542109876',
                resumeUrl: 'resumes/resume-template.pdf',
                timeStamp: '10 Jan 2024 12:15 PM'
            }
        ],
    },
    {
        id: 5, 
        designation: 'UI/UX Designer',
        location: 'Bangalore',
        category: 'Tech',
        companyName: 'Z Design Studio',
        salary: '7 Lpa',
        totalPositions: '5',
        skills: [ 'NodeJs', 'ReactJS', 'MongoDB' ],
        applyby: '2023-11-30',
        userId: 1,
        timeStamp: '04 Jan 2024 10:45 AM',
        applications: [
            {
              applicationId: 1,
              name: 'Priya Patel',
              email: 'priya.designer@gmail.com',
              contact: '9876543210',
              resumeUrl: 'resumes/resume-template.pdf',
              timeStamp: '05 Jan 2024 02:30 PM'
            },
            {
                applicationId: 2,
                name: 'Sara Khan',
                email: 'sara.khan.design@gmail.com',
                contact: '7654321098',
                resumeUrl: 'resumes/resume-template.pdf',
                timeStamp: '07 Jan 2024 09:15 AM'
            }
        ]
    },
    {
        id: 6,
        designation: 'Tech Support',
        location: 'Pune',
        category: 'Tech',
        companyName: 'Falcon Tech',
        salary: '17 Lpa',
        totalPositions: '9',
        skills: [ 'NodeJs', 'SQL', 'MongoDB' ],
        applyby: '2023-01-30',
        userId: 1,
        timeStamp: '04 Jan 2024 10:45 AM',
        applications: [
            {
              applicationId: 1,
              name: 'Priya Patel',
              email: 'priya.designer@gmail.com',
              contact: '9876543210',
              resumeUrl: 'resumes/resume-template.pdf',
              timeStamp: '05 Jan 2024 02:30 PM'
            },
            {
                applicationId: 2,
                name: 'Sara Khan',
                email: 'sara.khan.design@gmail.com',
                contact: '7654321098',
                resumeUrl: 'resumes/resume-template.pdf',
                timeStamp: '07 Jan 2024 09:15 AM'
            }
        ]
    },
]