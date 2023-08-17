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
const letrasUtilizadasContainer = document.getElementById('letrasUtilizadasContainer');
const letrasUtilizadasDisplay = document.getElementById('letrasUtilizadas');


const imagensForca = ['img/forca.png', 'img/forca01.png', 'img/forca02.png', 'img/forca03.png', 'img/forca04.png', 'img/forca05.png', 'img/forca06.png'];

let indiceJogadorAtual;
let jogadorAtual;
let palavraSecreta;
let letrasChutadas;
let chutesIncorretos;
let jogadorInimigo; 

iniciarJogoBotao.addEventListener('click', verificarNomesJogadores);
reiniciarBotao.addEventListener('click', reiniciarJogo);

// cria o popup que sobe caso não seja preenchido o nome dos jogadores
function showPopup(message) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add('fade-out'); // Adiciona a classe de fade-out
    setTimeout(() => {
      popup.remove();
    }, 200); // Remove o popup após a animação
  }, 1000);
}

function contemApenasLetras(texto) {
  return /^[A-Za-z]+$/.test(texto);
}


function verificarNomesJogadores() {
  const nomeJogador1 = jogador1Input.value.trim();
  const nomeJogador2 = jogador2Input.value.trim();
  
  
  if (!contemApenasLetras(nomeJogador1) || !contemApenasLetras(nomeJogador2)) {
    showPopup('Por favor, digite apenas letras nos nomes dos jogadores.');
    return;
  }

  iniciarJogo();
}



function iniciarJogo() {

    // Obtém os nomes dos jogadores e remove os espaços em branco ao redor

  const nomeJogador1 = jogador1Input.value.trim();
  const nomeJogador2 = jogador2Input.value.trim();

    // Verifica se algum dos nomes dos jogadores está vazio

  if (nomeJogador1 === '' || nomeJogador2 === '') {
    showPopup('Por favor, preencha os nomes dos dois jogadores para iniciar o jogo.');
    return;
  }

    
  // Define os jogadores e os randomiza para iniciar o jogo || cria o array para contabilizar as letras que foram chutadas

  const nomesJogadores = [jogador1Input.value, jogador2Input.value];
  indiceJogadorAtual = Math.floor(Math.random() * 2);
  jogadorAtual = nomesJogadores[indiceJogadorAtual];
  letrasChutadas = [];
  chutesIncorretos = 0;
  jogadorInimigo = nomesJogadores[(indiceJogadorAtual + 1) % nomesJogadores.length]; // Define o jogador inimigo
  

    // Atualiza o display com o nome do jogador atual e atualza as letras utilizadas

    jogadorAtualDisplay.textContent = jogadorAtual;
    atualizarLetrasUtilizadas();
    iniciarJogoBotao.style.display = 'none';
    jogador1Input.disabled = true;
    jogador2Input.disabled = true;

  
  // solicita a palavra secreta e cria o array de span para as letras
  palavraSecreta = prompt(`${jogadorInimigo}, insira a palavra secreta para ${jogadorAtual}:`).toUpperCase();
  exibicaoPalavra.innerHTML = palavraSecreta.split('').map(letra => `<span>${letrasChutadas.includes(letra) ? letra : '_'}</span>`).join('');

  palavraSecreta = palavraSecreta.trim();
  if (palavraSecreta === '') {
    showPopup('Por favor, escreva algo na palavra secreta, aperte F5 para iniciar novamente.');
    return;
  }
  if (!contemApenasLetras(palavraSecreta)) {
    showPopup('Por favor, digite apenas letras na palavra secreta, aperte F5 para iniciar novamente.');
    return;
  }



  atualizarForca();


  // cria o teclado na tela
  teclado.innerHTML = '';
  for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i);
    const botao = document.createElement('button');
    botao.textContent = letra;
    botao.addEventListener('click', () => fazerChute(letra));
    teclado.appendChild(botao);
  }

  containerJogo.classList.remove('escondido');
  containerResultado.classList.add('escondido');
}


function atualizarLetrasUtilizadas() {
  letrasUtilizadasDisplay.textContent = letrasChutadas.join(', ');

  // Verifica se alguma letra foi usada mais de uma vez
  const letrasRepetidas = letrasChutadas.filter((letra, index) => letrasChutadas.indexOf(letra) !== index);

  if (letrasRepetidas.length > 0) {
    showPopup(`As letras ${letrasRepetidas.join(', ')} foram usadas mais de uma vez!`);
  }
}
function fazerChute(letra) {

   // Verifica se a letra já foi chutada anteriormente
   if (letrasChutadas.includes(letra)) {
    showPopup(`Você já utilizou a letra "${letra}", tente outra.`);
    return;
  }
  // Atualiza a exibição das letras utilizadas

  if (!letrasChutadas.includes(letra)) {
    letrasChutadas.push(letra);

          // Incrementa a contagem de chutes incorretos e atualiza a exibição da forca
    if (!palavraSecreta.includes(letra)) {
      chutesIncorretos++;
      atualizarForca();
    }

         // Atualiza a exibição das letras utilizadas

    const letrasUtilizadasContainer = document.getElementById('letrasUtilizadasContainer');

    letrasUtilizadasContainer.textContent = 'Letras utilizadas: ' + letrasChutadas.join(', ');

     // Converte a palavra secreta em um array de letras e adiciona ao array se for correta

    const palavraArray = palavraSecreta.split('');

    const spansExibicaoPalavra = exibicaoPalavra.querySelectorAll('span');

    for (let i = 0; i < palavraArray.length; i++) {

      if (palavraArray[i] === letra) {

        spansExibicaoPalavra[i].textContent = letra;
        
      }
 
    }


        // Verifica se todas as letras da palavra foram adivinhadas corretamente ou se é um espaço e declara se venceu ou perdeu

        if (palavraArray.every(letra => letrasChutadas.includes(letra) || letra === ' ')) {
          finalizarJogo(jogadorAtual, true); // Passa true para indicar que o jogador venceu
        } else if (chutesIncorretos === 6) {
          finalizarJogo(nomesJogadores[indiceJogadorAtual ^ 1], false); // Passa false para indicar que o jogador perdeu
        }

    indiceJogadorAtual ^= 1; // alterna entre os jogadores

        // Atualiza o jogador atual com base no índice e exibe o nome no display

    jogadorAtual = nomesJogadores[indiceJogadorAtual];
    jogadorAtualDisplay.textContent = jogadorAtual;
  }
}
// atualiza a forca puxando as imagens declaradas
function atualizarForca() {
  forcaDisplay.style.backgroundImage = `url('${imagensForca[chutesIncorretos]}')`;
}
// Função para finalizar o jogo

function finalizarJogo(vencedor) {

// se a quantidade de chutes incorretos até finalizar a palavra for menor que 6 retorna o vencedor
  if (chutesIncorretos < 6) {
    textoResultado.textContent = `${vencedor} Acertou miseravi!`;
 } // se não perdeu
 else {
    textoResultado.textContent = 'EROOOOOOOOOOU!';
    vencedor = nomesJogadores[indiceJogadorAtual ^ 1];
  }

  containerJogo.classList.add('escondido');
  containerResultado.classList.remove('escondido');
}
// Função para reiniciar o jogo

function reiniciarJogo() {
  containerResultado.classList.add('escondido');
  iniciarJogoBotao.style.display = 'block';
  jogador1Input.disabled = false;
  jogador2Input.disabled = false;
}

// Array de nomes dos jogadores 

const nomesJogadores = [jogador1Input.value, jogador2Input.value];
