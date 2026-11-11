function embaralhar(itens) {
    const resultado = [...itens];

    for (let indice = resultado.length - 1; indice > 0; indice -= 1) {
        const outroIndice = Math.floor(Math.random() * (indice + 1));
        [resultado[indice], resultado[outroIndice]] = [resultado[outroIndice], resultado[indice]];
    }

    return resultado;
}

export function escolherSimbolos(simbolos, quantidade) {
    return embaralhar(simbolos).slice(0, quantidade);
}

export function criarBaralho(simbolos) {
    return embaralhar([...simbolos, ...simbolos]);
}

export function verificarPar(cartaA, cartaB) {
    return cartaA === cartaB;
}

export function verificarSeTerminou(paresEncontrados, totalDePares) {
    return paresEncontrados === totalDePares;
}
