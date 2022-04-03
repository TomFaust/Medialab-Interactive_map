import jwt from 'jsonwebtoken';
import { env } from '../../config/globals.js';

function verifyRole(req, res, next) {
    const path = req.route.path
    const company = req.companyId?.name || ''

    const token = req.header('auth-token')

    try {
        const verified = jwt.verify(token, env.LOGIN_TOKEN);
        const user = req.user = verified
        const role = user.role

        if(!role) return res.status(401).send("No role signed to user");

        if(role !== (company || "admin")) {
            res.status(401)
            .send(`Role '${role}', can't change data in route ${company + path}`);
        }
        next()
    } catch(error) {
        console.log(error)
        res.status(400).send( "huh");
    }
}

export default verifyRole
