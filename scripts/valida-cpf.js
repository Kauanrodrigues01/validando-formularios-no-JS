export default function ehUmCPF(campo) {
    const cpf = campo.value.replace(/\.|-/g, "") // Remove os pontos e traços do CPF para facilitar a validação, deixando apenas os números

    if (validaNumerosRepetidos(cpf) || cpf.length != 11 || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) { // Se o CPF for inválido
        campo.setCustomValidity('O CPF digitado não existe.') // Se o CPF for inválido, mostra a mensagem de erro customizada
    }
}

function validaNumerosRepetidos(cpf) { // Verifica se o CPF tem todos os números iguais
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return numerosRepetidos.includes(cpf)
}

function validaPrimeiroDigito(cpf) { // Verifica se o primeiro dígito verificador do CPF é válido
    let soma = 0
    let multiplicador = 10

    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * multiplicador
        multiplicador--
    }

    soma = (soma * 10) % 11

    if (soma === 10 || soma === 11) {
        soma = 0
    }

    return soma != parseInt(cpf[9])
}

function validaSegundoDigito(cpf) { // Verifica se o segundo dígito verificador do CPF é válido
    let soma = 0
    let multiplicador = 11

    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * multiplicador
        multiplicador--
    }

    soma = (soma * 10) % 11

    if (soma === 10 || soma === 11) {
        soma = 0
    }

    return soma != parseInt(cpf[10])
}