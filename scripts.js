let quantidade;
let firstCard, secondCard;
let lock = false;
let contPontuacao=0;
let contjogadas=0;
let format;


// Cronometro


let minuto = 0;
let segundo = 0;

let tempo = 1000;
let cron;


function start() {
    cron = setInterval(() => { timer(); }, tempo);
}


function pause() {
    clearInterval(cron);
}


function stop() {
    clearInterval(cron);
    minuto = 0;
    segundo = 0;

    let zerar = document.querySelector(".timer");
    zerar.innerHTML = '00:00';
}


function timer() {
    segundo++; 

    if (segundo == 59) { 
        segundo = 0; 
        minuto++; 

        if (minuto == 59) { 
            minuto = 0;
           
        }
    }

   
   format =  (minuto < 10 ? '0' + minuto : minuto) + ':' + (segundo < 10 ? '0' + segundo : segundo);
    
   
   let resultado = document.querySelector(".timer");
   resultado.innerHTML = format;

    
    return format;
}

// Cronometro

function reseta(){
    [firstCard, secondCard, lock] = [null, null, false];
}

function remover(){
    lock = true;
    setTimeout( () => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        reseta();
    }, 1000)
   
}

function removeEvento(elemID) {
    elemID.onclick='';

}
function verificar(){
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    if(isMatch){
        removeEvento(firstCard);
        removeEvento(secondCard);
        contPontuacao += 1;
    }

    !isMatch ? remover() : reseta();
}


function flipCard(elemento){
    
    if(lock) return false;
    const lista = elemento.classList;
    lista.add("flip");
    if(!firstCard){
        firstCard = elemento;
        contjogadas += 1;
        return false;
    }
    if(elemento != firstCard){
        secondCard = elemento;
        contjogadas += 1;
        verificar();
    }

    
    if(contPontuacao === (quantidade/2)){
        if(minuto !== 0){alert(`Você ganhou em ${(contjogadas)} jogadas! Em ${minuto} minutos e ${segundo} segundos`);}
        else{alert(`Você ganhou em ${(contjogadas)} jogadas! Em ${segundo} segundos`);}
        pause();
        reiniciar();
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

function montaContainer(){
const container = document.querySelector(".container");

const images =  [
    "bobrossparrot.gif",
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "fiestaparrot.gif",
    "metalparrot.gif",
    "metalparrot.gif",
    "revertitparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif",
    "unicornparrot.gif"

];
const imagesRND = [];
for(let i = 0; i < quantidade; i++){
    imagesRND[i] = images[i];
}
 
imagesRND.sort(comparador);

let cartaHTML = "";

    for(let i = 0; i < quantidade; i++){
        
            cartaHTML += `
            <div class="memory-card" data-card="${imagesRND[i]}" onclick="flipCard(this)">
                <img class="front-face" src="imagens-p4/${imagesRND[i]}">
                <img class="back-face" src="imagens-p4/front.png">
            </div>
            `;
    }

    

container.innerHTML = cartaHTML;
start();
}


window.onload = function quantasCartas(){
    quantidade = prompt("Escolha quantas cartas voce quer jogar:");
    if((quantidade >= 4 && quantidade <= 14) && (quantidade % 2 === 0)){
       
        montaContainer();
            
            }
    else {
        alert("Número de cartas incompatível com o jogo.");
        quantasCartas();
       
    }
    
}

function quantasCartasReiniciar(){
    quantidade = prompt("Escolha quantas cartas voce quer jogar:");
    if((quantidade >= 4 && quantidade <= 14) && (quantidade % 2 === 0)){
       
        montaContainer();
            
            }
    else {
        alert("Número de cartas incompatível com o jogo.");
        quantasCartas();
       
    }
    
}


function reiniciar(){
    const resposta = prompt("Quer jogar novamente? Digite sim ou não");
    console.log(resposta);
    if( resposta === "sim"){
        contPontuacao = 0;
        contjogadas = 0;
        stop();
        quantasCartasReiniciar();
    }
    if( resposta === "não"){
        return 0;
    }
}

