// Shooting Game
const MAX_ROUND = 5, MIN_ROUND_WIN = Math.ceil(MAX_ROUND / 2);

class Player {
    health = 100;
    score = 0;
    name = "";
    constructor(name) {
        this.name = name;
    }
    getName(){
        return this.name;
    }
    getScore(){
        return this.score;
    }
    isAlive(){
        return this.health > 0 ;
    }
    isDead(){
        return this.health <= 0 ;
    }
    shoot(){
        return getRandomInt(0, 5);
    }
    decreaseHealth(fireRate){
        this.health -= fireRate;
    }
    increaseScore(){
        this.score += 1;
    }
    isWinner(){
        return this.score >= MIN_ROUND_WIN;
    }
    resetHealth(){
        this.health = 100;
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function game(player1, player2){
    let currentRound = 1, winner = null;
    while (currentRound <= MAX_ROUND){
        let turn = getRandomInt(0,1);

        while(player1.isAlive() && player2.isAlive()){
            turn ? player2.decreaseHealth(player1.shoot()) : player1.decreaseHealth(player2.shoot());
            turn = !turn;
        }

        player1.isDead() ? player2.increaseScore() : player1.increaseScore();

        if(player1.isWinner()){
            winner = player1;
            break;
        }else if(player2.isWinner()){
            winner = player2;
            break;
        }

        currentRound++;
        player1.resetHealth();
        player2.resetHealth();
    }
    return [
        winner,
        [player1, player2]
        ];
}

function start(player1_name, player2_name){
    const player1 = new Player(player1_name),
        player2 = new Player(player2_name);

    return game(player1, player2);
}


function showWinner([winner, players]){
    const elem_winner_text = document.querySelector("#result > h3 > span")
    if(winner){
        elem_winner_text.textContent = winner.getName();
        players.forEach((player, index) => {
            document.getElementById(`p${index+1}_name`).textContent = player.getName();
            document.getElementById(`p${index+1}_score`).textContent = `had scored ${player.getScore()}`;
        })
    }else{
        elem_winner_text.textContent = "DRAW";
    }
    showLoader(false);
    document.getElementById("result").style.display = "block";
}

function showLoader(show){
    const elem_loader = document.getElementById("loader");
    show ? elem_loader.style.display = "block" : elem_loader.style.display = "none";
}

(function (){
    const elem_startGameForm = document.getElementById("start_game");

    elem_startGameForm.onsubmit = function (e){
        e.preventDefault();
        const player1_name = document.getElementById("player1_name").value;
        const player2_name = document.getElementById("player2_name").value;
        elem_startGameForm.style.display = 'none';
        showLoader(true);
        const result = start(player1_name, player2_name);
        setTimeout(() => {
            showWinner(result);
        }, 2000)
    }
})();
