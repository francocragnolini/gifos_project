const API_KEY = "tbWaCMKEXqzhVP6mzZcPyUQg4xDxk774";
let offset = 0;

// AUTOCOMPLETE ENDPOINT
// makes a request to the autocomplete Endpoint from ghipy
const requestSuggestionsList = async (apiKey, query, limit) => {
    try {
        const url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${query}&limit=${limit}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// get the Suggestions from Autocomplete Endpoint
const getSuggestions = async (e)=> {
    const suggestionCtn = document.querySelector('.suggestion-ctn');
    suggestionCtn.innerHTML = "";
    const inputValue = e.target.value;
    const limit = 4;
    if (inputValue.length >= 3) {
        const suggestions = await requestSuggestionsList(API_KEY, inputValue, limit);
        suggestions.data.forEach(sugerencia => renderSuggestions(sugerencia, suggestionCtn))
    }
    if (inputValue.length <= 0) {
        closeSearch();
    }
    if (e.key === "Enter" || e.keyCode === 13) {
        getSearchGifos();
    }
}

// render the suggestion from Autocomplete Endpoint
const renderSuggestions = (sugerencia, container) => {
    const ul = document.createElement('ul');
    ul.classList.add('suggestions-list');
    ul.innerHTML = ` <li class="search-link">
    <img class="mini-loop" src="./src/assets/icon-search-gray.svg" alt="">${sugerencia.name}</li>
    `;
    container.appendChild(ul);
    ul.querySelector('.suggestion-ctn .suggestions-list .search-link').addEventListener('click', searchLiContent)
}

const searchLiContent = (e)=> {
    const searchInput = document.querySelector("#search-input");
    searchInput.value = e.target.textContent;
    getSearchGifos()
}

// SEARCH ENDPOINT
// makes a request to get the api´s data
const requestSearchEndpoint = async (apiKey, query,offset) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const getSearchGifos = async (e) => {
    const searchInput = document.querySelector("#search-input");
    const searchGallery = document.querySelector(" .search-section .search-gallery");
    const moreBtn = document.querySelector(" .search-section .more-btn");
    const inputvalue = searchInput.value;
    const emptyResults = document.querySelector('.search-section .empty-search');
    const searchSection = document.querySelector('.search-section');
    const titleSearch = document.querySelector(".search-section .title-search");
    const listCtn = document.querySelector(".search-ctn .suggestion-ctn");
    listCtn.innerHTML = "";
    const searchedGifos = await requestSearchEndpoint(API_KEY, inputvalue, offset);
    // localStorage 
    const localGifos = JSON.parse(localStorage.getItem('gifos'));
    localGifos.gifos = [...searchedGifos.data];
    localStorage.setItem('gifos', JSON.stringify(localGifos));
    searchGlass()
    if (searchedGifos.data.length !== 0) {
        searchSection.style.display = "flex";
        moreBtn.style.display = "unset";
        searchGallery.style.display = "grid";
        emptyResults.style.display = "none";
        titleSearch.textContent = inputvalue;
        
        for (let i = 0; i < 12; i++) {
            const gifo = searchedGifos.data[i];
            renderGifos(gifo, searchGallery);
        }

    }else {
        searchSection.style.display = "flex";
        emptyResults.style.display = "block";
        searchGallery.style.display = "none";
        moreBtn.style.display = "none";
        titleSearch.textContent = "Lorem Ipsum";
    }
}

const searchGlass = () => {
    const len = document.querySelector("#mf-glass");
    const cross = document.querySelector("#search-cross");
    len.style.display = "none";
    cross.style.display = "block";
}
const closeSearch = ()=> {
    const len = document.querySelector("#mf-glass");
    const cross = document.querySelector("#search-cross");
    const searchResults = document.querySelector(".search-section");
    const gallery = document.querySelector(".search-gallery");
    const searchInput = document.querySelector("#search-input");
    gallery.innerHTML = "";
    len.style.display = "block";
    cross.style.display = "none";
    searchResults.style.display = "none";
    searchInput.value = "";
}

// button load more Gifs
const moreGifos = () => {
    offset += 12;
    getSearchGifos()
}

// TRENDING SEARCH TERMS ENDPOINT
const requestTerms = async (apikey) => {
    try {
        const url = `https://api.giphy.com/v1/trending/searches?api_key=${apikey}`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

const getTerms = async () => {
    const termsContainer = document.querySelector('.main-section .description');
    const terms = await requestTerms(API_KEY);
    const shortTerms = [...terms.data].slice(0, 8);
    shortTerms.forEach(term => {
        renderTrendSuggestions(term, termsContainer);
    })
}

const renderTrendSuggestions = (item, container) => {
    const divBase = document.createElement('div');
    divBase.style.display = "inline-block";
    divBase.innerHTML = `<span>${item}</span>,`;
    divBase.style.cursor = "pointer";
    divBase.style.margin = "5px";
    container.appendChild(divBase);
    divBase.addEventListener('click', getGifos);
}

const getGifos = (e) => {
    const searchGallery = document.querySelector(".search-gallery");
    searchGallery.innerHTML = "";
    const searchInput = document.querySelector("#search-input");
    const termPressed = e.target;
    const text = termPressed.textContent;
    searchInput.value = text;
    getSearchGifos();
}
// 

// INICIATES LOCAL STORAGE
const inicializarFavoritos = ()=> {
    if (localStorage.getItem('favoritos')) {
        const localFavoritos = localStorage.getItem('favoritos');
    }else {
        localStorage.setItem('favoritos', JSON.stringify({favoritos:[]}))
    }
    localStorage.setItem('gifos', JSON.stringify({ gifos: [] }))
    localStorage.setItem('trendings', JSON.stringify({trendings: []}))
}

// Eventos
document.addEventListener("DOMContentLoaded", () => {
    inicializarFavoritos();
    getTerms();
    const searchBtn = document.querySelector(".search-btn #mf-glass");
    const searchInput = document.querySelector("#search-input");
    const cross = document.querySelector("#search-cross");
    const moreBtn = document.querySelector(".search-section .more-btn");
    searchBtn.addEventListener("click", getSearchGifos);
    searchInput.addEventListener("keyup", getSuggestions);
    // cross.addEventListener("click", clearSearch);
    moreBtn.addEventListener("click", moreGifos);
    const len = document.querySelector("#mf-glass");
    len.addEventListener('click', getSearchGifos);
    cross.addEventListener("click", closeSearch);
});
