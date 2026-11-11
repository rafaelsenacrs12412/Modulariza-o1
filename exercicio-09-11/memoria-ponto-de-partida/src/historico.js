const CHAVE_HISTORICO = 'memoria-historico';
const MAXIMO_DE_PARTIDAS = 5;

export function obterHistorico() {
    const historico = localStorage.getItem(CHAVE_HISTORICO);

    if (historico === null) {
        return [];
    }

    const partidas = JSON.parse(historico);
    return Array.isArray(partidas) ? partidas : [];
}

export function salvarPartida(partida) {
    const historico = [partida, ...obterHistorico()].slice(0, MAXIMO_DE_PARTIDAS);
    localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historico));
    return historico;
}

export function formatarData(data) {
    const dataPartida = new Date(data);

    if (Number.isNaN(dataPartida.getTime())) {
        throw new RangeError('A data da partida é inválida.');
    }

    const partes = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23'
    }).formatToParts(dataPartida);
    const valores = Object.fromEntries(partes.map(({ type, value }) => [type, value]));

    return `${valores.day}/${valores.month}, ${valores.hour}:${valores.minute}`;
}
