MyGame.screens['level-menu'] = (function(game) {
    'use strict';
    
    function initialize() {
        //
        // Setup each of menu events for the screens

        for (const [levelName, level] of Object.entries(MyGame.levels)){
            let li = document.createElement('li');
            let levelButton = document.createElement('button');
            li.appendChild(levelButton);
            levelButton.id = `id-level-${levelName}`;
            levelButton.innerText = `${levelName}`;
            levelButton.addEventListener(
                'click',
                function() {
                    MyGame.systems.ECS.setLevel(level);
                    game.showScreen('game-play');
                }
            )
            document.getElementById('level-menu-ul').prepend(li);
        }

        document.getElementById('id-level-back').addEventListener(
            'click',
            function(){
                game.showScreen('main-menu');
            }
        );
    }
    
    function run() {
        //
        // I do nothing here
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
