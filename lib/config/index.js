import fs from 'fs';

const devConfig = {
    env: 'development',
    MONGOOSE_DEBUG: true,
    // jwtSecret: 'exampleKey',
    jwt: {
        secret: {
            privateKey: fs.readFileSync('private.pem'),
            publicKey: fs.readFileSync('public.pem'),
            // key: 'exampleKey'
        },
        algorithm : 'RS256'
    },
    db: 'mongodb://127.0.0.1/sparenadb',
    port: 4040
};

export default devConfig;