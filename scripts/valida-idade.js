export default function ehMaiorDeIdade(campo) {

    const dataNascimento = new Date(campo.value) // Cria um objeto Date com a data de nascimento
    const dataAtual = new Date() // Cria um objeto Date com a data atual
    let idade = dataAtual.getFullYear() - dataNascimento.getUTCFullYear() // Calcula a idade da pessoa

    if (dataAtual.getUTCMonth() < dataNascimento.getUTCMonth() || 
        (dataAtual.getUTCMonth() === dataNascimento.getUTCMonth() && dataAtual.getUTCDate() < dataNascimento.getUTCDate())) {  // Se a pessoa ainda não fez aniversário
        idade-- // Diminui 1 da idade
    }

    if(!(idade >= 18)){ 
        campo.setCustomValidity('Você deve ser maior que 18 anos para se cadastrar.') // Se a pessoa for menor de idade, mostra a mensagem de erro customizada
    }
    
    // Este formato adicional UTC é usado para evitar problemas com fusos horários. Pois o método getFullYear() retorna o ano local, enquanto o getUTCFullYear() retorna o ano UTC. E o método getMonth() retorna o mês local, enquanto o getUTCMonth() retorna o mês UTC. O mesmo vale para o getDay() e getUTCDate().
}