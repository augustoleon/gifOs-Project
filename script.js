//const Giphy = require("./trending.js");
//let giphy = new Giphy('https://api.giphy.com/v1/gifs','gEmKkzAqvny1uF7Kng6ePeab0sPCfD2G');

const apiKey = '?api_key=gEmKkzAqvny1uF7Kng6ePeab0sPCfD2G';

const day = document.getElementById('day');
const night = document.getElementById('night');
const body = document.getElementById('cuerpo');
let url = 'http://api.giphy.com/v1/gifs/search';

// Ver data!
// function getSearchResults(search) {}
function getSearchResults() {
    const search = document.getElementById('inputsearch')
    let buttonSearch = document.getElementById('search');
    const found =
    
    fetch('http://api.giphy.com/v1/gifs/search?q=' + search.value +
    '&api_key=' + apiKey)
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

async function showTrendings(limit=10){
    //GRID
    let grid = document.getElementById('grid');
    
    //fetch
    let data = await fetch(`https://api.giphy.com/v1/gifs/trending${apiKey}&limit=${limit}&rating=g`);
    let trendings = await data.json();
    console.log('trendings: ',trendings);
    
    for( gifs of trendings.data){
        //console.log('console.log(gifs): ',gifs);


        // Container
        let cardTrending = document.createElement('div');
        cardTrending.setAttribute('class','cardTrending');

        //img
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


        grid.appendChild(cardTrending);

    }

    return trendings;
}

showTrendings();

