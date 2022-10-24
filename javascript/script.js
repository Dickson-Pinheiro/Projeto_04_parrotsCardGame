let cardsLength = 0;
const containerCard = document.querySelector(".container-card");
const cards = ["./images/bobrossparrot.gif", "./images/explodyparrot.gif", "./images/fiestaparrot.gif", "./images/metalparrot.gif", "./images/revertitparrot.gif", "./images/tripletsparrot.gif", "./images/unicornparrot.gif"]
const cardsSelected = [];
let totalDeJogadas = 0;
let chosenCards = [];

function iniciarJogo(){
    while((cardsLength < 4) || (cardsLength%2 !== 0) || (cardsLength > 14)){
        cardsLength = Number(prompt("Com quantas cartas quer jogar?"))
    }
}

iniciarJogo()

function fimDeJogo(jogadas){
    alert(`Você ganhou em ${jogadas}!`)
    let continuar = prompt("Deseja reiniciar o jogo? [sim ou não]")
    const respostas = ["sim", "não"]
    while(!respostas.includes(continuar)){
        continuar = prompt("Deseja reiniciar o jogo? [sim ou não]");
    }
    if(continuar === "sim"){
        cardsLength = 0;
        totalDeJogadas = 0;
        iniciarJogo()
        selectCard()
        renderizarCards()
        addClickOnCard()
    }
}

function selectCard(){

    for(let i=0; i<cardsLength/2; i++){
        cardsSelected.push(cards[i])
    }

    cardsSelected.push(...cardsSelected)
    cardsSelected.sort(comparador)
}

selectCard()

function comparador(){ 
        return Math.random() - 0.5; 
}

function renderizarCards(){
    containerCard.innerHTML = ""
    cardsSelected.forEach( card => {
        containerCard.innerHTML+= `<div class="card" value=${card}></div>`;
    }
    )
}

renderizarCards()


function desvirarCarta(cards){
    cards.forEach(card => {
        card.classList.remove("rotation")
        card.innerHTML = ""
    })
}

function addClickOnCard(){
    const cardsRender = document.querySelectorAll(".card");
    cardsRender.forEach(card => {
        card.addEventListener("click", () => {
            totalDeJogadas++;
            if(!card.classList.contains("rotation")){
                card.classList.add("rotation")
                let value = card.getAttribute("value")
                card.innerHTML=`<img src="${value}"/>`
                chosenCards.push(card)
            }
    
            if(chosenCards.length === 2){
                if(chosenCards[0].getAttribute("value") === chosenCards[1].getAttribute("value")){
                   cardsSelected.pop()
                   cardsSelected.pop()
                   if(!cardsSelected.length){
                        setTimeout(fimDeJogo, 1000, totalDeJogadas)
                   }
                    chosenCards = [];
                } else {
                    setTimeout(desvirarCarta, 1000, chosenCards)
                    chosenCards = [];
                }
            }
    
        })
    })
}

addClickOnCard()

