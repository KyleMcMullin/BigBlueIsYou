let MyGame = {
    persistence: (function () {
        let controls = {};
        let savedControls = localStorage.getItem('MyGame.controls');

        if (savedControls !== null) {
            controls = JSON.parse(savedControls);
        }
        else {
            resetControls();
        }

        function add(key, value) {
            controls[key] = value;
            localStorage['MyGame.controls'] = JSON.stringify(controls);
        }

        function remove(key) {
            delete controls[key];
            localStorage['MyGame.controls'] = JSON.stringify(controls);
        }

        function resetControls() {
            add("up", "w");
            add("down", "s");
            add("left", "a");
            add("right", "d");
            add("reset", "r");
            add("undo", "z");
        }

        function report() {
            return controls;
        }

        function removeAll() {
            controls = {};
            localStorage['MyGame.controls'] = JSON.stringify(controls);
            resetControls();
        }

        return {
            add: add,
            remove: remove,
            resetControls: resetControls,
            removeAll: removeAll,
            report: report
        };
    }()),
    screens: {},
    systems: {
        input: {},
    },
    render: {
    },
    graphics: (function () { })(),
    assets: {},
    components: {},
    levels: {},
    rules: {}
};

function onLevelOpenSuccess(text) {
    let allLines = text.split(/\r\n|\n/);
    while (allLines.length > 0) {
        let levelInfo = [];
        let name = allLines.shift();
        if (name === '') continue;
        let dimensions = allLines.shift().split(' x ');
        let width = parseInt(dimensions[0]);
        let height = parseInt(dimensions[1]);
        for (let i = 0; i < height; i++) {
            let singleLine = allLines[i].split('');
            for (let j = 0; j < width; j++) {
                if (singleLine[j] === ' ') continue;
                levelInfo.push({ position: {x: j, y: i}, type: singleLine[j]});
            }
        }
        allLines.splice(0, height);
        for (let i = 0; i < height; i++) {
            let singleLine = allLines[i].split('');
            for (let j = 0; j < width; j++) {
                if (singleLine[j] === ' ') continue;
                levelInfo.push({ position: {x: j, y: i}, type: singleLine[j]});
            }
        }
        allLines.splice(0, height);
        if (levelInfo.length > 0) {
            MyGame.levels[name] = levelInfo;
        }
    }
}

function createLevel(name, lineArray, lineArray2) {
    let lines = [];
    for (let i = 0; i < lineArray.length; i++) {
        lines.push
    }
}

//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------
MyGame.loader = (function () {
    'use strict';
    let scriptOrder = [
        {
            scripts: ['systems/render/core'],
            message: 'Core loaded',
            onComplete: null
        },
        {
            scripts: ['systems/render/RenderAnimatedSprite'],
            message: 'Animated sprite renderer loaded',
            onComplete: null
        },
        {
            scripts: ['systems/render/RenderSprite'],
            message: 'Sprite renderer loaded',
            onComplete: null
        },
        {
            scripts: ['systems/ParticleSystem'],
            message: 'Particle system model loaded',
            onComplete: null
        },
        {
            scripts: ['systems/render/RenderParticleSystem'],
            message: 'Particle system renderer loaded',
            onComplete: null
        },
        {
            scripts: ['components/sprite'],
            message: 'Sprite component loaded',
            onComplete: null
        },
        {
            scripts: ['components/noun'],
            message: 'Noun component loaded',
            onComplete: null
        },
        {
            scripts: ['components/position'],
            message: 'Position component loaded',
            onComplete: null
        },
        {
            scripts: ['components/text'],
            message: 'Text component loaded',
            onComplete: null
        },
        {
            scripts: ['components/entity'],
            message: 'Entity component loaded',
            onComplete: null
        },
        {
            scripts: ['systems/ECS'],
            message: 'ECS loaded',
            onComplete: null
        },
        {
            scripts: ['systems/Rules'],
            message: 'Rules loaded',
            onComplete: null
        },
        {
            scripts: ['systems/game-model'],
            message: 'Game model loaded',
            onComplete: null
        },
        {
            scripts: ['systems/input-keyboard'],
            message: 'Input keyboard loaded',
            onComplete: null
        },
        {
            scripts: ['utils/random'],
            message: 'random system loaded',
            onComplete: null
        },
        {
            scripts: ['screens/Game'],
            message: 'Game loop and model loaded',
            onComplete: null
        },
        {
            scripts: ['screens/Pause'],
            message: 'Pause menu loaded',
            onComplete: null
        },
        {
            scripts: ['screens/MainMenu'],
            message: 'Main Menu loaded',
            onComplete: null
        },
        {
            scripts: ['screens/Controls'],
            message: 'Controls screen loaded',
            onComplete: null
        },
        {
            scripts: ['screens/Credits'],
            message: 'Credits screen loaded',
            onComplete: null
        },
        {
            scripts: ['screens/LevelMenu'],
            message: 'Level menu screen loaded',
            onComplete: null
        },
        {
            scripts: ['Gameplay'],
            message: 'gameplay loaded',
            onComplete: null
        },
    ];

    let assetOrder = [
        {
            key: 'bigBlue',
            source: './assets/bigBlue.png'
        },
        {
            key: 'backgroundMusic',
            source: './assets/backgroundMusic.mp3'
        },
        {
            key: 'winCondition',
            source: './assets/winCondition.mp3'
        },
        {
            key: 'isWinChanged',
            source: './assets/isWinChanged.mp3'
        },
        {
            key: 'youObjectMoved',
            source: './assets/youObjectMoved.mp3'
        },
        {
            key: 'background',
            source: './assets/background.jpg'
        },
        {
            key: 'flag',
            source: './assets/flag.png'
        },
        {
            key: "floor",
            source: "./assets/floor.png"
        },
        {
            key: "flowers",
            source: "./assets/flowers.png"
        },
        {
            key: 'grass',
            source: './assets/grass.png'
        },
        {
            key: 'hedge',
            source: './assets/hedge.png'
        },
        {
            key: 'lava',
            source: './assets/lava.png'
        },
        {
            key: 'rock',
            source: './assets/rock.png'
        },
        {
            key: 'wall',
            source: './assets/wall.png'
        },
        {
            key: 'water',
            source: './assets/water.png'
        },
        {
            key: 'word-baba',
            source: './assets/word-baba.png'
        },
        {
            key: 'word-flag',
            source: './assets/word-flag.png'
        },
        {
            key: 'word-is',
            source: './assets/word-is.png'
        },
        {
            key: 'word-kill',
            source: './assets/word-kill.png'
        },
        {
            key: 'word-lava',
            source: './assets/word-lava.png'
        },
        {
            key: 'word-push',
            source: './assets/word-push.png'
        },
        {
            key: 'word-rock',
            source: './assets/word-rock.png'
        },
        {
            key: 'word-sink',
            source: './assets/word-sink.png'
        },
        {
            key: 'word-stop',
            source: './assets/word-stop.png'
        },
        {
            key: 'word-wall',
            source: './assets/word-wall.png'
        },
        {
            key: 'word-water',
            source: './assets/word-water.png'
        },
        {
            key: 'word-win',
            source: './assets/word-win.png'
        },
        {
            key: 'word-you',
            source: './assets/word-you.png'
        },
        {
            key: 'levels-all',
            source: './levels/levels-all.bbiy',
            onSuccess: onLevelOpenSuccess
        }

    ];
    // let assetOrder = [{
    //         key: 'fire',
    //         source: '/assets/fire.png'
    //     }, {
    //         key: 'smoke',
    //         source: '/assets/smoke.png'
    //     }];

    //------------------------------------------------------------------
    //
    // Helper function used to load scripts in the order specified by the
    // 'scripts' parameter.  'scripts' expects an array of objects with
    // the following format...
    //    {
    //        scripts: [script1, script2, ...],
    //        message: 'Console message displayed after loading is complete',
    //        onComplete: function to call when loading is complete, may be null
    //    }
    //
    //------------------------------------------------------------------
    function loadScripts(scripts, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, function () {
                console.log(entry.message);
                if (entry.onComplete) {
                    entry.onComplete();
                }
                scripts.shift();    // Alternatively: scripts.splice(0, 1);
                loadScripts(scripts, onComplete);
            });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // Helper function used to load assets in the order specified by the
    // 'assets' parameter.  'assets' expects an array of objects with
    // the following format...
    //    {
    //        key: 'asset-1',
    //        source: 'asset/.../asset.png'
    //    }
    //
    // onSuccess is invoked per asset as: onSuccess(key, asset)
    // onError is invoked per asset as: onError(error)
    // onComplete is invoked once per 'assets' array as: onComplete()
    //
    //------------------------------------------------------------------
    function loadAssets(assets, onSuccess, onError, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (assets.length > 0) {
            let entry = assets[0];
            loadAsset(entry.source,
                function (asset) {
                    onSuccess(entry, asset);
                    assets.shift();    // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function (error) {
                    onError(error);
                    assets.shift();    // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // This function is used to asynchronously load image and audio assets.
    // On success the asset is provided through the onSuccess callback.
    // Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
    //
    //------------------------------------------------------------------
    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        let fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = (fileExtension === 'txt' || fileExtension === "bbiy") ? 'text' : 'blob';

            xhr.onload = function () {
                let asset = null;
                if (xhr.status === 200) {
                    if (fileExtension === 'png' || fileExtension === 'jpg') {
                        asset = new Image();
                    } else if (fileExtension === 'mp3') {
                        asset = new Audio();
                    } else if (fileExtension === 'txt') {
                        if (onSuccess) { onSuccess(xhr.responseText); }
                    } else if (fileExtension === "bbiy") {
                        onLevelOpenSuccess(xhr.responseText); 
                        if (onSuccess) { onSuccess(xhr.responseText); }
                    }
                    else {
                        if (onError) { onError('Unknown file extension: ' + fileExtension); }
                    }
                    if (xhr.responseType === 'blob') {
                        if (fileExtension === 'mp3') {
                            asset.oncanplaythrough = function () {
                                asset.oncanplaythrough = null;  // Ugh, what a hack!
                                window.URL.revokeObjectURL(asset.src);
                                if (onSuccess) { onSuccess(asset); }
                            };
                        }
                        else {  // not terrific assumption that it has an 'onload' event, but that is what we are doing
                            asset.onload = function () {
                                window.URL.revokeObjectURL(asset.src);
                                if (onSuccess) { onSuccess(asset); }
                            };
                        }
                        asset.src = window.URL.createObjectURL(xhr.response);
                    }
                } else {
                    if (onError) { onError('Failed to retrieve: ' + source); }
                }
            };
            xhr.send();
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }
    }

    //------------------------------------------------------------------
    //
    // Called when all the scripts are loaded, it kicks off the demo app.
    //
    //------------------------------------------------------------------
    function mainComplete() {
        console.log('It is all loaded up');
        MyGame.game.initialize();
    }

    //
    // Start with loading the assets, then the scripts.
    console.log('Starting to dynamically load project assets');
    loadAssets(assetOrder,
        function (source, asset) {    // Store it on success
            MyGame.assets[source.key] = asset;
        },
        function (error) {
            console.log(error);
        },
        function () {
            console.log('All game assets loaded');
            console.log('Starting to dynamically load project scripts');
            loadScripts(scriptOrder, mainComplete);
        }
    );

}());
