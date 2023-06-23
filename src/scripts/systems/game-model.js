MyGame.systems.GameModel = function () {
    let gameState = {
        isComplete: false,
        isFailed: false,
        chimePlayed: false,        
        playChime: function () {
            if (!gameState.chimePlayed) {
                MyGame.assets["winCondition"].play();
                gameState.chimePlayed = true;
            }
        },
        particlesDone: false,
        showParticles: function () {
            if (!gameState.particlesDone) {
                MyGame.systems.ParticleSystem.roundWin();
                gameState.particlesDone = true;
            }
        },
        resetGameState: function () {
            gameState.isComplete = false;
            gameState.chimePlayed = false;
            gameState.particlesDone = false;
            gameState.isFailed = false;
        },
        winGame: function () {
            if (!gameState.isComplete) {
                gameState.isComplete = true;
                gameState.playChime();
                gameState.showParticles();
                MyGame.assets["backgroundMusic"].pause();
            }
        },
        failGame: function () {
            if (!gameState.isFailed) {
                gameState.isFailed = true;
                MyGame.assets["backgroundMusic"].pause();
            }
        },
    }

    return gameState;
}();