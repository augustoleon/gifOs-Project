class Giphy {
    constructor(url, key){
        this.url = url;
        this.key = 'api_key=' + key;
    }

    async getTrendings(limit, offset){
        // tengo que hacer un async per buscando el apikey de GIPHY
        // MIRAR VIDEO JS3 CLASE 6 1:40
        let qs = `${this.key}&limit=${limit}&offset=${offset}`
        let res = await fetch(`${this.url}/trending?${qs}`);
        let trendings = await res.json();
        return trendings

        /*trendings = () =>{
            for(let gif of data.data){
                console.log(gif);
                // Contenedor
                let tarjeta = document.createElement('div');
                tarjeta.setAttribute('class', 'tarjeta');
                // Img
                let img = document.createElement('img');
                img.setAttribute('src', gif.images.original.url);
                if (gif.images.original.width/gif.images.original.height > 1.3){
                    tarjeta.setAttribute("style", "grid-column: span 2;");
                }
                tarjeta.appendChild(img);
                // Footer
                let footer = document.createElement('div');
                footer.innerText = `#comiendo #pochoclos #gente`;
                tarjeta.appendChild(footer);
                // Appendear todo
                contGrid.appendChild(tarjeta);
            } 
        }*/

    }
}

module.exports = Giphy;
