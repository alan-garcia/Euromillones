export const EuromillonesConfig = {
    totalNumeros: 50,
    totalEstrellas: 12,
    rangoNumeros: [1, 50] as [number, number],
    rangoEstrellas: [1, 12] as [number, number],
    numerosValidos: 5,
    estrellasValidas: 2,
}

export const limiteNumerosSeleccionados = (numeros: number[]) => {
    return numeros.length === EuromillonesConfig.numerosValidos;
}

export const limiteEstrellasSeleccionadas = (numeros: number[]) => {
    return numeros.length === EuromillonesConfig.estrellasValidas;
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
