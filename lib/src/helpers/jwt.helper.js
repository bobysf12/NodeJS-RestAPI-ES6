import jwt from 'jsonwebtoken';
import config from '../../config';


const generateToken = (claims) => {
    return jwt.sign({
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        sub: claims._id,
        claims: claims
    }, config.jwt.secret.privateKey, { algorithm: config.jwt.algorithm });
}

const verifyToken = (token) => {

    return jwt.verify(token, config.jwt.secret.publicKey);
}

export default { verifyToken, generateToken};