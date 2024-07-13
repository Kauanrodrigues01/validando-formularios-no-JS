export default function ehMaiorDeIdade(campo) {
    const dataNascimento = new Date(campo.value);
    const dataAtual = new Date();
    let idade = dataAtual.getFullYear() - dataNascimento.getUTCFullYear();

    if (dataAtual.getUTCMonth() < dataNascimento.getUTCMonth() || 
        (dataAtual.getUTCMonth() === dataNascimento.getUTCMonth() && dataAtual.getUTCDate() < dataNascimento.getUTCDate())) {
        idade--
    }

    if(!(idade >= 18)){
        campo.setCustomValidity('Você deve ser maior que 18 anos para se cadastrar.')
    }
    
    // Este formato adicional UTC é usado para evitar problemas com fusos horários. Pois o método getFullYear() retorna o ano local, enquanto o getUTCFullYear() retorna o ano UTC. E o método getMonth() retorna o mês local, enquanto o getUTCMonth() retorna o mês UTC. O mesmo vale para o getDay() e getUTCDate().
}
