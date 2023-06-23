MyGame.screens['controls'] = (function (game) {
    'use strict';

    function initialize() {
        let selectedButton = null;
        let selectedControl = null;
        let showText = false;

        let upButton = document.getElementById("id-controls-up");
        let downButton = document.getElementById("id-controls-down");
        let rightButton = document.getElementById("id-controls-right");
        let leftButton = document.getElementById("id-controls-left");
        let resetButton = document.getElementById("id-controls-reset");
        let undoButton = document.getElementById("id-controls-undo");
        
        let displayText = document.getElementById("control-being-edited");
        displayText.style.visibility = "hidden";

        document.getElementById("up").innerText = MyGame.persistence.report()["up"];
        document.getElementById("down").innerText = MyGame.persistence.report()["down"];
        document.getElementById("right").innerText = MyGame.persistence.report()["right"];
        document.getElementById("left").innerText = MyGame.persistence.report()["left"];
        document.getElementById("reset").innerText = MyGame.persistence.report()["reset"];
        document.getElementById("undo").innerText = MyGame.persistence.report()["undo"];

        upButton.addEventListener('click', (e) => {
            if (selectedButton) {
                selectedButton.style.backgroundColor = '';
            }
            selectedButton = e.target;
            selectedControl = document.getElementById("up");
            displayText.style.visibility = "visible";
            displayText.innerHTML = `Press a key to change the control for ${selectedControl.id}`;
        });

        downButton.addEventListener('click', (e) => {
            if (selectedButton) {
                selectedButton.style.backgroundColor = '';
            }
            selectedButton = e.target;
            selectedControl = document.getElementById("down");
            displayText.style.visibility = "visible";
            displayText.innerHTML = `Press a key to change the control for ${selectedControl.id}`;
        });

        rightButton.addEventListener('click', (e) => {
            if (selectedButton) {
                selectedButton.style.backgroundColor = '';
            }
            selectedButton = e.target;
            selectedControl = document.getElementById("right");
            displayText.style.visibility = "visible";
            displayText.innerHTML = `Press a key to change the control for ${selectedControl.id}`;
        });

        leftButton.addEventListener('click', (e) => {
            if (selectedButton) {
                selectedButton.style.backgroundColor = '';
            }
            selectedButton = e.target;
            selectedControl = document.getElementById("left");
            displayText.style.visibility = "visible";
            displayText.innerHTML = `Press a key to change the control for ${selectedControl.id}`;
        });

        resetButton.addEventListener('click', (e) => {
            if (selectedButton) {
                selectedButton.style.backgroundColor = '';
            }
            selectedButton = e.target;
            selectedControl = document.getElementById("reset");
            displayText.style.visibility = "visible";
            displayText.innerHTML = `Press a key to change the control for ${selectedControl.id}`;
        });

        undoButton.addEventListener('click', (e) => {
            if (selectedButton) {
                selectedButton.style.backgroundColor = '';
            }
            selectedButton = e.target;
            selectedControl = document.getElementById("undo");
            displayText.style.visibility = "visible";
            displayText.innerHTML = `Press a key to change the control for ${selectedControl.id}`;
        });

        document.addEventListener('keydown', (e) => {
            if (selectedButton) {
                selectedControl.innerText = `${e.key}`;
                changeControl(selectedControl.id, e.key);
                displayText.style.visibility = "hidden";
                selectedControl = null;
                selectedButton = null;
            }
        });



        document.getElementById('id-controls-back').addEventListener(
            'click',
            function () {
                MyGame.game.reinitializeGameplay();
                game.showScreen('main-menu');
            });

        document.getElementById("id-controls-default").addEventListener(
            'click',
            function () {
                MyGame.persistence.resetControls();
                initialize();
            }
        )
    }

    function run() {
        //
        // I know this is empty, there isn't anything to do.
    }

    function changeControl(key, value) {
        MyGame.persistence.remove(key);
        MyGame.persistence.add(key, value);
    }

    
    return {
        initialize: initialize,
        run: run
    };
}(MyGame.game));