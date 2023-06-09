import prisma from "../configs/database.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { NotFoundError, InternalServerError } from "../errors/errors.js";

async function createSong(song) {
    const songCreated = await prisma.song.create({
        data: song
    });

    return songCreated;
}

async function deleteSong(songId){
    try {
        const songDeleted = await prisma.song.delete({
            where: {
                id: songId
            }
        });
    
        return songDeleted;
    } 
    catch (err) {
        if(err instanceof PrismaClientKnownRequestError && err.code === 'P2025')
            throw new NotFoundError(`Song with id ${songId} not found`);
        else
            throw new InternalServerError();
    }
}

async function getSong(songId){
    try{
        const song = await prisma.song.findUniqueOrThrow({
            where: {
                id: songId
            },
            select: {
                title: true,
                id: true,
                plays: true,
                album: {
                    select: {
                        name: true,
                        cover: true,
                        artist: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return song;
    }
    catch (err) {
        throw {
            status: 404,
            message: `Song with id ${songId} not found`
        };
    }
}

async function getAllSongs(filters, top, orderByPlays){
    //TODO: separar funções de pegar músicas e pegar as mais ouvidas
    const songs = await prisma.song.findMany({
        where: {...filters},
        select: {
            title: true,
            id: true,
            plays: true,
            album: {
                select: {
                    name: true,
                    cover: true,
                    artist: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        },
        orderBy: {
            plays: orderByPlays
        },
        take: top
    })

    return songs;
}

async function getSongAudio(songId) {
    try{
        const songFile = await prisma.song.findUniqueOrThrow({
            where: {
                id: songId
            },
            select: {
                audioFile: true
            }
        });
    
        return songFile;
    }
    catch(err){
        throw {
            status: 404,
            message: `Song with id ${songId} not found`
        };
    }
}

async function searchSongs(songNameContains){
    const songs = await prisma.song.findMany({
        where: {
            title: {
                contains: songNameContains
            }
        },
        select: {
            id: true,
            title: true,
            album: {
                select: {
                    id: true,
                    name: true,
                    artist: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    });

    return songs;
}

const songService = {
    createSong,
    deleteSong,
    getSong,
    getAllSongs,
    getSongAudio, 
    searchSongs
};
export default songService;