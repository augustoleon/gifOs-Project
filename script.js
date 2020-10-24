//const Giphy = require("./trending.js");
//let giphy = new Giphy('https://api.giphy.com/v1/gifs','gEmKkzAqvny1uF7Kng6ePeab0sPCfD2G');

const apiKey = '?api_key=gEmKkzAqvny1uF7Kng6ePeab0sPCfD2G';

const day = document.getElementById('day');
const night = document.getElementById('night');
const body = document.getElementById('cuerpo');
let url = 'http://api.giphy.com/v1/gifs/search';

//ABRO LUPA
let lupaInactive = document.getElementById('lupaInactive');

let lupaLight = document.getElementById('lupaLight');
lupaLight.style.display='none';

let lupa = document.getElementById('lupa');
lupa.style.display='none';



// CIERRO LUPA


// Ver data!
// function getSearchResults(search) {}
function getSearchOutcomes() {
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


}
    

// Cambiar el tema
const elegirTema = document.getElementById('elegirTema');
const tema = document.getElementById('tema');
let clicks = 0;

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

// Cuando el menú está expandido

function changeTheme(){
    
    night.addEventListener('click', () => {
        body.style.backgroundColor = 'rgba(17,0,56,1)';
    })
}
changeTheme();

// FUNCTION RANDOM
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// SHOW GIFS
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

function getGifs(trendings, section){
    
    
    for( gifs of trendings.data){
        //console.log('console.log(gifs): ',gifs);
        
    
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

async function showTrendings(limit=10){
    //GRID
    let grid = document.getElementById('gridTrendings');
    
    //fetch
    let data = await fetch(`https://api.giphy.com/v1/gifs/trending${apiKey}&limit=${limit}&rating=g`);
    let trendings = await data.json();
    console.log('trendings: ',trendings);

    getGifs(trendings, grid);    

    return trendings;
}

showTrendings();

async function showSearch(limit=20){
    //GRID
    let grid = document.getElementById('gridSearch');

    
    //fetch
    let data = await fetch(`https://api.giphy.com/v1/gifs/search${apiKey}&limit=${limit}&q=cheeseburger`);
    let trendings = await data.json();
    console.log('trendings: ',trendings);

    getGifs(trendings, grid);    

    return trendings;
}

showSearch();


// OUTCOMES 
let qSearch = document.getElementById('inputsearch');
qSearch.addEventListener('keydown', showOutcomes);

async function showOutcomes() {
    let value = qSearch.value;
    let data = await fetch(`https://api.giphy.com/v1/gifs/search/tags${apiKey}&q=${value}`);
    let autocompleted = await data.json();
    console.log('Autocompleted:', autocompleted);

    //Cuando llamas por clases te trae un array
    let outcome = document.getElementsByClassName('res');
    
    let outcomesContainer = document.querySelector('.outcomes');
    let bottomSearch = document.getElementById('search');
    let buscarText = document.getElementById('buscarText');
    
    if(value.length === 1){
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
            if(autocompleted.data[i].name){
                outcome[i].innerText = autocompleted.data[i].name;
                outcome[i].style.color = 'rgba(17,0,56,1)';
                outcome[i].style.fontFamily = 'Chakra Petch, sans-serif';
                outcome[i].style.padding= '6px 15px';
                outcome[i].style.cursor = 'pointer';
                
            }
        }
    }
    
    
}

