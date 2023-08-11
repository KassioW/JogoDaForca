const tecnologias = ["sistemas operacionais", 
"probabilidade e estatistica", 
"logica de programacao", 
"legislacao para internet", 
"arquitetura de computadores", 
"algoritmos e programacao estruturada", 
"metodologia da pesquisa cientifica e tecnologica", 
"interacao humano computador", 
"gestao e seguranca em aplicacoes web", 
"ferramentas de producao para web", 
"estrutura de dados", 
"engenharia de software", 
"atividade curricular de extensao", 
"testes de software", 
"redes de computadores", 
"programacao para web", 
"programacao orientada a objetos", 
"banco de dados"];

const palavraSecreta =
  tecnologias[Math.floor(Math.random() * tecnologias.length)];
const letrasErradas = [];
const letrasCorretas = [];

document.addEventListener("keydown", (evento) => {
  const codigo = evento.keyCode; // 65 - 90 (intervalo)
  if (isLetra(codigo)) {
    const letra = evento.key.toLowerCase();
    if (letrasErradas.includes(letra)) {
      mostrarAvisoLetraRepetida();
    } else {
      if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
      } else {
        letrasErradas.push(letra);
      }
    }
    atualizarJogo();
  }
});

function atualizarJogo() {
  mostrarLetrasErradas();
  mostrarLetrasCertas();
  desenharForca();
  checarJogo();
}

function mostrarLetrasErradas() {
  const div = document.querySelector(".letras-erradas-container");
  div.innerHTML = "<h3>Letras erradas</h3>";
  letrasErradas.forEach((letra) => {
    div.innerHTML += `<span>${letra}</span>`;
  });
}

function mostrarLetrasCertas() {
    const container = document.querySelector(".palavra-secreta-container");
    container.innerHTML = "";
    palavraSecreta.split("").forEach((letra) => {
      if (letrasCorretas.includes(letra) || letra === " ") {
        container.innerHTML += `<span>${letra}</span>`;
      } else {
        container.innerHTML += `<span>_</span>`;
      }
    });
  }

function checarJogo() {
  let mensagem = "";
  const container = document.querySelector(".palavra-secreta-container");
  const partesCorpo = document.querySelectorAll(".forca-parte");

  if (letrasErradas.length === partesCorpo.length) {
    mensagem = "VACILOU!!! TU PERDEU!!!";
  }

  if (palavraSecreta === container.innerText) {
    mensagem = "PARABUANSSS!!! TU GANHOU!!";
  }

  if (mensagem) {
    document.querySelector("#mensagem").innerHTML = mensagem;
    document.querySelector(".popup-container").style.display = "flex";
  }
}

function desenharForca() {
  const partesCorpo = document.querySelectorAll(".forca-parte");
  for (let i = 0; i < letrasErradas.length; i++) {
    partesCorpo[i].style.display = "block";
  }
}

function mostrarAvisoLetraRepetida() {
  const aviso = document.querySelector(".aviso-palavra-repetida");
  aviso.classList.add("show");
  setTimeout(() => {
    aviso.classList.remove("show");
  }, 1000);
}

function isLetra(codigo) {
    // Verifica se é uma letra maiúscula (65 a 90) ou minúscula (97 a 122)
  return (codigo >= 65 && codigo <= 90) || (codigo >= 97 && codigo <= 122);
}

function reiniciarJogo() {
  window.location.reload();
}
