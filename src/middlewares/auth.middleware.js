export const auth = (req, res, next) => {

    try {
        if(req.session.userEmail) {
            next();
        } else {
            res.redirect('/login');
        }
    } catch(error) {
        // Handle unexpected errors
        console.error('Authentication error:', error);
        res.redirect('/login');
    }
    
}