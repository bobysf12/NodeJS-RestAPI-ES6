import jwt from '../../helpers/jwt.helper';
import APIError from '../../helpers/APIError';
import httpStatus from 'http-status';

const jwtMiddleware = (req, res, next) => {
    let token = req.headers['authorization'];

    if (token) {
        token = token.substring(7);
        try {
            let decoded = jwt.verifyToken(token);
            req.decodedToken = decoded;
            return next();
        } catch (Exception) {
            return next(new APIError(Exception.message));
        }
    } else {
        return next(new APIError("No token provided", httpStatus.UNAUTHORIZED));
    }
}
export default jwtMiddleware;