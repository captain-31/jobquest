import UserModel from "../models/user.model.js";

export default class UserController {

    getIndex(req, res) {
        res.render('index');
    }

    getRegister(req, res) {
        res.render('register', { success: false, message: null, error: null });
    }

    postRegister(req, res) {
        const { name, email, password } = req.body;
        const userAlreadyExists = UserModel.alreadyExists(email);

        if(userAlreadyExists) {
            return res.render('register', { success: false, message: null, error: 'Email already exists.' })
        }
        UserModel.add(name, email, password); 
        res.render('register', { success: true, message: 'User created successfully!', error: null })
    }

    getLogin(req, res) {
        res.render('login', { error: null });
    }

    postLogin(req, res) {
        const { email, password } = req.body;

        const user = UserModel.isValidUser(email, password);

        if(!user) {
            return res.render('login', {
                error: 'Invalid credentials',
                userEmail: req.session.userEmail
            });
        }
        req.session.userId = user.id;
        req.session.userEmail = email;

        res.redirect('/jobs');
    }

    logout(req, res) {

        req.session.destroy( (err) => {
            if(err) {
                console.log(err)
            } else {
                res.clearCookie('lastVisit');
                res.redirect('/login')
            }
        })
    }
    
}