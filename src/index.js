const player1 = {
    nome : "Mario",
    velocidade : 4,
    manobrabilidade : 3,
    poder : 3,
    pontos : 0
}

const player2 = {
    nome : "Luigi",
    velocidade : 3,
    manobrabilidade : 4,
    poder : 4,
    pontos : 0
}


const player3 = {
    nome : "Peach",
    velocidade : 3,
    manobrabilidade : 4,
    poder : 2,
    pontos : 0
}
const player4 = {
    nome : "Yoshi",
    velocidade : 2,
    manobrabilidade : 4,
    poder : 3,
    pontos : 0
}

const player5 = {
    nome : "Bowser",
    velocidade : 5,
    manobrabilidade : 2,
    poder : 5,
    pontos : 0
}


const player6 = {
    nome : "Donkey Kong",
    velocidade : 2,
    manobrabilidade : 2,
    poder : 5,
    pontos : 0
}
// floor para arredondar numero 
// random para poder escolher um numero aleatorio
// async para a função não rodar de uma só vez
async function RolarDados(){
    return Math.floor(Math.random() * 6) + 1; 
}



async function getBlocosEscolhidos() {
    let radom = Math.random();
    let retornar;

    switch (true) {
        case radom < 0.33:
            return retornar = "RETA"
            break;
        case radom < 0.66:
            return retornar = "CURVA";
            break;
        default:
            return retornar = "CONFRONTO"
            
    }

    
    
} 

async function logRollResult(caracteristicaNome, bloco, resultado, atributo) {
    console.log(`${caracteristicaNome} rolou um dado de ${bloco} ${resultado} + ${atributo} = ${resultado + atributo}`)
    
}

async function MotorPrincipal(p1, p2){
    for(let round = 1; round <= 5; round++){
        console.log(`Rodada ${round}`);

        let bloco = await getBlocosEscolhidos();
        console.log(`Bloco: ${bloco}`)

         // rolar dados
        let resultado1 = await RolarDados();
        let resultado2 = await RolarDados();

        //teste de habilade
        let TotalTesteHab1 = 0;
        let TotalTesteHab2 = 0;

        if (bloco === "RETA"){

            TotalTesteHab1 = resultado1 + p1.velocidade;
            TotalTesteHab2 = resultado2 + p2.velocidade;
            
            await logRollResult(p1.nome, "velocidade", resultado1, p1.velocidade);
            await logRollResult(p2.nome, "velocidade", resultado2, p2.velocidade);
    
        } if (bloco === "CURVA") {
    
            TotalTesteHab1 = resultado1 + p1.manobrabilidade;
            TotalTesteHab2 = resultado2 + p2.manobrabilidade;
    
            await logRollResult(p1.nome, "manobrabilidade", resultado1, p1.manobrabilidade);
            await logRollResult(p2.nome, "manobrabilidade", resultado2, p2.manobrabilidade);
    
        } if (bloco === "CONFRONTO"){

             let ResultadoPoder1 = resultado1 + p1.poder;
             let ResultadoPoder2 = resultado2 + p2.poder;

             console.log(`${p1.nome} confrontou com ${p2.nome}`)

             await logRollResult(p1.nome, "poder", resultado1, p1.poder);
             await logRollResult(p2.nome, "poder", resultado2, p2.poder);

             if(ResultadoPoder1 > ResultadoPoder2){
                if(p2.pontos > 0){
                    p2.pontos--;
                }console.log(`${p1.nome} venceu o confronto! ${p2.nome} perdeu 1 ponto!`);
             } 

            else if(ResultadoPoder2 > ResultadoPoder1){
                if(p1.pontos > 0){
                    p1.pontos--;
                } console.log(`${p2.nome} venceu o confronto! ${p1.nome} perdeu 1 ponto!`);
             } 

             else if(ResultadoPoder1 === ResultadoPoder2){
               console.log("Confronto empatado! Nenhum ponto perdido")
             }
    
        } 
        
        //verificando o vencedor
        if (TotalTesteHab1 > TotalTesteHab2){
            console.log(`${p1.nome} marcou um ponto!!`);
            p1.pontos++;
        } else if (TotalTesteHab1 < TotalTesteHab2) {
            console.log(`${p2.nome} marcou um ponto`);
            p2.pontos++;;
        }

        console.log("-----------------------------------------------------");
    }
   

    
}


async function DeclararVencedor(p1,p2) {
    console.log("Resultado Final:");
    console.log(`${p1.nome}: ${p1.pontos} ponto(s)`);
    console.log(`${p2.nome}: ${p2.pontos} ponto(s)`);

    if(p1.pontos > p2.pontos){
        console.log(`\n ${p1.nome} venceu a corrida! parabéns!`);
    }
    else if(p2.pontos > p1.pontos){
        console.log(`\n ${p2.nome} venceu a corrida! parabéns!`);
    } else{
        console.log("A corrida terminou em empate!");
    }

}


(async function main() {
    console.log(`Corrida entre ${player1.nome} e ${player2.nome}  começando...`);

    await MotorPrincipal(player1, player2);
    await DeclararVencedor(player1, player2);
})();

