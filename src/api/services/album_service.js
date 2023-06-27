import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import prisma from "../configs/database.js";
import { NotFoundError, InternalServerError } from "../errors/errors.js";

async function createAlbum(album){
    const createdAlbum = await prisma.album.create({
        data: {...album}
    })

    return createdAlbum;
}

async function getAlbum(albumId) {
    try{
        const album = await prisma.album.findUniqueOrThrow({
            where: {
                id: albumId
            },
            select: {
                id: true,
                name: true,
                year: true,
                cover: true,
                artistId: true
            }
        });

        return album;
    }
    catch(err){
        if(err instanceof PrismaClientKnownRequestError && err.code == 'P2025'){
            throw new NotFoundError(`Album with id ${albumId} not found`);
        }

        throw new InternalServerError();
    }
}

async function getAlbumCover(albumId) {
    try {
        const album = await prisma.album.findUniqueOrThrow({
            where: {
                id: albumId
            },
            select: {
                cover: true
            }
        });

        return album;
    }
    catch(err) {
        if(err instanceof PrismaClientKnownRequestError && err.code == 'P2025'){
            throw new NotFoundError(`Album with id ${albumId} not found`);
        }

        throw new InternalServerError();
    }
}

async function getAllAlbums(filters) {
    const albums = await prisma.album.findMany({
        where: {...filters}
    });

    return albums;
}

const albumService = {
    createAlbum,
    getAlbum, 
    getAlbumCover,
    getAllAlbums
};
export default albumService;