const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: maxAge,
    });
};

const handleError = (err) => {
    const errors = {name: '', email: '', password: '' };

    if (err === 'Incorrect Name')
        errors.name = 'Name should be valid';

    if (err.message === 'Incorrect Email')
        errors.email = "This email is not registered";
    
    if (err.message === 'Incorrect Password')
        errors.password = 'This password is incorrect';
    
    if (err.code === 11000) errors.email = "Email already registered";

    return errors;
}

module.exports = {
    postRegister: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (name === '') throw 'Incorrect Name';
            const user = await userModel.create({ name, email, password });
            const token = createToken(user._id);

            res.cookie("jwtUser", token, {
              withCredentials: true,
              httpOnly: false,
              maxAge: maxAge * 1000,
            });
            res.status(201).json({ user: user._id, created: true });
        } catch (error) {
            console.error(error);
            const errors = handleError(error);
            res.status(401).json({ errors, created: false });
        }
        
    },
    postLogin: async(req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.login(email, password);

            const token = createToken(user._id);

            res.cookie('jwtUser', token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000,
            });

            res.status(202).json({ user: user._id, created: true });

        } catch (error) {
            console.error(error);
            const errors = handleError(error);
            res.json({ errors, created: false });
        }
    },
}