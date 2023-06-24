import userService from "../services/user_service.js";

export async function createUser(req, res, next) {
    const user = req.body;
    const createdUser = await userService.createUser(user);

    res.status(201).json(createdUser);
}

export async function getAllUsers(req, res, next) {
    const filters = {
        email: req.query.email,
        name: req.query.name,
        password: req.query.password
    };
    const users = await userService.getAllUsers(filters);

    return res.json(users);
}

export async function getUser(req, res, next) {
    const userId = parseInt(req.params.userId);
    const user = await userService.getUser(userId);

    return user ? res.status(200).json(user) : res.status(404).end();
}

export async function getUserPlaylists(req, res, next) {
    const userId = parseInt(req.params.userId);

    if (userId) {
        try {
            const playlists = await userService.getUserPlaylists(userId);
            return res.status(200).json(playlists).end();

        }
        catch (err) {
            return res.status(err.status).json(err).end();
        }

    }
}