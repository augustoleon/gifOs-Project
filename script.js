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

const day = document.getElementById('day');
const night = document.getElementById('night');
const body = document.getElementById('cuerpo');

function changeTheme(){
    
    night.addEventListener('click', () => {
        body.style.backgroundColor = 'rgba(17,0,56,1)';
    })
}

changeTheme();
