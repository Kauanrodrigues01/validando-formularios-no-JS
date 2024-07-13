const botaoIniciarCamera = document.querySelector('[data-video-botao]')
const campoCamera = document.querySelector('[data-camera]')
const video = document.querySelector('[data-video]')
const botaoTirarFoto = document.querySelector('[data-tirar-foto]')
const canvas = document.querySelector('[data-video-canvas]')
const campoMensagem = document.querySelector('[data-mensagem]')
const botaoEnviarFoto = document.querySelector('[data-enviar]')

let imagemURL = ""

botaoIniciarCamera.addEventListener("click", async () => {
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false }) // Função para iniciar a câmera

    botaoIniciarCamera.style.display = "none" 
    campoCamera.style.display =  'block'

    video.srcObject = iniciarVideo // Atribui o vídeo ao iniciarVideo
})

botaoTirarFoto.addEventListener('click', () => {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height) // Desenha a imagem no canvas
    
    imagemURL = canvas.toDataURL('image/jpeg') // Converte a imagem para base64 e atribui a imagemURL
    campoCamera.style.display = 'none'
    campoMensagem.style.display = 'block'
})

botaoEnviarFoto.addEventListener('click', () => {
    const receberDadosExistentes = localStorage.getItem('cadastro')
    const converteRetorno = JSON.parse(receberDadosExistentes)

    converteRetorno.imagem = imagemURL

    localStorage.setItem('cadastro', JSON.stringify(converteRetorno))

    window.location.href = './abrir-conta-form-3.html'
})