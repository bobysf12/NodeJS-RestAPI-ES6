import User from '../models/user.model';
import jwt from '../helpers/jwt.helper';
import passwordHash from 'password-hash';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const login = (req, res, next) => {
    let credentials = {
        username: req.body.username,
        password: req.body.password
    };

    User.findUserByUsername(credentials.username)
        .then((user) => {
            if (passwordHash.verify(credentials.password, user.password)) {
                res.json({
                    token: jwt.generateToken({
                        username: user.username,
                        name: user.name,
                        _id: user._id
                    })
                });
            }
            else {
                next(new APIError('Invalid credentials', httpStatus.INTERNAL_SERVER_ERROR));
            }
        })
        .catch(e => next(e));
}

const register = (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: passwordHash.generate(req.body.password)
    });

    newUser.save()
        .then(savedUser => {
            res.json({
                token: jwt.generateToken({
                    username: savedUser.username,
                    name: savedUser.name,
                    _id: savedUser._id
                })
            });
        })
        .catch(e => next(e));
}

export default { login, register };