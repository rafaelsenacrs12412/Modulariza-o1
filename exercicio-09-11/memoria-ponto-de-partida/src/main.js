import { temas } from './cartas.js';
import { criarBaralho, escolherSimbolos, verificarPar, verificarSeTerminou } from './jogo.js';
import { obterRecorde, salvarRecorde } from './recorde.js';
import { obterHistorico, salvarPartida } from './historico.js';
import { iniciarCronometro, pararCronometro, pausarCronometro, continuarCronometro } from './cronometro.js';
import {
    atualizarJogadas,
    atualizarPausa,
    atualizarRecorde,
    atualizarTempo,
    desenharTabuleiro,
    desvirarCartas,
    esconderFim,
    marcarPar,
    mostrarFim,
    mostrarHistorico,
    virarCarta
} from './tela.js';

let baralho = [];
let primeiraCarta = null;
let travado = false;
let jogadas = 0;
let paresEncontrados = 0;
let totalDePares = 0;
let pausado = false;
let comecou = false;
let terminou = false;

const NOMES_DOS_NIVEIS = { 6: 'Fácil', 8: 'Médio', 12: 'Difícil' };
const campoTema = document.querySelector('.campo-tema');
const campoNivel = document.querySelector('.campo-nivel');
const botaoPausar = document.querySelector('.botao-pausar');
const botaoRecomecar = document.querySelector('.botao-recomecar');
const botaoJogarDeNovo = document.querySelector('.botao-jogar-de-novo');

function mostrarHistoricoAtual() {
    mostrarHistorico(obterHistorico(), NOMES_DOS_NIVEIS);
}

function novaPartida() {
    pararCronometro();
    baralho = [];
    primeiraCarta = null;
    travado = false;
    jogadas = 0;
    paresEncontrados = 0;
    totalDePares = Number(campoNivel.value);
    pausado = false;
    comecou = false;
    terminou = false;

    const simbolos = escolherSimbolos(temas[campoTema.value], totalDePares);
    baralho = criarBaralho(simbolos);

    atualizarTempo(0);
    atualizarJogadas(0);
    atualizarRecorde(obterRecorde());
    atualizarPausa(false);
    esconderFim();
    botaoPausar.textContent = 'Pausar';
    desenharTabuleiro(baralho, escolherCarta);
}

function escolherCarta(posicao) {
    if (travado || pausado || terminou || posicao === primeiraCarta) {
        return;
    }

    if (!comecou) {
        comecou = true;
        iniciarCronometro(atualizarTempo);
    }

    virarCarta(posicao);

    if (primeiraCarta === null) {
        primeiraCarta = posicao;
        return;
    }

    const segundaCarta = posicao;
    jogadas += 1;
    atualizarJogadas(jogadas);

    if (verificarPar(baralho[primeiraCarta], baralho[segundaCarta])) {
        marcarPar(primeiraCarta, segundaCarta);
        paresEncontrados += 1;
        primeiraCarta = null;

        if (verificarSeTerminou(paresEncontrados, totalDePares)) {
            terminarPartida();
        }
        return;
    }

    travado = true;
    const cartaA = primeiraCarta;
    primeiraCarta = null;
    setTimeout(() => {
        desvirarCartas(cartaA, segundaCarta);
        travado = false;
    }, 900);
}

function terminarPartida() {
    terminou = true;
    pausado = false;
    const segundos = pararCronometro();
    const novoRecorde = salvarRecorde(segundos);
    const partida = {
        tema: campoTema.options[campoTema.selectedIndex].text,
        nivel: totalDePares,
        segundos,
        jogadas,
        data: new Date().toISOString()
    };

    salvarPartida(partida);
    atualizarRecorde(obterRecorde());
    atualizarPausa(false);
    mostrarFim(segundos, jogadas, novoRecorde);
    mostrarHistoricoAtual();
}

function alternarPausa() {
    if (terminou) {
        return;
    }

    pausado = !pausado;

    if (pausado) {
        pausarCronometro();
    } else if (comecou) {
        continuarCronometro();
    }

    botaoPausar.textContent = pausado ? 'Continuar' : 'Pausar';
    atualizarPausa(pausado);
}

campoTema.addEventListener('change', novaPartida);
campoNivel.addEventListener('change', novaPartida);
botaoPausar.addEventListener('click', alternarPausa);
botaoRecomecar.addEventListener('click', novaPartida);
botaoJogarDeNovo.addEventListener('click', novaPartida);

novaPartida();
mostrarHistoricoAtual();
