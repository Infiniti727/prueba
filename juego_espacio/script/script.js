

class Planeta{
    constructor(){
            this.supervivientes = Math.floor(Math.random() * 101);
            this.energia = Math.floor(Math.random() * 101);
            this.casco = Math.floor(Math.random() * 101);
            this.pelea = Math.floor(Math.random() * 101);
    }
}

class Nave{
    constructor() {
        this.energia = 90;
        this.casco = 90;
        this.supervivientes = 90;
        this.misiles = 10; 
    }
}

class NaveEnemiga{
    constructor() {
        this.vida =  Math.floor(Math.random() * 100) + 30;;
    }
}

nave = new Nave();
contador = document.getElementById("temporizador");
contador.innerHTML = "--:--";
supervivientes = document.getElementById("survivor-meter-num");
energias = document.getElementsByClassName("energy-meter-num");
cascos = document.getElementsByClassName("damage-meter-num");
recalentamiento = document.getElementById("jump-progress-num");
proa = document.getElementById("shield");
refrigerador = document.getElementById("refrigerator");
laseres = document.getElementById("weapon1");
misiles = document.getElementById("weapon2");
municion = document.getElementById("ammunition-meter-num");
disparos=5;
id_tiempo = setInterval(cuenta_atras, 1000);
id_recalentamiento = setInterval(progreso_recalentamiento, 1000);
id_refrigeramiento = setInterval(refrigeramiento, 1000);
id_actualizar = setInterval(actualizar_colores, 100);
pop_up = document.getElementById("pop_up");
planetas = document.getElementById("planetas").getElementsByClassName("planeta");
salto = document.getElementById("salto");
cont_saltos = document.getElementById("saltos_num");
list_planetas = [];
divSeguidor = document.getElementById('divSeguidor');
daño_const= "";
planeta_en_pela = "";
planeta_seleccionado = "";
barra_vida_enemigo = document.getElementById("enemy-meter-num");
div_pelea = document.getElementById("pelea");

cont=120;

document.getElementById("refrigerator").value=0;
document.getElementById("shield").value=0;

document.onmousemove = function(e) {
    var event = e || window.event;
    window.mouseX = event.clientX;
    window.mouseY = event.clientY;
}

//hacer que la leyenda siga el raton
function seguirRaton() {
    divSeguidor.style.left = window.mouseX + 'px';
    divSeguidor.style.top = window.mouseY+ 'px';
}

setInterval(seguirRaton, 1);

//genjeracion de planetas nuevos
function planetas_aleatorios(){
    list_planetas = [];
    for(planeta of planetas){
        tamaño_rand = Math.floor(Math.random() * (120 - 60) + 60);
        planeta.style.filter = "";
        planeta.style.width = ""+ tamaño_rand + "px";

        
        numero = Math.floor(Math.random() * 4) + 1;
        planeta.src = "img/planeta"+numero+".png";
        
        nuevo_planeta = new Planeta()
        list_planetas.push(nuevo_planeta);

        numero = Math.floor(Math.random() * 101);
        if(numero > nuevo_planeta.pelea){
            planeta.onclick = function() {tesoro(this)};
        } else {
            planeta.onclick = function() {pelea(this)};
        }
        
        planeta.onmouseover = function() {mostrarEstadisticas(this)};
    }
}


window.onload = function() {
    planetas_aleatorios();
};

//muestra interfaces de menu de pelea
function mostrarPeleaInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("opciones").style.height = "520px";
    document.getElementById("pelea-interface").style.display = "block";
}

//muestra interfaces de menu de motor
function mostrarMotorSaltoInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("opciones").style.height = "300px";
    document.getElementById("motor-salto-interface").style.display = "block";
}

//cierra interfaces de menu
function ocultarTodasLasInterfaces(cerrar = false) {
    
    document.getElementById("opciones").style.height = "60px";
    if(cerrar == true){
        setTimeout(function(){
            div_pelea.style.display = "none";
            document.getElementById("motor-salto-interface").style.display = "none";
        },1000)
    } else {
        document.getElementById("pelea-interface").style.display = "none";
        document.getElementById("motor-salto-interface").style.display = "none";
    }
    
}

//abre la leyenda
function mostrarEstadisticas(element) {
    
    divSeguidor.style.height = "150px";
    divSeguidor.style.width = "400px";
    divSeguidor.style.opacity = "100%";
    divSeguidor.style.left = window.mouseX + 'px';
    divSeguidor.style.top = window.mouseY+ 'px';

    id = element.id;

    if(id == 4){
        divSeguidor.style.transform ="translate(-100%,0%)";
    }
    divSeguidor.innerHTML = divSeguidor.innerHTML + "<p>probabilidad de encontrar supervivientes: "+list_planetas[parseInt(id)-1].supervivientes+"%</p>";
    divSeguidor.innerHTML = divSeguidor.innerHTML + "<p>probabilidad de encontrar energia: "+list_planetas[parseInt(id)-1].energia+"%</p>";
    divSeguidor.innerHTML = divSeguidor.innerHTML + "<p>probabilidad de encontrar reparacion de casco: "+list_planetas[parseInt(id)-1].casco+"%</p>";
    divSeguidor.innerHTML = divSeguidor.innerHTML + "<p>probabilidad de encontrar pelea: "+list_planetas[parseInt(id)-1].pelea+"%</p>";
}

//cierra la leyenda
function cerrarEstadisticas() {
    divSeguidor.style.height = "0px";
    divSeguidor.style.width = "0px";
    divSeguidor.style.opacity = "0%";
    divSeguidor.style.left = window.mouseX + 'px';
    divSeguidor.style.top = window.mouseY+ 'px';
    divSeguidor.style.transform ="translate(0%,0%)";

    divSeguidor.innerHTML = "";
}


//inicio de una pelea contra un enemigo el cual baja la vida por 10 cada 2 segundos bloqueado por energia con el escudo
function pelea(elemento){
    seleccionado(elemento);
    planeta_en_pela = elemento;

    nave_enemiga = new NaveEnemiga();

    barra_vida_enemigo.innerHTML = nave_enemiga.vida; 
    comprobar(barra_vida_enemigo);

    daño_const = setInterval(() => {

        if(document.getElementById("shield-num").innerHTML != 0){
            nave.energia -= document.getElementById("shield-num").innerHTML;
            for(energia of energias){
                energia.innerHTML = nave.energia;
            }
    
        }
        
        if((nave.casco - 10 + parseInt(document.getElementById("shield-num").innerHTML)) <= 0) {
            for(casco of cascos){
                casco.innerHTML = 0; 
                terminar("<h1>Se ha roto la nave</h1>");
            }
        } else {

            nave.casco = nave.casco -10 + parseInt(document.getElementById("shield-num").innerHTML);

            for(casco of cascos){
                casco.innerHTML = nave.casco;
            }
        }
        
    }, 2000);
    div_pelea.style.display= "block";
    ocultarTodasLasInterfaces();
    document.getElementById("opciones").style.height = "520px";
    document.getElementById("pelea-interface").style.display = "block";
}

//salto con perdida de recursos
function salto_emergencia() {
    cerrar_popup();
    if(nave.supervivientes <= 30) {
        supervivientes.innerHTML = 0; 
        terminar("<h1>Ya no tienes tripulacion</h1>");
    } else {
        nave.supervivientes = nave.supervivientes -30;
        supervivientes.innerHTML = nave.supervivientes;
    }
    
    if(nave.energia <= 30) {
        for(energia2 of energias){
            energia2.innerHTML = 0;
        }
        terminar("<h1>Ya no tienes energia</h1>");
    } else {
        nave.energia = nave.energia -30;
        for(energia of energias){
            energia.innerHTML = nave.energia;
        }
    }
        
    

    div_pelea.style.display= "none";
    deseleccionar();
    
    if(nave.casco <= 30) {
        for(casco of cascos){
            casco.innerHTML = 0; 
            terminar("<h1>Se ha roto la nave</h1>");
        }
    } else {
        nave.casco = nave.casco -30;
        for(casco of cascos){
            casco.innerHTML = nave.casco;
        }
    }
    
    recalentamiento.innerHTML = 100;
    ocultarTodasLasInterfaces(true);
    cambiar_sistema();
    if(daño_const != ""){
        clearInterval(daño_const);
        daño_const = "";
    }
}

//crear nuevos planetas, subida de contador de saltos y comprobar si es el final
function cambiar_sistema() {

    
    cont_saltos.innerHTML = parseInt(cont_saltos.innerHTML) + 1;

    if(cont_saltos.innerHTML == 10){
        terminar(puntuacion());
    } else {
        planetas_aleatorios();
    }
}

//salto sin perdida de recursos
function salto_normal(){
    cerrar_popup();
    deseleccionar();
    recalentamiento.innerHTML = 100;
    ocultarTodasLasInterfaces(true);
    salto.innerHTML = "SALTO DE EMERGENCIA";
    salto.onclick = salto_emergencia;
    div_pelea.style.display= "none";
    if(daño_const != ""){
        clearInterval(daño_const);
        daño_const = "";
    }
    cambiar_sistema();

}

//muestra mensaje
function mostrar_popup(mensaje){
    pop_up.style.display = "block";
    pop_up.children[0].innerHTML = mensaje;
}

//cierra mensaje
function cerrar_popup() {
    deseleccionar();
    pop_up.style.display = "none";
}

function puntuacion() {
    mensaje = "<h1> HAS GANADO </h1>";
    mensaje =  mensaje + "<p> energia restante: "+nave.energia+" x 10 = "+ nave.energia * 10 +"</p>"; 
    mensaje =  mensaje + "<p> vida de la nave: "+nave.casco+" x 10 = "+ nave.casco * 10 +"</p>"; 
    mensaje =  mensaje + "<p> supervivientes: "+nave.supervivientes+" x 20 = "+ nave.supervivientes * 20 +"</p>"; 
    mensaje =  mensaje + "<p> tiempo restante: "+cont+" x 10 = "+ cont * 10 +"</p>"; 
    mensaje =  mensaje + "<p> puntuacion final : "+(nave.energia*10 + nave.casco*10 + nave.supervivientes * 20 +  cont * 10)+"</p>";

    return mensaje;
}

//calcula si has encontrado algo en un planeta
function obtener_tesoro(probabilidad){
    if(Math.floor(Math.random() * 101) <= probabilidad){
        return Math.floor(Math.random() * 20) + 5;
    } else {return 0}
}

//si no haces batalla
function tesoro(elemento){
    seleccionado(elemento);


    id= parseInt(elemento.id) -1;

    casco_value = obtener_tesoro(list_planetas[id].casco);
    energia_value = obtener_tesoro(list_planetas[id].energia);
    supervivientes_value = obtener_tesoro(list_planetas[id].supervivientes);

    
    mensaje = "<p>Has encontrado:</p> <p>"+casco_value+" elementos de reparacion de casco</p> <p>"+energia_value+" de energia</p> <p>"+supervivientes_value+" supervivientes</p> <button type='button' onclick='cerrar_popup()' id=''>Ok</button></button>" ;
    
    nave.casco = nave.casco + casco_value;
    if(nave.casco > 100){
        nave.casco = 100;
    }

    nave.supervivientes = nave.supervivientes + supervivientes_value;
    if(nave.supervivientes > 100){
        nave.supervivientes = 100;
    }
    
    nave.energia = nave.energia + energia_value;
    if(nave.energia > 100){
        nave.energia = 100;
    }

    for(energia of energias) {
        energia.innerHTML = nave.energia;
    }
    supervivientes.innerHTML = nave.supervivientes;
    for(casco of cascos){
        casco.innerHTML = nave.casco;
    }

    elemento.onclick = "";
    elemento.onmouseover = "";


    mostrar_popup(mensaje);
}

//temporizador
function cuenta_atras(){
    num1 = parseInt(cont/60);
    num2 = cont%60;
    num1_texto = "";
    num2_texto = "";
   
    if(num1 < 10) {
        num1_texto ="0"+num1;
    } else {
        num1_texto = num1;
    }

    if(num2 < 10) {
        num2_texto ="0"+num2;
    } else {
        num2_texto = num2;
    }
    contador.innerHTML = num1_texto + ":" + num2_texto;
    if(cont == 90){
        contador.style.color = "yellow";
    } else if(cont == 60) {
        contador.style.color = "orange";
    } else if (cont == 30) {
        contador.style.color = "red";
    } else if (cont<=0) {
        terminar("</h1>Se te ha acabado el tiempo</h1>");
    }
    cont--;
}

//bajada de contador de refrigeramiento
function progreso_recalentamiento() {
    if(parseInt(recalentamiento.innerHTML) < 1){
        recalentamiento.innerHTML = 0;
    } else {
        recalentamiento.innerHTML = recalentamiento.innerHTML-1;
    }
    

    if(recalentamiento.innerHTML < 50 && recalentamiento.innerHTML > 25) {
        recalentamiento.style.color = "yellow";
    } else if (recalentamiento.innerHTML < 25){
        recalentamiento.style.color = "green";
    } else {
        recalentamiento.style.color = "red";
    }

    if(recalentamiento.innerHTML == 0){
        salto.innerHTML = "SALTO SEGURO";
        salto.onclick = salto_normal;
    }
}

//enfriamiento del motos contando el refrigerado
function refrigeramiento() {
    if(recalentamiento.innerHTML != 0){
        
        if(parseInt(nave.energia) <= parseInt(refrigerador.value)) {
            for(energia of energias) {
                energia.innerHTML = 0;
            }
            terminar("<h1>Ya no tienes energia</h1>");
        } else {
            nave.energia = nave.energia - refrigerador.value;
            for(energia of energias) {
                energia.innerHTML = nave.energia;
            }
        }

        if(parseInt(recalentamiento.innerHTML) <= 10 * refrigerador.value){
            recalentamiento.innerHTML = 0;
            salto.innerHTML = "SALTO SEGURO";
            salto.onclick = salto_normal;
        } else {
            recalentamiento.innerHTML = recalentamiento.innerHTML - (10 * refrigerador.value);
        }
        

        if(recalentamiento.innerHTML <= 50 && recalentamiento.innerHTML > 25) {
            recalentamiento.style.color = "yellow";
        } else if (recalentamiento.innerHTML <= 25){
            recalentamiento.style.color = "green";
        }
    }
}

//lo que indica a que color cambiar la energia, casco y supervivientes
function comprobar(elemento){
    if(elemento.innerHTML > 50){
        elemento.style.color= "green";
    } else if (elemento.innerHTML > 25 ){
        elemento.style.color= "yellow";
    } else {
        elemento.style.color= "red";
    }
}

//para el final de la partida
function terminar(mensaje){
    for (elemento of document.body.getElementsByTagName("input")) {
        elemento.disabled = true;
    } 

    for (elemento of document.body.getElementsByTagName("button")) {
        elemento.disabled = true;
    }

    for (elemento of document.body.getElementsByTagName("img")) {
        elemento.onclick = "";
    }

    clearInterval(id_tiempo);
    clearInterval(id_actualizar);
    actualizar_colores();
    clearInterval(id_recalentamiento);
    clearInterval(id_refrigeramiento);
    clearInterval(id_tiempo);
    if(pop_up.style.display == ""  || pop_up.style.display == "none"  ){

        mostrar_popup(mensaje);
    }
}

//hacer el planeta seleccionado grande y ocultar el resto
function seleccionado(elemento){
    elemento.onmouseover = "";
    planeta_seleccionado = elemento;
    for (element of document.getElementById("planetas").children){
        if(elemento == element){
            element.style.transform = "scale(4)";
        }else if(element == document.getElementById("sun")){
            element.style.transform = "scale(0) translate(-50%, -50%)";
        } else {
            element.style.transform = "scale(0)";
        }
    }
    
}

//hacer el planeta pequeño y volver a mostrar todos dejando el seleccionado en gris
function deseleccionar(){
    if(planeta_seleccionado != ""){ planeta_seleccionado.style.filter = "grayscale()"; }
    for (element of document.getElementById("planetas").children){
        if(element == document.getElementById("sun")){
            element.style.transform = "scale(1)  translate(-50%, -50%)";
        } else {
            element.style.transform = "scale(1)";
        }
        
    }
    
}

//cambio de colores de las estadisticas de energia, casco, y supervivientes
function actualizar_colores() {
    for ( numero of energias) {
        comprobar(numero);
    }

    for(casco of cascos){
        comprobar(casco);
    }
    
    comprobar(supervivientes);


}

//cambiar el numero de los input
function cambiar_num(elemento) {
    id = elemento.id;
    id = id +"-num";
    document.getElementById(id).innerHTML = elemento.value;
}

//desabilitacion y cambio de colores de armas
function cambiar_arma() {
    if(laseres.disabled) {
        laseres.disabled = false;
        laseres.checked = true;
        misiles.disabled = true; 

        if(disparos == 0) {
            document.getElementById("disparar").disabled = true; 
        }

        document.getElementById("misiles_label").style.color = "grey";
        document.getElementById("ammunition-meter-num").style.color = "grey";
        document.getElementById("laser_label").style.color = "white";
    } else {
        laseres.disabled = true;
        misiles.disabled = false; 
        misiles.checked = true;
        
        document.getElementById("disparar").disabled = false;
        document.getElementById("misiles_label").style.color = "white";
        document.getElementById("ammunition-meter-num").style.color = "white";
        document.getElementById("laser_label").style.color = "grey";
    }
}

//lo que pasa al disparar
function disparo() {
    if(laseres.disabled) {
        if(div_pelea.style.display == "block"){
            if((barra_vida_enemigo.innerHTML - 100) < 0 ){
                barra_vida_enemigo.innerHTML = 0; 
            } else {
                barra_vida_enemigo.innerHTML = barra_vida_enemigo.innerHTML -100 ;
            }
            comprobar(barra_vida_enemigo);
        }
        if(nave.misiles != 0){ //comprobacion de que no hay mas
            nave.misiles--;
            municion.innerHTML = nave.misiles;
        }
    } else {
        if(div_pelea.style.display == "block"){
            if((barra_vida_enemigo.innerHTML - 5) < 0 ){
                barra_vida_enemigo.innerHTML = 0; 
            } else {
                barra_vida_enemigo.innerHTML = barra_vida_enemigo.innerHTML -5;
            }
            comprobar(barra_vida_enemigo);
        }
        disparos--; //contador interno de disparo de laseres

        if(nave.energia <= 1) {
            for(energia of energias){
                energia.innerHTML = 0;
            }
            terminar("<h1>Ya no tienes energia</h1>");
        
        } else {
            nave.energia = nave.energia -1;
            for(energia of energias){
             energia.innerHTML = nave.energia;
            }
        }
        
        //desabilitar el boton de disparar para tener que recargar
        if(disparos == 0) {
            document.getElementById("disparar").disabled = true; 
        }
    }

    if(div_pelea.style.display == "block") {
            if(barra_vida_enemigo.innerHTML == 0){
                cambiar_arma();
                recarga();
                div_pelea.style.display= "none";
                clearInterval(daño_const);
                daño_const = "";
                tesoro(planeta_en_pela);
                planeta_en_pela = "";
                ocultarTodasLasInterfaces(true);
            }
        }
    
}

//recarga de disparos
function recarga() {
    document.getElementById("disparar").disabled = false;
    disparos = 5;
}
