export default class UserModel {

    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static add(name, email, password) {
        const newUser = new UserModel(
            users.length + 1, 
            name, 
            email, 
            password
        );
        users.push(newUser)
    }

    static alreadyExists(email) {
        return users.find((u) => u.email === email);
    }

    static isValidUser(email, password) {
        return users.find((u) => u.email == email && u.password == password)
    }
}

var users = [
    { id: 1, name: 'ninja', email: 'ninja@gmail.com', password: 'n' },
    { id: 2, name: 'rahul', email: 'rahul@gmail.com', password: 'r'}
]