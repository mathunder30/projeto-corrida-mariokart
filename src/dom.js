const player1 = {
    nome : "Mario",
    velocidade : 4,
    manobrabildiade : 3,
    poder : 3,
    pontos : 0
}
const player2 = {
    nome : "Luigi",
    velocidade : 3,
    manobrabildiade : 4,
    poder : 4,
    pontos : 0
}
const player3 = {
    nome : "Peach",
    velocidade : 3,
    manobrabildiade : 4,
    poder : 2,
    pontos : 0
}
const player4 = {
    nome : "Yoshi",
    velocidade : 2,
    manobrabildiade : 4,
    poder : 3,
    pontos : 0
}
const player5 = {
    nome : "Bowser",
    velocidade : 5,
    manobrabildiade : 2,
    poder : 5,
    pontos : 0
}
const player6 = {
    nome : "Donkey Kong",
    velocidade : 2,
    manobrabildiade : 2,
    poder : 5,
    pontos : 0
}

async function RolarDados() {
    return Math.floor(Math.random() * 6) +1;
}

async function getBlocosEscolhidos() {
   let radom = Math.random();
   let retornar;
   
   switch(true){
    case radom < 0.33:
        return retornar = "RETA";
        break;
    case radom < 0.66:
        return retornar = "CURVA";
        break;
    default:
        return retornar = "CONFRONTO";
   }
}

// manipulando o evento ao clicar poder executar as funções MotorPrincipal() e DeclararVencedor()
document.getElementById('start').addEventListener('click', async()=>{
    await MotorPrincipal(player1, player2);
    await DeclararVencedor(player1, player2);
});

//ao cliclar em recomeçar, faço que o jogo seja reiniciado sem precisar de ficar recarregando a pagina
document.getElementById('restart').addEventListener('click', async() =>{
    document.getElementById('log').innerHTML = "";
    player1.pontos = 0;
    player2.pontos = 0;
    document.getElementById('score1').innerHTML = player1.pontos;
    document.getElementById('score2').innerHTML = player2.pontos;
});

// função que mostra o resultado da contagem.
async function logRollResult(caracteristicaNome, bloco, resultado, atributo) {
    const logDiv = document.getElementById('log');
    logDiv.innerHTML += `<p>${caracteristicaNome} 🎲 rolou um dado de ${bloco}: ${resultado} + ${atributo} = ${resultado + atributo}</p>`;
    logDiv.scrollTop = logDiv.scrollHeight;

    // criei uma condição parar limirar a quantidade de mensagens dentro do log
    const logs = logDiv.querySelectorAll('p, h3');
    if(logs.length > 50) logs[0].remove();
    
}

//função onde a magica acontece
// ela recebera as funções getBlocosEscolhidos() para escolher a forma da corrida e função RolarDados(). o resultado recebe essa função para fazer o calculo. 
async function MotorPrincipal(p1, p2) {
    for(let round = 1; round <=5; round++){

        const logDiv = document.getElementById("log");
        logDiv.innerHTML += `<h3> 🏁 Rodada ${round}</h3>`;

        let bloco = await getBlocosEscolhidos();
        logDiv.innerHTML += `<p>Bloco: ${bloco}</p>`;

        let resultado1 = await RolarDados();
        let resultado2 = await RolarDados();

        let TotalTesteHab1 = 0;
        let TotalTesteHab2 = 0;

        if(bloco === "RETA"){
            TotalTesteHab1 = resultado1 + p1.velocidade;
            TotalTesteHab2 = resultado2 + p2.velocidade;

            await logRollResult(p1.nome, "velocidade", resultado1, p1.velocidade);
            await logRollResult(p2.nome, "velocidade", resultado2, p2.velocidade);

        } else if (bloco === "CURVA"){
            TotalTesteHab1 = resultado1 + p1.manobrabildiade;
            TotalTesteHab2 = resultado2 + p2.manobrabildiade;

            await logRollResult(p1.nome, "manobrabilidade", resultado1, p1.manobrabildiade);
            await logRollResult(p2.nome, "manobrabilidade", resultado2, p2.manobrabildiade);

        } else if (bloco === "CONFRONTO"){

            logDiv.innerHTML += `<p>${p1.nome} confrontou 🥊 com ${p2.nome}</p>`;

            await logRollResult(p1.nome, "poder", resultado1, p1.poder);
            await logRollResult(p2.nome, "poder", resultado2, p2.poder);


            if(resultado1 + p1.poder > resultado2 + p2.poder){
                if(p2.pontos > 0) p2.pontos--;
                logDiv.innerHTML += `<p>${p1.nome} venceu o confronto! 😎 ${p2.nome} perdeu 1 ponto! </p>`;

            } else if(resultado2 + p2.poder > resultado1 + p1.poder){
                if(p1.pontos > 0) p1.pontos--;
                logDiv.innerHTML += `<p>${p2.nome} venceu o confronto! 😎 ${p1.nome} perdeu 1 ponto! </p>`;
            }
        }

        if (TotalTesteHab1 > TotalTesteHab2){
            logDiv.innerHTML += `<p> ${p1.nome} marcou um ponto! </p>`;
            p1.pontos++;
        } else if(TotalTesteHab2 > TotalTesteHab1){
            logDiv.innerHTML += `<p>${p2.nome} marcou um ponto! </p>`
            p2.pontos++;
        }

        document.getElementById('score1').innerHTML = p1.pontos;
        document.getElementById('score2').innerHTML = p2.pontos;
    }
}


// função de declarar o vencedor
async function DeclararVencedor(p1,p2) {
    const logDiv = document.getElementById("log");
    logDiv.innerHTML += `<p> Resultado final:  </p>`;
    logDiv.innerHTML += `<p>${p1.nome}: ${p1.pontos} ponto(s) </p> `;
    logDiv.innerHTML += `<p>${p2.nome}: ${p2.pontos} ponto(s) </p> `;

    if(p1.pontos > p2.pontos){
        logDiv.innerHTML += `<p>\n ${p1.nome} venceu a corrida! 🏆 parabéns! </p> `;
        destacarVencedor("player1");

    } else if (p2.pontos > p1.pontos){
        logDiv.innerHTML += `<p>\n ${p2.nome} venceu a corrida! 🏆 parabéns! </p> `;
        destacarVencedor("player2");
    } else {
        logDiv.innerHTML += `<p> A corrida terminou em empate! </p> `;
    }

}

// função para dar animação ao gif quando o personagem vence.
// a animação tem duração de 3 segundos...
async function destacarVencedor(p1) {
    const gifElement = document.querySelector(`#${p1} img`);
    gifElement.classList.add("vencedor");

    setTimeout(() =>{
        gifElement.classList.remove("vencedor");
    }, 3000);
    
}


    
