let offsetFavoritos = 12;

// const getFavoritos = () => {
//     const localFavoritos = JSON.parse(localStorage.getItem('favoritos'));
//     const favGallery = document.querySelector('.fav-gallery');
//     favGallery.innerHTML = "";
//     const favoritos = localFavoritos.favoritos.slice(0, offsetFavoritos)
//     for (let i = 0; i < favoritos.length; i++) {
//         const favorito = favoritos[i];
//         if (favorito !== null) {
//             renderGifos(favorito, favGallery);
//         }
//     }
//     localStorage.setItem('favoritos', JSON.stringify(localFavoritos));
// }

const getFavoritos = () => {
    const localFavoritos = JSON.parse(localStorage.getItem('favoritos'));
    const favGallery = document.querySelector('.fav-gallery');
    favGallery.innerHTML = "";
    const uniqueFavs = Array.from(new Set(localFavoritos.favoritos.map(a => a.id))).map(id => {
        return localFavoritos.favoritos.find(a => a.id === id)
    });
    localFavoritos.favoritos = uniqueFavs;
    const favoritos = localFavoritos.favoritos.slice(0, offsetFavoritos)
    for (let i = 0; i < favoritos.length; i++) {
        const favorito = favoritos[i];
        if (favorito !== null) {
            renderGifos(favorito, favGallery);
        }
    }
    localStorage.setItem('favoritos', JSON.stringify(localFavoritos));
}

const moreFavoritos = () => {
    offsetFavoritos += 12;
    getFavoritos()
}

const showFavoritos = () => {
    const favoritosJson = JSON.parse(localStorage.getItem('favoritos'));
    const emptyCtn = document.querySelector('.empty-fav');
    const favCtn = document.querySelector('.fav-gifos');
    const moreFavBtn = document.querySelector('.fav-gifos > .more-btn')
    if (favoritosJson.favoritos.length !== 0) {
        if (favoritosJson.favoritos.length < 13) {
            moreFavBtn.style.display = "none";
        }
        emptyCtn.style.display = "none";
        favCtn.style.display = "flex";
        getFavoritos()
    } else {
        emptyCtn.style.display = "block";
        favCtn.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    const loadFavBtn = document.querySelector('.fav-gifos > .more-btn');
    showFavoritos();
   loadFavBtn.addEventListener('click', moreFavoritos);
})
