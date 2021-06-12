const body = document.querySelector('body');
const btnSwitch = document.querySelector('.navbar .menu .dark-btn');
const logo = document.querySelector('.navbar .logo');
const glass = document.querySelector('.search-ctn #mf-glass');
const createGifBtn = document.querySelector('.menu .link .create-gif');
const createGifBtnHov = document.querySelector('.menu .link .create-hover');
const cameraImg = document.querySelector('.create-gif-sec #camera-img');
const cameraLight = document.querySelector('.create-gif-sec #light-img');
const movieImg =  document.querySelector('.create-gif-sec #movie-img');

const switchMode = ()=> {
    body.classList.toggle('dark');
    // guardamos el modo en el local storage
    if (body.classList.contains('dark')) {
        localStorage.setItem('dark-mode', 'true');
        btnSwitch.textContent = "Modo Diurno";
        // navbar
        logo.src = "./src/assets/logo-mobile-modo-noct.svg";
        createGifBtn.src = "./src/assets/CTA-crear-gifo-modo-noc.svg";
        createGifBtnHov.src = "./src/assets/CTA-crear-gifo-hover-modo-noc.svg";
        // search input
        if(glass) glass.src = "./src/assets/icon-search-mod-noc.svg";
        // crear gifos
        if(cameraImg) cameraImg.src = "./src/assets/camara-modo-noc.svg";
        if(cameraLight) cameraLight.src = "./src/assets/element-luz-camara.svg";
        if(movieImg) movieImg.src = "./src/assets/pelicula-modo-noc.svg";

    }else {
        localStorage.setItem('dark-mode', 'false');
        btnSwitch.textContent = 'Modo Nocturno';
        // navbar
        logo.src = "./src/assets/logo-mobile.svg";
        createGifBtn.src = "./src/assets/button-crear-gifo.svg";
        createGifBtnHov.src = "./src/assets/CTA-crear-gifo-hover.svg";
        // search input
        if (glass) glass.src = "./src/assets/icon-search.svg";
        // crearGifos
        if (cameraImg) cameraImg.src = "./src/assets/camara.svg";
        if (cameraLight) cameraLight.src = "./src/assets/element-luz-camara.svg";
        if (movieImg) movieImg.src = "./src/assets/pelicula.svg";
    }
}

btnSwitch.addEventListener('click', switchMode);
// obtenemos el modo actual en cual nos econtramos
// accedemos al local Storage
const initLocalStorageMode = ()=> {
    if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark');
    btnSwitch.textContent = "Modo Diurno";
    // navbar
        logo.src = "./src/assets/logo-mobile-modo-noct.svg";
        createGifBtn.src = "./src/assets/CTA-crear-gifo-modo-noc.svg";
        createGifBtnHov.src = "./src/assets/CTA-crear-gifo-hover-modo-noc.svg";
        // search input
        if (glass) glass.src = "./src/assets/icon-search-mod-noc.svg";
        // crear Gifos
        if(cameraImg) cameraImg.src = "./src/assets/camara-modo-noc.svg";
        if (cameraLight) cameraLight.src = "./src/assets/element-luz-camara.svg";
        if(movieImg) movieImg.src = "./src/assets/pelicula-modo-noc.svg";
    }else {
        body.classList.remove('dark');
        btnSwitch.textContent = 'Modo Nocturno';
        // navbar
        logo.src = "./src/assets/logo-mobile.svg";
        createGifBtn.src = "./src/assets/button-crear-gifo.svg";
        createGifBtnHov.src = "./src/assets/CTA-crear-gifo-hover.svg";
        // search input
        if (glass) glass.src = "./src/assets/icon-search.svg";
        // crear gifos
        if (cameraImg)cameraImg.src = "./src/assets/camara.svg";
        if (cameraLight) cameraLight.src = "./src/assets/element-luz-camara.svg";
        if (movieImg) movieImg.src = "./src/assets/pelicula.svg";
    }
}
// initLocalStorageMode()
document.addEventListener('DOMContentLoaded', ()=> {
    initLocalStorageMode()
})
