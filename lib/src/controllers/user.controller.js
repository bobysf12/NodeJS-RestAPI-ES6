import User from '../models/user.model';

const load = (req, res, next) => {
    User.findUserByUsername(req.params.username)
        .then((user) => {
            req.user = user;
            return next();
        })
        .catch(e => next(e));
}

const get = (req, res, next) => {
    return res.json({
        _id: req.user._id,
        username: req.user.username,
        name: req.user.name,
    });
}

const update = (req, res, next) => {
    User.findByIdAndUpdate(req.decodedToken.claims._id, {
        $set: {
            name: req.body.name
        }
    }).then((user) => {
        res.json(user);
    })
}


export default { load, get, update }