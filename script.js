const jogador1Input = document.getElementById('jogador1');
const jogador2Input = document.getElementById('jogador2');
const iniciarJogoBotao = document.getElementById('iniciarJogo');
const jogadorAtualDisplay = document.getElementById('jogadorAtual');
const forcaDisplay = document.getElementById('forca');
const exibicaoPalavra = document.getElementById('exibicaoPalavra');
const teclado = document.getElementById('teclado');
const containerResultado = document.getElementById('containerResultado');
const textoResultado = document.getElementById('textoResultado');
const reiniciarBotao = document.getElementById('reiniciarJogo');

const imagensForca = ['img/forca.png', 'img/forca01.png', 'img/forca02.png', 'img/forca03.png', 'img/forca04.png', 'img/forca05.png', 'img/forca06.png'];

let indiceJogadorAtual;
let jogadorAtual;
let palavraSecreta;
let letrasChutadas;
let chutesIncorretos;

iniciarJogoBotao.addEventListener('click', iniciarJogo);
reiniciarBotao.addEventListener('click', reiniciarJogo);

function iniciarJogo() {
  const nomesJogadores = [jogador1Input.value, jogador2Input.value];
  indiceJogadorAtual = Math.floor(Math.random() * 2);
  jogadorAtual = nomesJogadores[indiceJogadorAtual];
  letrasChutadas = [];
  chutesIncorretos = 0;

  jogadorAtualDisplay.textContent = jogadorAtual;
  iniciarJogoBotao.style.display = 'none';
  jogador1Input.disabled = true;
  jogador2Input.disabled = true;

  palavraSecreta = prompt(`${jogadorAtual}, digite uma palavra secreta:`).toUpperCase();
  exibicaoPalavra.innerHTML = palavraSecreta.split('').map(letra => `<span>${letrasChutadas.includes(letra) ? letra : '_'}</span>`).join('');

  atualizarForca();

  teclado.innerHTML = '';
  for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i);
    const botao = document.createElement('button');
    botao.textContent = letra;
    botao.addEventListener('click', () => fazerChute(letra));
    teclado.appendChild(botao);
  }

  containerJogo.classList.remove('escondido');
}

function fazerChute(letra) {
  if (!letrasChutadas.includes(letra)) {
    letrasChutadas.push(letra);

    if (!palavraSecreta.includes(letra)) {
      chutesIncorretos++;
      atualizarForca();
    }

    const palavraArray = palavraSecreta.split('');
    const spansExibicaoPalavra = exibicaoPalavra.querySelectorAll('span');
    for (let i = 0; i < palavraArray.length; i++) {
      if (palavraArray[i] === letra) {
        spansExibicaoPalavra[i].textContent = letra;
      }
    }

    if (palavraArray.every(letra => letrasChutadas.includes(letra) || letra === ' ')) {
      finalizarJogo(jogadorAtual);
    } else if (chutesIncorretos === 6) {
      finalizarJogo(nomesJogadores[indiceJogadorAtual ^ 1]);
    }

    indiceJogadorAtual ^= 1;
    jogadorAtual = nomesJogadores[indiceJogadorAtual];
    jogadorAtualDisplay.textContent = jogadorAtual;
  }
}

function atualizarForca() {
  forcaDisplay.style.backgroundImage = `url('${imagensForca[chutesIncorretos]}')`;
}

function finalizarJogo(vencedor) {
  textoResultado.textContent = vencedor ? `${vencedor} venceu!` : 'Empate!';
  containerJogo.classList.add('escondido');
  containerResultado.classList.remove('escondido');
}

function reiniciarJogo() {
  containerResultado.classList.add('escondido');
  iniciarJogoBotao.style.display = 'block';
  jogador1Input.disabled = false;
  jogador2Input.disabled = false;
}

const nomesJogadores = [jogador1Input.value, jogador2Input.value];
