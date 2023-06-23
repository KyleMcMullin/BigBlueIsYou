MyGame.screens['game-play'] = (function (game) {
    'use strict';


    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    let myKeyboard = MyGame.systems.input.inputKeyboard();

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        MyGame.systems.rules.update(elapsedTime);
        MyGame.systems.ECS.update(elapsedTime);
        MyGame.systems.ParticleSystem.update(elapsedTime);
    }

    function render() {
        MyGame.graphics.clear();
        MyGame.systems.ECS.render();
        MyGame.render.ParticleSystem.render();
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    async function initialize() {
        // levelsData = await MyGame.systems.fileInput().bigFile();
        // levelsData = await MyGame.systems.fileInput().readFiles();
        // gridSize = levelsData[level]["size"];
        // grid = levelsData[level].objects;

        myKeyboard.clear();
        myKeyboard.register('Escape', function () {

            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            
            // Then, return to the main menu
            // Add stuff here to show optional menu, ends in result of request animation frame or show main menu
            game.showScreen('pause-menu');
            document.getElementById('pause-resume').addEventListener(
                'click',
                function () {
                    game.showScreenNoRun('game-play');
                    cancelNextRequest = false;
                    // MyGame.assets['backgroundMusic'].play();
                    requestAnimationFrame(gameLoop);
                }
            );
            MyGame.assets['backgroundMusic'].pause();
        });

        myKeyboard.register(MyGame.persistence.report()["right"], function (elapsedTime) {
            MyGame.systems.ECS.api.move(elapsedTime, {x: 1, y: 0});
        });

        myKeyboard.register(MyGame.persistence.report()["left"], function (elapsedTime) {
            MyGame.systems.ECS.api.move(elapsedTime, {x: -1, y: 0});
        });

        myKeyboard.register(MyGame.persistence.report()["up"], function (elapsedTime){
            MyGame.systems.ECS.api.move(elapsedTime, {x: 0, y: -1});
        });

        myKeyboard.register(MyGame.persistence.report()["down"], function (elapsedTime){
            MyGame.systems.ECS.api.move(elapsedTime, {x: 0, y: 1});
        });

        myKeyboard.register(MyGame.persistence.report()["undo"], function (elapsedTime) {
            MyGame.systems.ECS.api.undo();
        });

        myKeyboard.register(MyGame.persistence.report()["reset"], function (elapsedTime) {
            MyGame.systems.ECS.api.reset();
        });
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        MyGame.assets['backgroundMusic'].play();

        requestAnimationFrame(gameLoop);
    }

    return {
        initialize: initialize,
        run: run
    };

}(MyGame.game));