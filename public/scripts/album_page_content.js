function handleAlbumCardClick(artistId, albumId){
    fetch(`${serverBaseURL}/artist/${artistId}/album/${albumId}`)
    .then(response => {
        return response.text();
    })
    .then(body => {
        document.querySelector('link[href="/styles/artista_albuns.css"]').href = '/styles/artista_album.css'
        updatePageContent(body)
    })
    .catch(error => {
        console.log(`An error has occurred: ${error}`);
    });
}   

function handleAddSongButtonClick(artistId, albumId){
    fetch(`${serverBaseURL}/artist/${artistId}/album/${albumId}/addSong`)
    .then(response => {
        return response.text();
    })
    .then(body =>{
        document.querySelector('link[href="/styles/artista_album.css"]').href = '/styles/artista_add.css'
        updatePageContent(body);   
    })
    .catch(error => {
        console.log(`An error has occurred: ${error}`);
    });
}

function updatePageContent(htmlContent) {
    document.querySelector('main').innerHTML = htmlContent;
}
