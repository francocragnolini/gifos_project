const startBtn = document.querySelector('.create-gif-sec #start');
const recordBtn = document.querySelector('.create-gif-sec #record');
const finishRecBtn = document.querySelector('.create-gif-sec #end');
const uploadBtn = document.querySelector('.create-gif-sec #upload');
const createDescription = document.querySelector('.create-gif-sec .create-gif-desc');
const camAccessDesc = document.querySelector('.creategif-ctn .cam-acces-desc');
const videoCtn = document.querySelector('.video-ctn');
const video = document.querySelector('video');
const stepOne = document.querySelector('.create-gif-sec .pages .step1');
const stepTwo = document.querySelector('.create-gif-sec .pages .step2');
const stepThree = document.querySelector('.create-gif-sec .pages .step3');
const cronometer = document.querySelector('.create-gif-sec .cronometer');
const repeatBtn = document.querySelector('.create-gif-sec .repeat');
const containerVideo = document.querySelector(".video-ctn");
const counter = document.querySelector('.create-gif-sec .timer');

function showPreview ({id}) {
   
   containerVideo.innerHTML= `
        <img class="create-img" data-id='${id}' src="https://i.giphy.com/${id}.gif" alt="gifo image">
        <div class="create-gif-modal">
            <div class="overlay-color"></div>
            <div class="loading-gifo">
                <img class="spiner" src="./src/assets/loader.svg" alt="loader">
                <p>Estamos subiendo tu <span class="uppercase">gifo</span></p>
            </div>
            <div class="gifo-uploaded">
                <img src="./src/assets/check.svg" alt="check image">
                <p><span class="uppercase">gifo</span> subido con éxito</p>
            </div>
            <div class="create-gif-btns">
                <button class="btn">
                    <img class="download" data-id='${id}' data-url="https://i.giphy.com/${id}.gif" src="./src/assets/icon-download.svg" alt="download">
                </button>
                <button class="btn">
                    <img class="link" data-url="https://i.giphy.com/${id}.gif" src="./src/assets/icon-link-normal.svg" alt="link">
                </button>
            </div>
        </div>`;
    containerVideo.querySelector('.download').addEventListener('click', download);
    containerVideo.querySelector('.link').addEventListener('click',copyUrlGif)
}

// when linkBtn is clicked (preview modal)
const copyUrlGif = (e)=> {
    const url = e.target.getAttribute('data-url');
    const aux = document.createElement("input");
    aux.setAttribute("value", url);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
}

// generates the title of the downloaded-gif
function makeRandomTitle() { 
    let text = "myGif"; 
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
    for( var i=0; i < 5; i++ ) 
    text += alphabet.charAt(Math.floor(Math.random() * alphabet.length)); 
    return text
}

const download = (e) => {
    const buttonPressed = e.target;
    const url = buttonPressed.getAttribute('data-url');
    const title = makeRandomTitle();
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

const uploadGif = async (formData) => {
    const uploadEndpoint = `https://upload.giphy.com/v1/gifs?api_key=tbWaCMKEXqzhVP6mzZcPyUQg4xDxk774&ct=g`;
    const response = await fetch(uploadEndpoint, {
        method:'POST',
        body: formData
    })
    console.log(response);
    return response.json();
}

//  Event- when uploadBtn is clicked
uploadBtn.addEventListener('click', (ev) => {
    const actualPreviewId = document.querySelector('.create-img').getAttribute('data-id');
    const actualPreviewUrl = document.querySelector('.create-img').getAttribute('src');
    const myGifoData = {
        id: actualPreviewId,
        images: {
            downsized: {
                url: actualPreviewUrl
            }
        },
        username:"Frank13",
        title: actualPreviewId
    }
   const misGifos = JSON.parse(localStorage.getItem('misGifos')) || [];
   misGifos.push(myGifoData);
   localStorage.setItem('misGifos',JSON.stringify(misGifos));
    stylingUploadBtn()
})

// styles aplied when uploadBtn is pressed
const stylingUploadBtn = ()=> {
    const modal = containerVideo.querySelector('.create-gif-modal');
    const loadingGifDesc = containerVideo.querySelector('.create-gif-modal .loading-gifo');
    const uploadedGif = containerVideo.querySelector('.create-gif-modal .gifo-uploaded ')
    const buttons = containerVideo.querySelector('.create-gif-modal .create-gif-btns ');
    stepTwo.classList.remove('active');
    stepThree.classList.add('active');
    uploadBtn.style.display = "none";
    modal.style.display = "block";
    repeatBtn.style.display = "none";
    setTimeout(() => {
        loadingGifDesc.style.display = "none";
    }, 2000);
    setTimeout(() => {
       uploadedGif.style.display= "block"; 
       buttons.style.display = "block";
    }, 2000);
}

const start = ()=> {
    startBtn.style.display = "none";
    createDescription.style.display = "none";
    videoCtn.style.display = "unset";
    recordBtn.style.display = "unset";
    stepOne.classList.remove('active');
    stepTwo.classList.add('active');
}

const getStreamAndRecord = async () => {
    try {
        start();
        // object to get Access to video(parameter)
        const mediaConstraint = {
            audio: false,
            video: {
                height: { max: 480 }
            }
        }
        // get access to the webcam
        const promise = await navigator.mediaDevices.getUserMedia(mediaConstraint);
        const stream = await promise;
        video.srcObject = stream;
        const tracks = stream.getTracks();
        video.play();

        const recorder = RecordRTC(stream, {
            type: 'gif', 
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function () {
                console.log('started')
            }
        });
        const timer = () => {
            setTimeout( () => { counter.textContent= 5 }, 1000);
            setTimeout( () => { counter.textContent= 4 }, 2000);
            setTimeout( () => { counter.textContent= 3 }, 3000);
            setTimeout( () => { counter.textContent= 2 }, 4000);
            setTimeout( () => { counter.textContent= 1 }, 5000);
            setTimeout( () => { 
                counter.textContent= 0;
                finishRecBtn.click();
            }, 6000);
        }
        // Start Recording a Video
        const recordGif = (e)=> {
            cronometer.style.display = "block";
            recordBtn.style.display = "none";
            finishRecBtn.style.display = "block";
            recorder.startRecording();
            timer();
        }
        // recording event
        recordBtn.addEventListener('click', recordGif);
       
        // Stop Recording de video
        const stopVideo = (e)=> {

            tracks.forEach(track => track.stop());
            video.srcObject = null;
            recorder.stopRecording(async () => {
                let form = new FormData();
                form.append('file', recorder.getBlob(), 'myGif.gif');
                finishRecBtn.style.display = "none";
                const { data:gifData } =  await uploadGif(form);
                showPreview(gifData);
            })
            upload.style.display = "block";
            cronometer.style.display = "none";
            repeatBtn.style.display = "block";
        }
        // finish-recording event
        finishRecBtn.addEventListener("click", stopVideo);
        
    } catch (error) {
        console.log('error', error);
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    startBtn.addEventListener('click', getStreamAndRecord);
    repeatBtn.addEventListener('click',()=>{
        repeatBtn.style.display = "none";
        location.reload();
        getStreamAndRecord();
    });

})
