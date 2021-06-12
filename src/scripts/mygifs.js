let offsetMisGifos =  12;

const getMisGifos = () => {
    const localMisGifos = JSON.parse(localStorage.getItem('misGifos'));
    const gallery = document.querySelector('.mygifos-result .mygifos-gallery');
    gallery.innerHTML = "";
    const misGifos = localMisGifos.slice(0, offsetMisGifos)
    for (let i = 0; i < misGifos.length; i++) {
        const gifo = misGifos[i];
        if (gifo !== null) {
            renderGifos(gifo, gallery);
        }
    }
    localStorage.setItem('misGifos', JSON.stringify(localMisGifos));
}

const moreGifos = ()=> {
    offsetMisGifos += 12;
    getMisGifos();
}

const showMyGifs = () => {
    const localmisGifos = JSON.parse(localStorage.getItem('misGifos'));
    const emptyGifos = document.querySelector('.empty-mygifos');
    const myGifsCtn = document.querySelector('.mygifos-result');
    const moreBtn = document.querySelector('.mygifos-result .more-btn');
    if (localmisGifos.length !== 0) {
        if (localmisGifos.length < 13) {
            moreBtn.style.display = "none";
        }
        emptyGifos.style.display = "none";
        myGifsCtn.style.display = "flex";
        getMisGifos()
    } else {
        emptyGifos.style.display = "block";
        myGifsCtn.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    const moreBtn = document.querySelector('.mygifos-result .more-btn');
    showMyGifs()
    moreBtn.addEventListener('click', moreGifos);
})
