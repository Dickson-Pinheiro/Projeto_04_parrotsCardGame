let cardsLength = 0;
const cards = ["./images/bobrossparrot.gif", "./images/explodyparrot.gif", "./images/fiestaparrot.gif", "./images/metalparrot.gif", "./images/revertitparrot.gif", "./images/tripletsparrot.gif", "./images/unicornparrot.gif"]
const containerCard = document.querySelector(".container-card");
const cardsSelected = [];
let totalDeJogadas = 0;
let paresEncontrados = 0;
let chosenCards = [];

while((cardsLength < 4) || (cardsLength%2 !== 0) || (cardsLength > 12)){
    cardsLength = Number(prompt("Com quantas cartas quer jogar?"))
}

let qtdParrot = cardsLength/2

function selectCard(){

    for(let i=0; i<qtdParrot; i++){
        cardsSelected.push(cards[i])
    }

    cardsSelected.push(...cardsSelected)
    cardsSelected.sort(comparador)
}

function comparador(){ 
        return Math.random() - 0.5; 
}

selectCard()


cardsSelected.forEach( card => {
        containerCard.innerHTML+= `<div class="card" value=${card}></div>`;
    }
)

function desvirarCarta(cards){
    cards.forEach(card => {
        card.classList.remove("rotation")
        card.innerHTML = ""
        chosenCards = [];
    })
}

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
                paresEncontrados++;
                if(paresEncontrados === qtdParrot){
                alert(`Você ganhou em ${totalDeJogadas}!`)
                }
                chosenCards = [];
            } else {
                setTimeout(desvirarCarta, 2000, chosenCards)
            }
        }

    })
})


