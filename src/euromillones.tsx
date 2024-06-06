export enum Casillas {
    NUMEROS = 50,
    ESTRELLAS = 12
}

export enum LimiteCasillasValidas {
    NUMEROS = 5,
    ESTRELLAS = 2
}

export const limiteNumerosSeleccionados = (numeros: number[]) => {
    return numeros.length === LimiteCasillasValidas.NUMEROS;
}

export const limiteEstrellasSeleccionadas = (numeros: number[]) => {
    return numeros.length === LimiteCasillasValidas.ESTRELLAS;
}

export const getNumerosGanadores = (numeroMaximo: number, numeroLimite: number) => {
    const numerosPosibles = [];

    for (let i = 1; i <= numeroMaximo; i++) {
      numerosPosibles.push(i);
    }

    for (let i = numerosPosibles.length - 1; i > 0; i--) {
      const numero: number = Math.floor(Math.random() * (i + 1));
      [numerosPosibles[i], numerosPosibles[numero]] = [numerosPosibles[numero], numerosPosibles[i]];
    }

    return numerosPosibles.slice(0, numeroLimite);
}

export const tablaPremios = [
    { categoria: '1', aciertos: '5 + 2', importe: 'To the moon 🚀' },
    { categoria: '2', aciertos: '5 + 1', importe: '461.186,22 €' },
    { categoria: '3', aciertos: '5 + 0', importe: '21.557,46 €' },
    { categoria: '4', aciertos: '4 + 2', importe: '1.017,37 €' },
    { categoria: '5', aciertos: '4 + 1', importe: '138,36 €' },
    { categoria: '6', aciertos: '4 + 0', importe: '51,72 €' },
    { categoria: '7', aciertos: '3 + 2', importe: '49,99 €' },
    { categoria: '8', aciertos: '2 + 2', importe: '11,35 €' },
    { categoria: '9', aciertos: '3 + 1', importe: '11,15 €' },
    { categoria: '10', aciertos: '3 + 0', importe: '10,38 €' },
    { categoria: '11', aciertos: '1 + 2', importe: '5,27 €' },
    { categoria: '12', aciertos: '2 + 1', importe: '5,03 €' },
    { categoria: '13', aciertos: '2 + 0', importe: '4,14 €' },
];
