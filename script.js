//const Giphy = require("./trending.js");
//let giphy = new Giphy('https://api.giphy.com/v1/gifs','gEmKkzAqvny1uF7Kng6ePeab0sPCfD2G');

const apiKey = '?api_key=gEmKkzAqvny1uF7Kng6ePeab0sPCfD2G';

const day = document.getElementById('day');
const night = document.getElementById('night');
const body = document.getElementById('cuerpo');
// let url = 'http://api.giphy.com/v1/gifs/search';

//ABRO LUPA
let lupaInactive = document.getElementById('lupaInactive');

let lupaLight = document.getElementById('lupaLight');
lupaLight.style.display='none';

let lupa = document.getElementById('lupa');
lupa.style.display='none';

// CIERRO LUPA


// Ver data!
// function getSearchResults(search) {}
/*function getSearchOutcomes() {
    let search = document.getElementById('inputsearch');
    let value = search.value;
    let buttonSearch = document.getElementById('search');
    const found =
    
    fetch('http://api.giphy.com/v1/gifs/search?q=' + value + apiKey)
    .then(response => response.json())
    .then(data => {
        console.log('datos de gifs', data)
        // input.push(data);
        return data
    })

    .catch(error => error)
    return found;


}*/
    

// Cambiar el tema
const elegirTema = document.getElementById('elegirTema');
const tema = document.getElementById('tema');
let logoDay = document.getElementById('logoDay');
let logoNight = document.getElementById('logoNight');
logoNight.style.display = 'none';
let clicks = 0;

//////////// Expandimos la barra de temas /////////////////
elegirTema.addEventListener('click', () =>{
    
    if(clicks % 2 == 0){
        tema.style.visibility= 'visible';
        //tema.style.zIndex = '10';
    }
    else{
        tema.style.visibility= 'hidden';        
    }
    clicks++

});

//////////// Ajustamos iteración cuando se presione el click en los temas /////////////////

function changeTheme(){

    let styles = document.getElementById('styles');
    

    day.addEventListener('click', ()=> {
        styles.href = './styles/styleDay.css';
        tema.style.visibility= 'hidden';  
        logoNight.style.display = 'none';
        logoDay.style.display = 'block';

        clicks = 0;

    })
    
    night.addEventListener('click', () => {
        styles.href = './styles/styleNight.css';
        tema.style.visibility= 'hidden'; 
        logoDay.style.display = 'none';
        logoNight.style.display = 'block';

        clicks = 0;

    })

    
}
changeTheme();

// FUNCTION RANDOM
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// SHOW GIFS
//// Nos muestra de manera random las sugerencias del momento ///////
async function showGifSuggestion(){
    //NÚMEROS RANDOM
    let random1 = getRandomInt(0,6);
    let random2 = getRandomInt(7,13);
    let random3 = getRandomInt(14,20);
    let random4 = getRandomInt(21,27);
    
    const pHashtag = document.getElementById('phashtag');
    const suggGif = document.getElementById('imghas');

    const pHashtag0 = document.getElementById('phashtag0');
    const suggGif0 = document.getElementById('imghas0');

    const pHashtag1 = document.getElementById('phashtag1');
    const suggGif1 = document.getElementById('imghas1');

    const pHashtag2 = document.getElementById('phashtag2');
    const suggGif2 = document.getElementById('imghas2');

    // FETCH
    const data = await fetch('https://api.giphy.com/v1/gifs/categories' + apiKey);
    const res = await data.json();
    console.log(res)
    
    //ASIGNACION DE GIF Y HASTAG
    pHashtag.innerText = '#' + res.data[random1].name_encoded//gif["tittle"][1];
    suggGif.style.backgroundImage = 'url(' + res.data[random1].gif["images"].downsized["url"] + ')';

    pHashtag0.innerText = '#' + res.data[random2].name_encoded;
    suggGif0.style.backgroundImage = 'url(' + res.data[random2].gif["images"].downsized["url"] + ')';

    pHashtag1.innerText = '#' + res.data[random3].name_encoded;
    suggGif1.style.backgroundImage = 'url(' + res.data[random3].gif["images"].downsized["url"] + ')';

    pHashtag2.innerText = '#' + res.data[random4].name_encoded;
    suggGif2.style.backgroundImage = 'url(' + res.data[random4].gif["images"].downsized["url"] + ')';
}

showGifSuggestion();

///////////// Obtenemos los gifs en un array dentro de Grid ////////////////

function getGifs(trendings, section){
    
    
    for( gifs of trendings.data){
            
        // Container
        let cardTrending = document.createElement('div');
        cardTrending.setAttribute('class','cardTrending');
    
        //img ---> Probar backgorund-image
        let imgCard = document.createElement('div');
        imgCard.setAttribute('class', 'imgCardT');
        let img = document.createElement('img');
        img.setAttribute('src', gifs.images.original.url);
        imgCard.setAttribute('height', gifs.images.original.height);
        imgCard.setAttribute('width', gifs.images.original.width);
        
        if (gifs.images.original.width/gifs.images.original.height > 1.3){
            cardTrending.setAttribute("style", "grid-column: span 2;");
        }
        
        
        // tagCard
        let cardText = document.createElement('div');
        cardText.setAttribute('class', 'cardText');
        let textTrending = document.createElement('p');
        textTrending.setAttribute('class', 'textTrending');
        textTrending.innerHTML = gifs.title;
        
        cardText.appendChild(textTrending);
        
        // appends
        imgCard.appendChild(img);
        cardTrending.appendChild(imgCard);
        cardTrending.appendChild(cardText);
        
        
        cardText.appendChild(textTrending)
        
        console.log('section:', section);

        section.appendChild(cardTrending);
        
    }
    
}

////////////////// Muestra las tendencias ///////////////////////////

async function showTrendings(limit=10){
    //GRID
    let grid = document.getElementById('gridTrendings');
    
    //fetch
    let data = await fetch(`https://api.giphy.com/v1/gifs/trending${apiKey}&limit=${limit}&rating=g`);
    let trendings = await data.json();
    // console.log('trendings: ',trendings);

    getGifs(trendings, grid);    

    return trendings;
}

showTrendings();

/////// Muestra la busqueda sugerida dentro del input y nos arroja un array de gifs /////

let bottomSearchGeneral = document.querySelector('.bottonsearch');
/////// EVENTO DEL BOTON ///////////////
bottomSearchGeneral.addEventListener('click', showSearch);

let section = document.getElementById('section');
section.style.display = 'none';
let inputsearch = document.getElementById('inputsearch');
let qValue = '';

async function showSearch(){
    //GRID
    let grid = document.getElementById('gridSearch');
    //Input
    let inputAux = document.getElementById('inputsearch');
    
    console.log(inputAux.value)
    if(inputAux.value != ''){
        //NONE
        let suggs = document.querySelector('.sugerencias');
        suggs.style.display ='none';
        let trend = document.querySelector('.trend');
        trend.style.display = 'none';
    
        //outcomes
        let outcomesContainer = document.querySelector('.outcomes');
    
    
        //fetch
        let data = await fetch(`https://api.giphy.com/v1/gifs/search${apiKey}&limit=10&q=${qValue}`);
        let search$ = await data.json();
    
        // Limpiar la busqueda cuando hacemos search con un nuevo input
        while(grid.hasChildNodes()){
            grid.lastChild.remove();
        }
    
        if(qValue.length > 1){
            section.style.display = 'grid';
            outcomesContainer.style.display ='none';
    
        }
    
        getGifs(search$, grid);    
    
        return search$;
    }
}

// OUTCOMES 
////// Nos muestra sugerencias/autocompletados mientras escribimos dentro del input////////
inputsearch.addEventListener('keyup', showOutcomes);

async function showOutcomes() {
    
    qValue = inputsearch.value;

    let data = await fetch(`https://api.giphy.com/v1/gifs/search/tags${apiKey}&q=${qValue}`);
    let autocompleted = await data.json();

    //Cuando llamas por clases te trae un array
    let outcome = document.getElementsByClassName('res');
    
    let outcomesContainer = document.querySelector('.outcomes');
    let bottomSearch = document.getElementById('search');
    let buscarText = document.getElementById('buscarText');
    
    if(qValue.length === 0){
        outcomesContainer.style.display = 'none';

    } else {
        outcomesContainer.style.display = 'flex';
        bottomSearch.style.backgroundColor = 'rgba(247,201,243,1)';
        bottomSearch.style.border = '1 px solid rgba(17,0,56,1)';
        bottomSearch.style.boxShadow = 'inset -1px -1px rgba(153,125,151,1), inset 1px 1px rgba(255,255,255,1)';

        buscarText.style.color = 'rgba(17,0,56,1)';

        lupaInactive.style.display= 'none';
        lupa.style.display = 'block';

        for(let i = 0; i < 3; i++){
            if(autocompleted.data[i]){
                outcome[i].innerText = autocompleted.data[i].name;
                outcome[i].style.color = 'rgba(17,0,56,1)';
                outcome[i].style.fontFamily = 'Chakra Petch, sans-serif';
                outcome[i].style.padding= '6px 15px';
                outcome[i].style.cursor = 'pointer';

                outcome[i].addEventListener('click',() =>{
                    
                    qValue = autocompleted.data[i].name;
                    // value = autocompleted.data[i].name;
                    inputsearch.value = autocompleted.data[i].name;
                    showSearch();
                    
                })                
            }
        }
    }   
    
}

/////////////////// Presionar el boton de crear Guifos ////////////////

let crearGuifos = document.getElementById('buttoncreate');
let permisos = document.getElementById('permisos');
permisos.style.display ='none';

let arrow = document.getElementById('arrow');
arrow.style.display = 'none';
arrow.style.cursor = 'pointer';

crearGuifos.addEventListener('click', clickCreate);

function clickCreate(){
    permisos.style.display ='flex';
    document.querySelector('.trend').style.display = 'none';
    document.querySelector('.sugerencias').style.display = 'none';
    document.querySelector('.search').style.display = 'none';
    document.querySelector('.buttons').style.display = 'none';

    arrow.style.display = 'inline-block';
    arrow.style.marginBottom = '10px';

}

arrow.addEventListener('click', ()=> {

    // HEADER
    document.querySelector('.sugerencias').style.display = 'block';
    document.querySelector('.search').style.display = 'inline-block';
    document.querySelector('.buttons').style.display = 'flex';

    // TREND
    document.querySelector('.trend').style.display = 'inline-block';
    document.querySelector('.trend').style.marginTop = '-60px';

    // ARROW
    arrow.style.display = 'none';

    // PERMISOS
    document.querySelector('.permisos').style.display = 'none';

    // CONTAINER VIDEO
    sectionVideo.style.display = 'none';

    // Camara encendida
    
    let video2 = document.getElementById('video2');
    video2.srcObject = null;
    video.srcObject = null;
    
    cameraOff();
    stopRecording();
    stopTime();
})



///////// Encender la cámara /////////////////////

const video = document.getElementById('video');
const comenzar = document.querySelector('.start');
// section del video
const sectionVideo = document.querySelector('.sectionVideo');
sectionVideo.style.display = 'none';
comenzar.addEventListener('click', cameraOn)

function cameraOn(){
    sectionVideo.style.display = 'flex';
    permisos.style.display = 'none'
    
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {    
            height: { max: 434 },
            width: { ideal: 880  }
        }
    }).then(stream =>{
        
        video.srcObject = stream;
        video.play();
        
    }).catch(console.error)
}
//////////// Apagar la camara ////////////////7
function cameraOff(){
    
    // sectionVideo.style.display = 'none';
    
    let tracks = video.srcObject.getTracks();
    
    tracks.forEach(track => track.stop());
    
    video.srcObject = null;
}



////////////// Creamos el Recorder //////////////////

let recorder = null;
let recorderVideo = null;
let blob = null;
let blobVideo = null;
let video2 = null;


async function startRecording(){
    
    let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});

    recorder = new RecordRTCPromisesHandler(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
        console.log('started')
        },
    });

    recorderVideo = new RecordRTCPromisesHandler(stream, {
        type: 'video',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
        console.log('started')
        },
    });

    recorder.startRecording();
    recorderVideo.startRecording();

    /// Cambiamos los estilos del boton CAPTURAR ////

    capturar.style.backgroundColor = 'rgba(255,97,97,1)';
    capturar.style.color = 'white';
    capturar.innerText = 'Listo';
    capturar.style.fontFamily ='ChakraPetch-Regular';

    let img = document.querySelector('.imgCamera');
    img.style.marginLeft = '445px';
    let iconCamera = document.getElementById('iconCamera');
    img.style.backgroundColor = 'rgba(255,97,97,1)';

    iconCamera.setAttribute('src', './assets/recording.svg');

    buttonsVideo.seconds.style.display = 'flex'


    // capturar.styles.boxShadow = 'inset -1px -1px rgba(153,58,58,1), inset 1px 1px rgba(255,255,255,1)';
    // img.styles.boxShadow = 'inset -1px -1px rgba(153,58,58,1), inset 1px 1px rgba(255,255,255,1)'; 


}

let buttonsVideo = {
    container: document.querySelector('.capture'),
    seconds: document.querySelector('.seconds'),
    play: document.querySelector('.play'),
    carga: document.querySelector('.carga'),
    repetir: document.querySelector('.repetir'),
    upload: document.querySelector('.upload')

    

}

function ocultarBotones(){
    buttonsVideo.seconds.style.display = 'none';
    buttonsVideo.play.style.display = 'none';
    buttonsVideo.carga.style.display = 'none';
    buttonsVideo.upload.style.display = 'none';
    buttonsVideo.repetir.style.display = 'none'

}

ocultarBotones();

async function stopRecording(){
    
    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);

    await recorder.stopRecording();
    await recorderVideo.stopRecording();

    blob = await recorder.getBlob();
    blobVideo = await recorderVideo.getBlob();
    // invokeSaveAsDialog(blob);

    //// Transforma el video guardado en una URL /////
    let videoUpload = await URL.createObjectURL(blobVideo);
    video2 = document.getElementById('video2');
    video.style.display ='none';
    video2.style.display = 'flex';
    console.log(videoUpload);
    video2.src = videoUpload;
    video2.play();

    /////// estilo de botones /////////////
    
    //////////////////////////////
    formData();

    console.log('stoped');
    // console.log(blob);

    
}



let capturar = document.querySelector('.textCapture');

capturar.addEventListener('click', () => {

    if(clicks % 2 == 0){
        startRecording();
        cameraOnButtons();
        count();
        clicks++;
        
    }
    else{
        stopRecording();
        stopTime();
        repetirCarga();
        buttonsVideo.play.style.display = 'flex';
        buttonsVideo.carga.style.display = 'flex';
        buttonsVideo.upload.style.display = 'flex';
        
    }
});

function cameraOnButtons(){
    buttonsVideo.seconds.style.display = 'flex';
    buttonsVideo.play.style.display = 'none';
    buttonsVideo.carga.style.display = 'none';
    buttonsVideo.upload.style.display = 'none';
    

}

let timer = null;

const count = () => {
    let time = buttonsVideo.seconds;
    let secondsTime = 0;
    let minutes = 0;

    timer = setInterval(() => {
        // t = getTime();
        
        secondsTime++
        if(secondsTime == 59){
            secondsTime = 0;
            minutes++;
            // minutes.innerText = minutes; 
        }     
        time.innerHTML = `00:00:${('0'+ minutes).slice(-2)}:${('0' + secondsTime).slice(-2)}`;
        
    }, 1000);
    
    return timer;
    
}

const stopTime = () =>{
    clearInterval(timer)
}


function repetirCarga(){
    capturar.style.display = 'none';

    buttonsVideo.repetir.style.display = 'flex';
    
    
    let img = document.querySelector('.imgCamera'); 
    img.style.display = 'none';
    
    buttonsVideo.container.style.justifyContent = 'space-between';
    buttonsVideo.seconds.style.marginLeft = '10px';
    
}

buttonsVideo.repetir.addEventListener('click', () => {
        
    startRecording();
    cameraOnButtons();
    count();
    capturar.style.display = 'flex';
    
    buttonsVideo.repetir.style.display = 'none';
    let img = document.querySelector('.imgCamera');
    img.style.display = 'flex';
    
    video.style.display = 'flex';
    video2.style.display = 'none';
    // clicks = 1;
})

let form = null; 

const formData = ()=> {
    form = new FormData();
    form.append('file', blob, 'myGif.gif');
    form.append('file', blobVideo, 'myGif.gif');
    // blob = null;
    // blobVideo = null;
    /////  Confirmamos que nuestra FormData se está creando de manera correcta //////
    console.log(form.get('file'));

    return form;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

buttonsVideo.play.addEventListener('click',() =>{
    blobbb = new Blob();
    const stream = blobbb.stream();
    return stream;
} );

const barraPlay = ()=> {
    let carga = document.querySelector('.carga');
    let barra = document.querySelector('.cargando');

    barra.style.width = '12px';
    barra.style.height = '18px';
    barra.style.backgroundColor ='rgba(153,153,153,1)';
    barra.style.border = '1px solid rgba(180,180,180,1)';
    for(barras of barra){

    }
    
}







// permisos.style.display ='flex';
// document.querySelector('.trend').style.display = 'none';
// document.querySelector('.sugerencias').style.display = 'none';
// document.querySelector('.search').style.display = 'none';
// document.querySelector('.buttons').style.display = 'none';

// document.querySelector('.permisos').style.display = 'none';

// /////MIENTRAS ARREGLO EL SECTION VIDEO Y LOS BOTONES ////////////////
// sectionVideo.style.display = 'flex'
