import jwt from 'jsonwebtoken';
import { env } from '../../config/globals.js';

function verifyToken(req, res, next) {
    const token = req.header('auth-token')
    if(!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, env.LOGIN_TOKEN);
        req.user = verified
        next()
    } catch(error) {
        res.status(400).send("Invalid token");
    }
}

export default verifyToken
