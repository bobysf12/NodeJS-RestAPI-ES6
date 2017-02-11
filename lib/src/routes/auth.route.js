import express from 'express';
import authCtrl from '../controllers/auth.controller';
import jwtMiddleware from './middleware/jwt.middleware';
import validationMiddleware from './middleware/validation.middleware';
import paramValidation from '../../config/param-validation';

const router = express.Router();

router.route('/login')
    .post(validationMiddleware(paramValidation.login), authCtrl.login);

router.route('/register')
    .post(validationMiddleware(paramValidation.register), authCtrl.register);

export default router;