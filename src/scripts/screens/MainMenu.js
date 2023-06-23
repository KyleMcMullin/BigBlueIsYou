MyGame.screens['main-menu'] = (function(game) {
    'use strict';
    
    function initialize() {
        //
        // Setup each of menu events for the screens
        document.getElementById('id-new-game').addEventListener(
            'click',
            function() {game.showScreen('level-menu'); });
        
        document.getElementById('id-controls').addEventListener(
            'click',
            function() { game.showScreen('controls'); });
        
        document.getElementById('id-credits').addEventListener(
            'click',
            function() { game.showScreen('credits'); });
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