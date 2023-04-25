var naveEspacial = document.getElementById("naveEspacial");
var pantallaSpaceInvaders = document.getElementById("pantallaSpaceInvaders");

var mapaNavesEnemigas = [
    [1, 1, 1, 1],
    [1, 1, 1, 1]
];

window.addEventListener("keydown", (e) => {
    var left = parseInt(window.getComputedStyle(naveEspacial).getPropertyValue("left")); // Para mover la nave espacial

    console.log(naveEspacial.style.left);
    if ((e.key == "A" || e.key == 'a') && left > 0) {
        naveEspacial.style.left = left - 10 + "px";
    }
    else if ( (e.key == 'D' || e.key == 'd') && left <= 450 ) {
        naveEspacial.style.left = left + 10 + "px";
    }

    if  (e.key == "ArrowUp" || e.keyCode == 32) {
        var bala = document.createElement("div");
        bala.classList.add("balas");
        pantallaSpaceInvaders.appendChild(bala);

        var movimientoBala = setInterval( () => {

            // Condiccion de colision 
            var navesEnemigas = document.getElementsByClassName("navesEnemigas");

            for (var i = 0; i < navesEnemigas.length; i++) {
                var naveEnemiga = navesEnemigas[i];

                var naveEnemigaBound = naveEnemiga.getBoundingClientRect();
                var balaBound = bala.getBoundingClientRect();

                //Condition to check whether the rock/alien and the bullet are at the same position..!
                //If so,then we have to destroy that rock

                if (balaBound.left >= naveEnemigaBound.left && balaBound.right <= naveEnemigaBound.right && balaBound.top <= naveEnemigaBound.top &&  balaBound.bottom <= naveEnemigaBound.bottom) {
                    naveEnemiga.parentElement.removeChild(naveEnemiga); //Just removing that particular rock;

                    // Score
                    document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML ) + 1; 
                }
            }

            var balaBottom = parseInt(window.getComputedStyle(bala).getPropertyValue("bottom")); 

            // Parar las balas fuera de la pantalla del juego
            if (balaBottom >= 500) {
                clearInterval(movimientoBala);
            }

            bala.style.left = left  + "px"; // La bala siempre va a estar en la parte de arriba de la nave
            bala.style.bottom = balaBottom + 3 + "px";
        }, 50);
    }
});





//ESTE ES EL QUE ME INTERESA
/*var generateNavesEnemigas = setInterval( () => {
    var tipoNaveEnemiga = "";
    for (var filas = 0; filas < mapaNavesEnemigas.length; filas++) {
        for (var columnas = 1; columnas <= mapaNavesEnemigas[filas].length; columnas++) {

            var naveEnemiga = document.createElement("div"); // Nos estamos creando un elemento div para crear las naves enemigas
            naveEnemiga.classList.add("navesEnemigas");
            // Coger la parte izquierda de la nave enemiga para ponerlo en una posicion random
            var naveEnemigaLeft = parseInt(window.getComputedStyle(naveEspacial).getPropertyValue("left"));

            naveEnemiga.style.left = Math.floor( 50 + 50) + "px";

            console.log(naveEnemiga, "\n", "y el tipo es: ", typeof(naveEnemiga));

            tipoNaveEnemiga = `Imagenes/enemigo${mapaNavesEnemigas[filas][columnas]}.png`;
            naveEnemiga.getElementById("navesEnemigas"); imagen.style.backgroundImage = `url(${tipoNaveEnemiga})`;
            

            pantallaSpaceInvaders.appendChild(naveEnemiga);

            var nombreIdDiv = `navesEnemigas${(filas + columnas)}`;

            console.log(nombreIdDiv)

            var currentDiv = document.getElementById(nombreIdDiv);
            document.body.insertBefore(naveEnemiga, currentDiv);

            console.log("Hola", document.getElementById("navesEnemigas3"))
        }
    }
}, 15);*/


/*
https://developer.mozilla.org/es/docs/Web/API/Document/createElement
Mirarme esto bien porque debo utilizarlo

https://www.youtube.com/watch?v=mwl95yvl-n0
el codigo viene de aqui
*/


var generateNavesEnemigas = setInterval( () => {
    var naveEnemiga = document.createElement("div"); // Nos estamos creando un elemento div para crear las naves enemigas
    naveEnemiga.classList.add("navesEnemigas");

    // Coger la parte izquierda de la nave enemiga para ponerlo en una posicion random
    var naveEnemigaLeft = parseInt(window.getComputedStyle(naveEnemiga).getPropertyValue("left"));

    // Generar un valor entre 0 y 450 -> tamaño de la pantalla menos la posicion de la nave (esto voy a cambiarlo)
    naveEnemiga.style.left = Math.floor(Math.random()*450) + "px";

    pantallaSpaceInvaders.appendChild(naveEnemiga);
}, 1500);


var moverNavesEnemigas = setInterval( () => {
    var navesEnemigas = document.getElementsByClassName("navesEnemigas");

    if (navesEnemigas != undefined) {
        for (var i = 0; i < navesEnemigas.length; i++) {
            //Now I have to increase the top of each rock,so that the rocks can move downwards..
            var naveEnemiga = navesEnemigas[i]; //getting each rock
            var naveEnemigaTop = parseInt(window.getComputedStyle(naveEnemiga).getPropertyValue("top"));

            naveEnemiga.style.top = naveEnemigaTop + 1 + "px";
        }
    }
}, 450)







/*var imagenesNavesEnemigas = [ [1, 1, 1, 1, 1, 1, 1, 1], [2, 2, 2, 2, 2, 2, 2, 2], [3, 3, 3, 3, 3, 3, 3, 3] ];
function iniciarJuego() {
    inicializarEnemigos();
}

function inicializarEnemigos () {
    
}

function makeImage() {
    imagenesNavesEnemigas.forEach( (numeroEnemigo, indice) => {
        const idElemento = `imagenEnemigo${indice}`;
        var img = document.createElement(idElemento);
        img.src = "Imagenes/enemigo1.png";
        //img.src = imagenesNavesEnemigas[indice];
        document.getElementById('content').appendChild(img);
        

        console.log(typeof(document.getElementById('content').appendChild(img)), "         ", idElemento);
    })
}

//8 x 3 los enemigos

function eliminarImagen() {
    document.getElementById("imagen").outerHTML = "";
    //console.log(elemento);
}*/