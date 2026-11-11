import { formatarData } from './historico.js';
import { formatarTempo } from './cronometro.js';

const tabuleiro = document.querySelector('.tabuleiro');
const textoTempo = document.querySelector('.tempo');
const textoJogadas = document.querySelector('.jogadas');
const textoRecorde = document.querySelector('.recorde');
const telaFim = document.querySelector('.fim');
const textoFimTempo = document.querySelector('.fim-tempo');
const textoFimJogadas = document.querySelector('.fim-jogadas');
const avisoNovoRecorde = document.querySelector('.novo-recorde');
const textoHistoricoVazio = document.querySelector('.historico-vazio');
const listaHistorico = document.querySelector('.lista-historico');

export function desenharTabuleiro(baralho, aoEscolherCarta) {
    tabuleiro.replaceChildren();

    baralho.forEach((simbolo, posicao) => {
        const carta = document.createElement('button');
        carta.type = 'button';
        carta.className = 'carta';
        carta.setAttribute('aria-label', `Carta ${posicao + 1}, fechada`);
        carta.innerHTML = `
            <span class="carta-interno">
                <span class="carta-frente" aria-hidden="true">?</span>
                <span class="carta-verso" aria-hidden="true">${simbolo}</span>
            </span>
        `;
        carta.addEventListener('click', () => aoEscolherCarta(posicao));
        tabuleiro.append(carta);
    });

    tabuleiro.classList.toggle('nivel-dificil', baralho.length === 24);
}

export function virarCarta(posicao) {
    const carta = tabuleiro.children[posicao];
    carta.classList.add('virada');
    carta.setAttribute('aria-label', `Carta ${posicao + 1}, ${carta.querySelector('.carta-verso').textContent}`);
}

export function desvirarCartas(posicaoA, posicaoB) {
    [posicaoA, posicaoB].forEach((posicao) => {
        const carta = tabuleiro.children[posicao];
        carta.classList.remove('virada');
        carta.setAttribute('aria-label', `Carta ${posicao + 1}, fechada`);
    });
}

export function marcarPar(posicaoA, posicaoB) {
    [posicaoA, posicaoB].forEach((posicao) => {
        const carta = tabuleiro.children[posicao];
        carta.classList.add('encontrada');
        carta.disabled = true;
        carta.setAttribute('aria-label', `Carta ${posicao + 1}, par encontrado`);
    });
}

export function atualizarTempo(segundos) {
    textoTempo.textContent = formatarTempo(segundos);
}

export function atualizarJogadas(jogadas) {
    textoJogadas.textContent = String(jogadas);
}

export function atualizarRecorde(segundos) {
    textoRecorde.textContent = segundos === null ? '—' : formatarTempo(segundos);
}

export function mostrarFim(segundos, jogadas, novoRecorde) {
    textoFimTempo.textContent = formatarTempo(segundos);
    textoFimJogadas.textContent = String(jogadas);
    avisoNovoRecorde.classList.toggle('escondida', !novoRecorde);
    telaFim.classList.remove('escondida');
}

export function esconderFim() {
    telaFim.classList.add('escondida');
}

export function atualizarPausa(pausado) {
    tabuleiro.classList.toggle('pausado', pausado);
}

export function mostrarHistorico(partidas, nomesDosNiveis) {
    listaHistorico.replaceChildren();
    textoHistoricoVazio.classList.toggle('escondida', partidas.length > 0);

    partidas.forEach((partida) => {
        const item = document.createElement('li');
        const nomeDoNivel = nomesDosNiveis[partida.nivel] ?? `${partida.nivel} pares`;
        item.textContent = `${formatarData(partida.data)} · ${partida.tema} · ${nomeDoNivel} · ${formatarTempo(partida.segundos)} · ${partida.jogadas} jogadas`;
        listaHistorico.append(item);
    });
}
