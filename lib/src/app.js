import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import apiRoutes from './routes';
import httpStatus from 'http-status';
import config from '../config';
import expressValidator from 'express-validator';
import APIError from './helpers/APIError';

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator())

app.use(cookieParser());
app.use(helmet());
app.use(cors());

//public folder dir
app.use(express.static(path.join(__dirname, '../public')));


/**
 * Get api routes in routes directory
 */
app.use('/api/v1', apiRoutes);

/**
 * 404 error handler
 */
app.use((req, res, next) => {
    const err = new APIError("API not found", httpStatus.NOT_FOUND);
    
    return next(err);
});

/**
 * Flush all error
 */
app.use((err, req, res, next) => {
    res.status(err.status)
        .json({
            message : err.isPublic ? err.message : httpStatus[err.status],
            statusCode: err.status
        });
});

export default app;