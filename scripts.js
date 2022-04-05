let quantidade;
let firstCard, secondCard;
let lock = false;
let contPontuacao=0;
let contjogadas=0;

function reseta(){
    [firstCard, secondCard, lock] = [null, null, false];
}

function remover(isMatch = false){
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
    contjogadas += 1;
    if(lock) return false;
    const lista = elemento.classList;
    lista.add("flip");
    if(!firstCard){
        firstCard = elemento;
        return false;
    }
    secondCard = elemento;

    verificar();
    if(contPontuacao === (quantidade/2)){
        alert(`Você ganhou em ${(contjogadas)} jogadas!`);
    }
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
 
imagesRND.sort(()=>{
    return 0.5 - Math.random();
});

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




