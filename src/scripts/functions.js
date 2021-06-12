const renderGifos = (gifo, container) => {
    const divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.innerHTML = `
        <img class="gif-img" src="${gifo.images.downsized.url}" data-url="${gifo.images.downsized.url}" data-user="${gifo.username}" data-title="${gifo.title}" alt="${gifo.title}">
        <div class="modal">
            <div class="color"></div>
            <p class="title">${gifo.title}</p>
            <p class="user">${gifo.username}</p>
            <div class="btns">
                <button class="gif-btn" >
                    <img class="img-modal like" data-id="${gifo.id}" src="./src/assets/icon-fav.svg" alt="add favourites">
                    <img class="img-modal added-fav" data-id="${gifo.id}" src="./src/assets/icon-fav-active.svg" alt="added to favourites">
                    <img class="img-modal trash" data-id="${gifo.id}" src="./src/assets/icon-trash-normal.svg" alt="added to favourites">
                </button>
                <button class="gif-btn">
                    <img class="img-modal download" data-url="${gifo.images.downsized.url}" data-name="${gifo.title}" src="./src/assets/icon-download.svg" alt="download">
                </button>
                <button class="gif-btn">
                    <img class="img-modal max-img" data-url="${gifo.images.downsized.url}" data-title="${gifo.title}" data-user="${gifo.username}" src="./src/assets/icon-max-normal.svg" alt="max-gif">
                </button>
            </div>
        </div>
    `
    container.appendChild(divCard);
    divCard.querySelector('.gif-btn .like').addEventListener('click', agregarFavoritosHandler);
    divCard.querySelector('.gif-btn .download').addEventListener('click', download);
    divCard.querySelector('.gif-img').addEventListener('click', maxGif);
    divCard.querySelector('.gif-btn .max-img').addEventListener('click', maxGif);
    // divCard.querySelector('.gif-btn .added-fav').addEventListener('click', removeFavorito);
    divCard.querySelector('.gif-btn .download').addEventListener('click', download);
    divCard.querySelector('.gif-btn .trash').addEventListener('click', removeMyGif);
    if (document.title === 'Favoritos') {
        divCard.querySelector('.gif-btn .added-fav').addEventListener('click', removeFavorito);
        const heart = divCard.querySelector('.gif-btn .like');
        const fullHeart = divCard.querySelector('.gif-btn .added-fav');
        heart.style.display = "none";
        fullHeart.style.display = "unset";
    }
    if (document.title === "proyecto gifos") {
        const heart = divCard.querySelector('.gif-btn .like');
        const saveGif = (e) => {
            const fullHeart = divCard.querySelector('.gif-btn .added-fav');
            heart.style.display = "none";
            fullHeart.style.display = "unset"
        }
        heart.addEventListener('click', saveGif)
    }
    if (document.title === 'Mis Gifos') {
        const heart = divCard.querySelector('.gif-btn .like');
        const trash = divCard.querySelector('.gif-btn .trash');
        heart.style.display = "none";
        trash.style.display = "unset";
    }
}

const removeMyGif = (e)=> {
    const emptyGifos = document.querySelector('.empty-mygifos');
    const myGifsCtn = document.querySelector('.mygifos-result');
    // eliminar favorito card
    btnPressed = e.target;
    idBtn = btnPressed.getAttribute('data-id');
    btnPressed.closest('.card').remove();
    // eliminar el gifo del array favoritos
    const localMisGifos = JSON.parse(localStorage.getItem('misGifos'));
    const gifoSelected = localMisGifos.findIndex(gifo => gifo.id === idBtn);
    localMisGifos.splice(gifoSelected,1);
    if (localMisGifos.length === 0) {
        emptyGifos.style.display = "block";
        myGifsCtn.style.display = "none";
    }
    localStorage.setItem('misGifos', JSON.stringify(localMisGifos));
}

const removeFavorito = (e)=> {
    const emptyCtn = document.querySelector('.empty-fav');
    const favCtn = document.querySelector('.fav-gifos');
    // eliminar favorito card
    btnPressed = e.target;
    idBtn = btnPressed.getAttribute('data-id');
    btnPressed.closest('.card').remove();
    console.log(idBtn);
    // eliminar el gifo del array favoritos
    const localFavoritos = JSON.parse(localStorage.getItem('favoritos'));
    const gifoSelected = localFavoritos.favoritos.findIndex(favorito => favorito.id === idBtn);
    localFavoritos.favoritos.splice(gifoSelected,1);
    if (localFavoritos.favoritos.length === 0) {
        emptyCtn.style.display = "block";
        favCtn.style.display = "none";
    }
    localStorage.setItem('favoritos', JSON.stringify(localFavoritos));
}

const agregarFavoritosHandler = (e)=> {
    const buttonPressed = e.target;
    const idGifoSelected =  buttonPressed.getAttribute('data-id');
    const localFavoritos = JSON.parse(localStorage.getItem('favoritos'));
    // local Storage
    if (document.title === "Mis Gifos") {
        const myGifsArr = JSON.parse(localStorage.getItem('misGifos'));
        const myGif = myGifsArr.find(gifo => gifo.id === idGifoSelected);
        localFavoritos.favoritos.push(myGif);
    }
    if (document.title === "proyecto gifos" || document.title === "favoritos") {
        const localGifos = JSON.parse(localStorage.getItem('gifos'));
        const gifoJson = localGifos.gifos.find(gifo => gifo.id === idGifoSelected)
        localFavoritos.favoritos.push(gifoJson);
    }
    localStorage.setItem('favoritos', JSON.stringify(localFavoritos));
}

const maxGif = (e)=> {
    const elementPressed = e.target;
    const card = elementPressed.closest('.card');
    const url = card.querySelector('.gif-img').getAttribute('data-url');
    const user = card.querySelector('.gif-img').getAttribute('data-user');
    const title = card.querySelector('.gif-img').getAttribute('data-title');
    const id = card.querySelector('.gif-btn .like').getAttribute('data-id');
    renderMaxGif(url, title, user, id);
}

const renderMaxGif = (url, title, user, id) => {
    const body = document.querySelector('body');
    const overlay = document.createElement('div');
    const divBase = document.createElement('div');
    body.classList.add('body')
    overlay.classList.add('overlay');
    divBase.classList.add('max-modal');
    divBase.innerHTML = `
        <div class="close-max">&#215;</div>
        <img class="gif-img" src="${url}" alt="${title}">
        <div class="info">
            <div class="gif-info">
                <p class="user">${user}</p>
                <p class="title">${title}</p>
            </div>
            <div class="max-btns">
                <button class="btn max-fav">
                    <img class="add-fav" data-id="${id}" src="./src/assets/icon-fav-active.svg" alt="added to favourites">
                </button>
                <button class="btn max-download">
                    <img class="download" data-url="${url}" data-name="${title}"
                        src="./src/assets/icon-download.svg" alt="download">
                </button>
            </div>
        </div>
    `
    overlay.appendChild(divBase);
    body.appendChild(overlay);

    divBase.querySelector('.close-max').addEventListener('click', ()=> {
        overlay.remove();
        body.classList.remove('body');
    })
    divBase.querySelector('.max-btns .max-download .download').addEventListener('click', download);
    divBase.querySelector('.max-btns .add-fav').addEventListener('click', agregarFavoritosHandler);
}

const download = (e) => {
    const buttonPressed = e.target;
    const url = buttonPressed.getAttribute('data-url');
    const title = buttonPressed.getAttribute('data-name');
    downloadGif(url, title)
}

const downloadGif = async (url, title) => {
    let blob = await fetch(url).then((img) => img.blob());
    const tag = document.createElement('a');
    tag.href = window.URL.createObjectURL(blob);
    tag.download = title + `.gif`;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
};