const casillas = document.querySelectorAll(".casilla");
const mensaje = document.getElementById("mensaje");
const turnoActual = document.getElementById("turnoActual");

const puntosX = document.getElementById("puntosX");
const puntosO = document.getElementById("puntosO");

const botonReiniciar = document.getElementById("reiniciar");
const botonReiniciarPuntos = document.getElementById("reiniciarPuntos");

let tablero = ["", "", "", "", "", "", "", "",];

let jugadorActual = "X";
let juegoActivo = true;

let marcadorX = 0;
let marcadorO = 0;

const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


/* JUGAR */

casillas.forEach((casilla) => {

    casilla.addEventListener("click", () => {

        const posicion = casilla.dataset.posicion;

        if (tablero[posicion] !== "" || !juegoActivo) {
            return;
        }

        tablero[posicion] = jugadorActual;

        casilla.textContent = jugadorActual;

        if (jugadorActual === "X") {
            casilla.classList.add("x");
        } else {
            casilla.classList.add("o");
        }

        comprobarResultado();

    });

});


/* COMPROBAR RESULTADO */

function comprobarResultado() {

    let ganador = false;
    let combinacionGanadora = null;

    for (let combinacion of combinacionesGanadoras) {

        const a = tablero[combinacion[0]];
        const b = tablero[combinacion[1]];
        const c = tablero[combinacion[2]];

        if (a !== "" && a === b && b === c) {

            ganador = true;
            combinacionGanadora = combinacion;

            break;
        }
    }


    if (ganador) {

        juegoActivo = false;

        combinacionGanadora.forEach(posicion => {
            casillas[posicion].classList.add("ganadora");
        });

        mensaje.textContent = `¡Ganó el jugador ${jugadorActual}!`;

        if (jugadorActual === "X") {

            marcadorX++;

            puntosX.textContent = marcadorX;

        } else {

            marcadorO++;

            puntosO.textContent = marcadorO;
        }

        return;
    }


    /* EMPATE */

    if (!tablero.includes("")) {

        juegoActivo = false;

        mensaje.textContent = "¡Empate! Nadie ganó.";

        return;
    }


    /* CAMBIAR TURNO */

    jugadorActual = jugadorActual === "X" ? "O" : "X";

    turnoActual.textContent = jugadorActual;

    if (jugadorActual === "X") {

        turnoActual.style.color = "#2196f3";

    } else {

        turnoActual.style.color = "#ff3b3b";
    }

}


/* REINICIAR PARTIDA */

botonReiniciar.addEventListener("click", () => {

    tablero = ["", "", "", "", "", "", "", ""];

    jugadorActual = "X";

    juegoActivo = true;

    turnoActual.textContent = "X";
    turnoActual.style.color = "#2196f3";

    mensaje.textContent = "¡Comienza el juego!";

    casillas.forEach(casilla => {

        casilla.textContent = "";

        casilla.classList.remove("x");
        casilla.classList.remove("o");
        casilla.classList.remove("ganadora");

    });

});


/* REINICIAR MARCADOR */

botonReiniciarPuntos.addEventListener("click", () => {

    marcadorX = 0;
    marcadorO = 0;

    puntosX.textContent = "0";
    puntosO.textContent = "0";

    mensaje.textContent = "Marcador reiniciado";

})
