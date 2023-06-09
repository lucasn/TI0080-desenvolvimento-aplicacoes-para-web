import { apiBaseURL } from "../configs/server.js";

export default async function authenticationMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        next();
        return;
    }

    const response = await fetch(`${apiBaseURL}/token/validate`, {
        method: 'post',
        body: JSON.stringify({token}),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.status === 401) {
        res.cookie('token', null);
        next();
    } else {
        const credentials = await response.json();

        if (credentials.type === 'user' && req.originalUrl.includes('artist')){
            res.render('unauthorized');
            return;
        }

        req.credentials = credentials;
        req.token = token;
        next();
    }
}