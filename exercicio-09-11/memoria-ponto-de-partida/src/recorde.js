const CHAVE_RECORDE = 'memoria-recorde';

export function obterRecorde() {
    const recorde = localStorage.getItem(CHAVE_RECORDE);

    if (recorde === null) {
        return null;
    }

    const segundos = Number(recorde);
    return Number.isFinite(segundos) ? segundos : null;
}

export function salvarRecorde(segundos) {
    const recordeAtual = obterRecorde();

    if (recordeAtual !== null && recordeAtual <= segundos) {
        return false;
    }

    localStorage.setItem(CHAVE_RECORDE, String(segundos));
    return true;
}
