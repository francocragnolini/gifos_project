const burgerIcon = document.querySelector('.navbar .burger');

const burgerMenu = () => {
    const footer = document.querySelector('.footer');
    const menu = document.querySelector('.navbar .menu');
    const trending = document.querySelector('.trending-section');
    const favSection = document.querySelector('.favourites-sec');
    const gifosSection = document.querySelector('.mygifos-sec')
    burgerIcon.classList.toggle('burger-active');
    menu.classList.toggle('display-menu');
    footer.classList.toggle('hide-footer');
    trending.classList.toggle('hide-trending');
    if(favSection) favSection.classList.toggle('hide-section');
    if (gifosSection) gifosSection.classList.toggle('hide-my-gifs');
    if( document.title === "proyecto gifos") {
        closeSearchSec();
    }
}
burgerIcon.addEventListener('click', burgerMenu);

const closeSearchSec = () => {
    const len = document.querySelector("#mf-glass");
    const cross = document.querySelector("#search-cross");
    const searchResults = document.querySelector(".search-section");
    const gallery = document.querySelector(".search-gallery");
    const searchInput = document.querySelector("#search-input");
    if (document.title === "proyecto gifos") {
        gallery.innerHTML = "";
        len.style.display = "block";
        cross.style.display = "none";
        searchResults.style.display = "none";
        searchInput.value = "";
    }
}
