import { 
    getArtistById, 
    getArtistByEmail,
    getArtistTopSongs, 
    getArtistAudience, 
    getArtistAlbums, 
    createArtistInDatabase,
    createAlbumInDatabase,
    createSongInDatabase,
    getAlbumById
} from "../services/artist_service.js"
import { getFileAsByte } from '../services/image_service.js'

export function getArtistLoginPage(req, res){
    res.render('artista_login');
}

export function getArtistSigninPage(req, res){
    res.render('artista_signin');
}

export async function createArtist(req, res){
    let profilePicture;

    if(req.file){
        profilePicture = await getFileAsByte(req.file.path);
    }
    else{
        profilePicture = null;
    }

    const artist = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profilePicture: profilePicture
    }

    try {
        await createArtistInDatabase(artist);
    } catch(err) {
        console.log(err.message);
        return;
    }
    res.render('artista_signin', {artistCreated: true});
}

export async function performArtistLogin(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const artist = await getArtistByEmail(email);

    if(!artist || artist.password !== password){
        res.redirect('/artist');
        console.log('Email ou senha incorretos!')
        return;
    }

    res.cookie('artist_id', artist.id);
    res.redirect(`/artist/`);
}

export async function getArtistIndexPage(req, res){
    const artistId = parseInt(req.cookies.artist_id);
    if(artistId) {
        const artist = await getArtistById(artistId);
        
        if(artist){
            const topSongs = await getArtistTopSongs(artistId);
            res.render('artista_home', {statsPage: true, artist: artist, topSongs: topSongs, audience: getArtistAudience(artistId)})
            return;
        }
    }

    res.render('index_artista')
}

export async function getArtistHomePage(req, res) {
    const artistId = parseInt(req.params.artistId);
    const artist = await getArtistById(artistId);
    const topSongs = await getArtistTopSongs(artistId);

    res.render('artista_home', {statsPage: true, artist: artist, topSongs: topSongs, audience: getArtistAudience(artistId)});
}

export async function getArtistAddPage(req, res) {
    const artistId = parseInt(req.params.artistId);
    const artist = await getArtistById(artistId);
    res.render('artista_add', {addPage: true, artist: artist});
}

export async function getArtistAlbumsPage(req, res) {
    const artistId = parseInt(req.params.artistId);
    const artist = await getArtistById(artistId);
    const albums = await getArtistAlbums(artistId);

    res.render('artista_albuns', {albumsPage: true, artist: artist, albums: albums});
}

export async function getAddSongPage(req, res) {
    const artistId = parseInt(req.params.artistId);
    const albumId = parseInt(req.params.albumId);

    const artist = await getArtistById(artistId);

    res.render('components/add_song_form', {albumId: albumId, artist: artist})
}

export async function createSong(req, res) {
    const artistId = parseInt(req.cookies.artist_id);
    const albumId = parseInt(req.params.albumId);

    let audio;

    if(req.file) {
        audio = await getFileAsByte(req.file.path);
    } else {
        audio = null;
    }

    const song = {
        title: req.body.title,
        audioFile: audio,
        albumId: albumId
    }

    await createSongInDatabase(song);
    res.redirect(`/artist/${artistId}/albums`);
}
export async function createAlbum(req, res) {
    const artistId = parseInt(req.params.artistId);

    let cover;

    if(req.file){
        cover = await getFileAsByte(req.file.path);
    } else {
        cover = await getFileAsByte('public/images/default_cover.png');
    }

    const album = {
        name: req.body.name,
        year: parseInt(req.body.year),
        artistId: artistId, 
        cover: cover
    };
    
    await createAlbumInDatabase(album);
    res.redirect(`/artist/${artistId}/albums`);
}

export async function getAlbumPage(req, res){
    const artistId = parseInt(req.params.artistId);
    const albumId = parseInt(req.params.albumId);

    const album = await getAlbumById(albumId);

    res.render('components/artista_album_content', {artistId: artistId, album: album})
}

export async function getAlbum(req, res) {
    const albumId = parseInt(req.params.albumId);
    const album = await getAlbumById(albumId);

    res.render('components/album_content', {album: album});
}