import ehUmCPF from "./valida-cpf.js" 
import ehMaiorDeIdade from "./valida-idade.js"

const camposDoFormulario = document.querySelectorAll('[required]')
const formulario = document.querySelector('[data-formulario]')

formulario.addEventListener("submit", (evento) => { // Verifica se o formulário foi preenchido corretamente
  evento.preventDefault()
  const listaRespostas = { // Armazena as respostas do formulário
    "nome": evento.target.elements["nome"].value,
    "email": evento.target.elements["email"].value,
    "rg": evento.target.elements["rg"].value,
    "cpf": evento.target.elements["cpf"].value,
    "aniversario": evento.target.elements["aniversario"].value,
    "termos": evento.target.elements["termos"].value,
  }

  localStorage.setItem("cadastro", JSON.stringify(listaRespostas)) // Salva as respostas no localStorage

  window.location.href = "./abrir-conta-form-2.html" // Redireciona para a próxima página
})

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo)) // Verifica se o campo foi preenchido corretamente
  campo.addEventListener("invalid", (evento) => evento.preventDefault()) // Previne a mensagem de erro padrão do HTML
})

const tiposDeErros = [ // Tipos de erros que o campo pode ter
  "valueMissing", // Campo vazio
  "typeMismatch", // Tipo inválido
  "tooShort", // Tamanho menor que o mínimo
  "rangeUnderflow", // Valor menor que o mínimo
  "customError", // Erro customizado
  "patternMismatch", // Não corresponde ao padrão
  "rangeOverflow", // Valor maior que o máximo
  "stepMismatch", // Não corresponde ao passo
  "badInput" // Entrada inválida
]

const mensagens = { // Mensagens de erro que o campo pode ter
  nome: { // Mensagens de erro para o campo de nome
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válido.",
    tooShort: "Por favor, preencha um nome válido."
  },
  email: { // Mensagens de erro para o campo de email
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um email válido.",
    tooShort: "Por favor, preencha um email válido."
  },
  rg: { // Mensagens de erro para o campo de RG
    valueMissing: "O campo de RG não pode estar vazio.",
    patternMismatch: "Por favor, preencha um RG válido.",
    tooShort: "O campo de RG não tem caractéres suficientes."
  },
  cpf: { // Mensagens de erro para o campo de CPF
    valueMissing: 'O campo de CPF não pode estar vazio.',
    patternMismatch: "Por favor, preencha um CPF válido.",
    customError: "O CPF digitado não existe.",
    tooShort: "O campo de CPF não tem caractéres suficientes."
  },
  aniversario: { // Mensagens de erro para o campo de data de nascimento
    valueMissing: 'O campo de data de nascimento não pode estar vazio.',
    customError: 'Você deve ser maior que 18 anos para se cadastrar.'
  },
  termos: { // Mensagens de erro para o campo de termos
    valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
  }
}

function verificaCampo(campo) {
  let mensagem = ""
  campo.setCustomValidity('') // Limpa a mensagem de erro customizada

  if (campo.name == "cpf" && campo.value.length >= 11) { // Se o campo for o de CPF e tiver 11 caracteres

    ehUmCPF(campo) // Chama a função que verifica se o CPF é válido
    
  }
  if (campo.name == "aniversario" && campo.value != "") { // Se o campo for o de data de nascimento e não estiver vazio

    ehMaiorDeIdade(campo) // Chama a função que verifica se a pessoa é maior de idade

  }
  tiposDeErros.forEach(erro => { // Verifica se tem algum erro no campo

    if (campo.validity[erro]) {
      mensagem = mensagens[campo.name][erro] // Se tiver erro, pega a mensagem de erro correspondente
    }
  })
  
  const mensagemErro = campo.parentNode.querySelector('.mensagem-erro')
  const validadorDeInput = campo.checkValidity() // Se não tiver nenhum erro retorna TRUE e se tiver retorna FALSE

  if (!validadorDeInput) { // Se tiver erro exibe a mensagem de erro
      mensagemErro.textContent = mensagem

  } else { // Se não tiver erro, limpa a mensagem de erro
      mensagemErro.textContent = ""
  }
}