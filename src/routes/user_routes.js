import { app } from '../configs/server.js';
import { 
    getHomePage, 
    getPlaylistById, 
    getHomeContent, 
    getIndexPage, 
    getSigninPage, 
    getLoginPage, 
    createUser, 
    performLogin,
    createPlaylist,
    getMusic
} from '../controllers/user_controller.js';

export default function configureUserRoutes() {
    app.get('/', getIndexPage);
    app.get('/signin', getSigninPage);
    app.get('/login', getLoginPage);
    app.post('/login', performLogin);
    app.get('/user/:user_id', getHomePage);
    app.post('/user/:user_id/playlists', createPlaylist);
    app.get('/playlists/:playlist_id', getPlaylistById);
    app.get('/home-content', getHomeContent);
    app.post('/user', createUser);
    app.get('/music', getMusic);
}
    