import express from 'express';
import jwtMiddleware from './middleware/jwt.middleware';
import validationMiddleware from './middleware/validation.middleware';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const router = express.Router();

router.use(jwtMiddleware);

router.route('/:username')

    .get(userCtrl.get)

    .put((req, res, next) => {
        if (req.params.username == req.decodedToken.claims.username) return next();
        else return next(new APIError("Not allowed", httpStatus.UNAUTHORIZED));
    }, userCtrl.update);

router.param('username', userCtrl.load);

export default router;