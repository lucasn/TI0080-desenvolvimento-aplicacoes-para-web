import authService from "../services/auth_service.js";

export default async function authenticate(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        res.status(401).end();
        return;
    }
    const splittedHeader = authorizationHeader.split(' ');
    if (splittedHeader.length < 2) {
        res.status(401).end();
        return;
    }
    const token = splittedHeader[1];
    const tokenData = authService.validateToken(token);

    if (!tokenData) {
        res.status(401).end();
        return;
    }

    req.credentials = tokenData;

    next();
}