let intervalo = null;
let segundos = 0;
let aoPassarUmSegundo = null;

function passarUmSegundo() {
    segundos += 1;
    aoPassarUmSegundo(segundos);
}

function iniciarIntervalo() {
    if (intervalo === null) {
        intervalo = setInterval(passarUmSegundo, 1000);
    }
}

export function iniciarCronometro(callback) {
    pararCronometro();
    segundos = 0;
    aoPassarUmSegundo = callback;
    aoPassarUmSegundo(segundos);
    iniciarIntervalo();
}

export function pararCronometro() {
    if (intervalo !== null) {
        clearInterval(intervalo);
        intervalo = null;
    }

    return segundos;
}

export function pausarCronometro() {
    if (intervalo !== null) {
        clearInterval(intervalo);
        intervalo = null;
    }
}

export function continuarCronometro() {
    if (aoPassarUmSegundo !== null) {
        iniciarIntervalo();
    }
}

export function formatarTempo(quantidadeDeSegundos) {
    const minutos = Math.floor(quantidadeDeSegundos / 60);
    const segundosRestantes = quantidadeDeSegundos % 60;
    return `${minutos}:${String(segundosRestantes).padStart(2, '0')}`;
}
