import httpStatus from 'http-status';

const validationMiddleware = (schema) => {
    return (req, res, next) => {
        req.checkBody(schema);

        let errors = req.validationErrors();
        if (errors) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errors);
        }
        else {
            next();
        }
    }
}

export default validationMiddleware;