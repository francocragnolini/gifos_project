const requestTrending = async (apiKey, limit)=> {
    try {
        const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`;
        const res = await fetch(url);
        const data = await res.json();
        return data
    } catch (error) {
        console.log('error', error);
    }
}

const agregarTrendingsFavoritos = (e)=> {
    const buttonPressed = e.target;
    const idGifoSelected =  buttonPressed.getAttribute('data-id');
    const localTrendings = JSON.parse(localStorage.getItem('trendings'));
    const gifoJson = localTrendings.trendings.find(gifo => gifo.id === idGifoSelected)
    const localFavoritos = JSON.parse(localStorage.getItem('favoritos'));
    localFavoritos.favoritos.push(gifoJson);
    localStorage.setItem('favoritos', JSON.stringify(localFavoritos));
    // location.reload();
}

const renderMaxTrend = (url, title, user, id) => {
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
    divBase.querySelector('.max-btns .add-fav').addEventListener('click', agregarTrendingsFavoritos);
}

const renderTrendings = (gifo, container)=> {
    const divBase = document.createElement('div');
    divBase.classList.add('trend-card');
    divBase.innerHTML = `
    <img class="trend-img" data-url="${gifo.images.downsized.url}" data-title="${gifo.title}" data-user="${gifo.username}" src="${gifo.images.downsized.url}" alt="${gifo.title}">
    <div class="modal">
        <div class="color"></div>
        <p class="title">${gifo.title}</p>
        <p class="user">${gifo.username}</p>
        <div class="btns">
            <button class="gif-btn" >
                <img class="img-modal like" data-id=${gifo.id} src="./src/assets/icon-fav.svg" alt="add favourites">
                <img class="img-modal added-fav" src="./src/assets/icon-fav-active.svg" alt="added to favourites">
            </button>
            <button class="gif-btn">
                <img class="img-modal download" data-url="${gifo.images.downsized.url}" data-name="${gifo.title}" src="./src/assets/icon-download.svg" alt="download">
            </button>
            <button class="gif-btn">
                <img class="img-modal max-img" src="./src/assets/icon-max-normal.svg" alt="max-gif">
            </button>
        </div>
    </div>
    `
    container.appendChild(divBase);
    divBase.querySelector('.gif-btn .download').addEventListener('click', downloadTrend);
    divBase.querySelector('.gif-btn .like').addEventListener('click', agregarTrendingsFavoritos);
    divBase.querySelector('.trend-img').addEventListener('click', maxTrend);
    divBase.querySelector('.gif-btn .max-img').addEventListener('click', maxTrend);
}

const maxTrend = (e)=> {
    const elementPressed = e.target;
    const card = elementPressed.closest('.trend-card');
    const url = card.querySelector('.trend-img').getAttribute('data-url');
    const user = card.querySelector('.trend-img').getAttribute('data-user');
    const title = card.querySelector('.trend-img').getAttribute('data-title');
    const id = card.querySelector('.gif-btn .like').getAttribute('data-id');
    renderMaxTrend(url, title, user, id);
}

// la ultima cosa que hice fue hacer la funcion descargar
// me falta la funcion maxgif y la funcion guardar en favoritos
const downloadTrend = (e)=> {
    const buttonPressed = e.target;
    const url = buttonPressed.getAttribute('data-url');
    const title = buttonPressed.getAttribute('data-name');
    console.log(url);
    console.log(title);
    blobTrending(url, title);
}

const blobTrending = async (url, title) => {
    let blob = await fetch(url).then((img) => img.blob());
    const tag = document.createElement('a');
    tag.href = window.URL.createObjectURL(blob);
    tag.download = title + `.gif`;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
};

const getTrending = async ()=> {
    const API_KEY = "tbWaCMKEXqzhVP6mzZcPyUQg4xDxk774";
    const limit = 25;
    const ctn = document.querySelector('.trending-slider');
    const trendings = await requestTrending(API_KEY, limit);
    const localTrendings = JSON.parse(localStorage.getItem('trendings'));
    localTrendings.trendings = [...trendings.data];
    localStorage.setItem('trendings', JSON.stringify(localTrendings));
    trendings.data.forEach(gifo => {
        renderTrendings(gifo, ctn);
    });
}
const rightBtn = document.querySelector('.arrow .right-btn');
const leftBtn = document.querySelector('.arrow .left-btn');
const slider = document.querySelector('.trending-slider');
const moveForward = (e)=> {
    slider.scrollLeft +=1131;
};
const moveBackward = (e)=> {
    slider.scrollLeft += -1131;
}

rightBtn.addEventListener('click',moveForward);
leftBtn.addEventListener('click',moveBackward);

document.addEventListener('DOMContentLoaded', ()=> {
    getTrending()
})