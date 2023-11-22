
var carta_guardada = null;

cartas = document.getElementsByClassName("cara");
numeros = [];
cont = 1;

for(carta of cartas ) {
    while(cont < 7){
        bucle =true;
        while(bucle){
            numero = Math.floor(Math.random() * 12) + 1 ;
            if (!numeros.includes(numero)){
                cartas[numero-1].style.backgroundImage = "url('../img/"+cont+".png')";
                numeros.push(numero);
                bucle=false;
            }
        }
        bucle = true;
        while(bucle){
            numero = Math.floor(Math.random() * 12) + 1 ;
            if (!numeros.includes(numero)){
                cartas[numero-1].style.backgroundImage = "url('../img/"+cont+".png')";
                numeros.push(numero);
                bucle=false;
            }
        }
        cont++;
    }
    
}

document.getElementById("errores").value = 0;
document.getElementById("correctos").value = 0;
function prueba(carta) {

    if (carta_guardada == null) {
        carta_guardada = carta;
        return;
    }

    if (carta.children[0].style.backgroundImage == carta_guardada.children[0].style.backgroundImage) {
        carta_guardada.classList.add('correcta');
        carta.classList.add('correcta');
        document.getElementById("correctos").value = parseInt(document.getElementById("correctos").value) +1;
    } else {
        carta_guardada.classList.remove('girada');
        carta.classList.remove('girada');
        document.getElementById("errores").value = parseInt(document.getElementById("errores").value) +1;
    }
    carta_guardada = null;
}

function girar(carta) {
    if(!carta.classList.contains('girada')) {
        carta.classList.add('girada');
        setTimeout(prueba, 500, carta);
    }
}
    
