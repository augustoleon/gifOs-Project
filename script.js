const apiKey = 'wvPT50S3Z1uOSYJDNAUkGYvhpPnpTf5l';

const day = document.getElementById('day');
const night = document.getElementById('night');
const body = document.getElementById('cuerpo');

// Ver data!
// function getSearchResults(search) {
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
// getSearchResults()
    



let url = 'http://api.giphy.com/v1/gifs/search';


// function searchInput() {
//     let input = document.getElementById('inputsearch').value;

    
// }



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

async function showGifRandom(){

    const suggGif = document.getElementsByClassName('imghas');
    // debugger;
    for(gifRandom of suggGif){
        const data = await fetch('https://api.giphy.com/v1/gifs/random?api_key=wvPT50S3Z1uOSYJDNAUkGYvhpPnpTf5l&tag=&rating=g');
        // const data = await fetch('https://api.giphy.com/v1/gifs/categories?api_key=wvPT50S3Z1uOSYJDNAUkGYvhpPnpTf5l&tag=&rating=g');
        const res = await data.json();
        console.log(res)
        let imgGif = document.createElement('img')
        imgGif.style.height ='100%';
        imgGif.style.width = '100%';
        imgGif.setAttribute('src', res.data['images'].downsized['url']);
        // imgGif.setAttribute('src', res.data[2].downsized['url']);

        gifRandom.appendChild(imgGif);

        // res.data.images.downsized_large.url
        // fetch('https://api.giphy.com/v1/gifs/random?api_key=wvPT50S3Z1uOSYJDNAUkGYvhpPnpTf5l&tag=&rating=g')
        // .then(resultado => resultado.json())
        // .then(res => {
        //     let imgGif = document.createElement('img')
        //     imgGif.style.height ='100%';
        //     imgGif.style.width = '100%';
        // //    var gifWindows = gifRandom.appendChild(imgGif);
        //    var gifWindows = gifRandom.appendChild(imgGif);
            
        //     gifWindows.setAttribute('src', res.data.images.downsized_large.url)
            
        // }) 
    }

}

showGifRandom();

