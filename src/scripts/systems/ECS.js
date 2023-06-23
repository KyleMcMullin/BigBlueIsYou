//------------------------------------------------------------------
//
// This namespace holds the different game entities from which the
// game model is componsed.
//
//------------------------------------------------------------------
MyGame.systems.ECS = (function () {
    // 'use strict';

    //------------------------------Constants-----------------------------------
    const NounType = {
        BigBlue: 'BigBlue',
        Wall: 'Walls',
        Rock: 'Rocks',
        Flag: 'Flags',
        Lava: 'Lavas',
        Water: 'Waters',
        Floor: 'floor',
        Grass: 'grass',
        Hedge: 'hedge',
        Text: 'text',
    };

    const Properties = {
        Pushable: 'push',
        Stop: 'stop',
        Sink: 'sink',
        Win: 'win',
        Defeat: 'defeat',
        You: 'you'
    };

    const TextType = {
        Noun: 'Nouns',
        Joint: 'Joints',
        Verb: 'Verbs'
    };

    const blockSize = MyGame.graphics.width / 19;

    //------------------------------Variables-----------------------------------
    let moveStack = [];
    let entities = {
        'Visuals': [], // grass, floor
        'Hedges': [], // hedges
        'Lavas': [],
        'Waters': [],
        'Nouns': [],
        'Joints': [],
        'Verbs': [],
        'Walls': [],
        'Rocks': [],
        'Flags': [],
        'BigBlue': [],
    };

    let currentLevel = null;

    function setLevel(level) {
        MyGame.systems.GameModel.resetGameState();
        currentLevel = level.slice();
        entities = {
            'Visuals': [], // grass, floor
            'Hedges': [], // hedges
            'Lavas': [],
            'Waters': [],
            'Nouns': [],
            'Joints': [],
            'Verbs': [],
            'Walls': [],
            'Rocks': [],
            'Flags': [],
            'BigBlue': [],
        };
        for (let i = 0; i < level.length; i++) {
            switch (level[i].type) {

                // Object Types
                case 'h':
                    entities.Hedges.push(MyGame.components.Entity.api.createHedge(level[i].position));
                    break;
                case 'g':
                    entities.Visuals.push(MyGame.components.Entity.api.createGrass(level[i].position));
                    break;
                case 'l':
                    entities.Visuals.push(MyGame.components.Entity.api.createFloor(level[i].position));
                    break;
                case 'b':
                    entities.BigBlue.push(MyGame.components.Entity.api.createBigBlue(level[i].position));
                    break;
                case 'f':
                    entities.Flags.push(MyGame.components.Entity.api.createFlag(level[i].position));
                    break;
                case 'w':
                    entities.Walls.push(MyGame.components.Entity.api.createWall(level[i].position));
                    break;
                case 'r':
                    entities.Rocks.push(MyGame.components.Entity.api.createRock(level[i].position));
                    break;
                case 'v':
                    entities.Lavas.push(MyGame.components.Entity.api.createLava(level[i].position));
                    break;
                case 'a':
                    entities.Waters.push(MyGame.components.Entity.api.createWater(level[i].position));
                    break;

                // Text Types
                case 'B':
                    let bigBlue = MyGame.components.Entity.api.createBigBlueText(level[i].position);
                    entities.Nouns.push(bigBlue);
                    break;
                case 'F':
                    let flag = MyGame.components.Entity.api.createFlagText(level[i].position);
                    entities.Nouns.push(flag);
                    break;
                case 'V':
                    let lava = MyGame.components.Entity.api.createLavaText(level[i].position);
                    entities.Nouns.push(lava);
                    break;
                case 'R':
                    let rock = MyGame.components.Entity.api.createRockText(level[i].position);
                    entities.Nouns.push(rock);
                    break;
                case 'W':
                    let wall = MyGame.components.Entity.api.createWallText(level[i].position);
                    entities.Nouns.push(wall);
                    break;
                case 'A':
                    let water = MyGame.components.Entity.api.createWaterText(level[i].position);
                    entities.Nouns.push(water);
                    break;
                case 'Y':
                    let you = MyGame.components.Entity.api.createYouText(level[i].position);
                    entities.Nouns.push(you);
                    break;
                case 'S':
                    let stop = MyGame.components.Entity.api.createStopText(level[i].position);
                    entities.Verbs.push(stop);
                    break;
                case 'P':
                    let push = MyGame.components.Entity.api.createPushText(level[i].position);
                    entities.Verbs.push(push);
                    break;
                case 'K':
                    let kill = MyGame.components.Entity.api.createDefeatText(level[i].position);
                    entities.Verbs.push(kill);
                    break;
                case 'N':
                    let sink = MyGame.components.Entity.api.createSinkText(level[i].position);
                    entities.Verbs.push(sink);
                    break;
                case 'I':
                    let is = MyGame.components.Entity.api.createIsText(level[i].position);
                    entities.Joints.push(is);
                    break;
                case 'X':
                    let win = MyGame.components.Entity.api.createWinText(level[i].position);
                    entities.Verbs.push(win);
                    break;
            }
        }
    }

    function findCollidingObjects(object, directionX, directionY) {
        let collidedObjects = []
        for (let key in entities) {
            if (key === "Visuals") continue;
            let list = entities[key]
            for (let i = 0; i < list.length; i++) {
                const otherObject = list[i];
                if (object !== otherObject) {
                    if (directionX !== 0 && object.position.y === otherObject.position.y && object.position.x + directionX === otherObject.position.x) {
                        collidedObjects.push(otherObject);
                    }
                    if (directionY !== 0 && object.position.x === otherObject.position.x && object.position.y + directionY === otherObject.position.y) {
                        collidedObjects.push(otherObject);
                    }
                    if (directionX === 0 && directionY === 0 && object.position.x === otherObject.position.x && object.position.y === otherObject.position.y) {
                        collidedObjects.push(otherObject)
                    }
                }
            }
        }
        return collidedObjects;
    }

    function checkIsYou(object) {
        return object.properties.hasOwnProperty(Properties.You);
    }

    function cloneAllEntities() {
        let clonedEntities = {
            'Visuals': [],
            'Hedges': [],
            'BigBlue': [],
            'Walls': [],
            'Flags': [],
            'Rocks': [],
            'Lavas': [],
            'Waters': [],
            'Nouns': [],
            'Joints': [],
            'Verbs': []
        };

        for (let key in entities) {
            let oldList = entities[key]
            let cloneList = clonedEntities[key]
            for (let i = 0; i < oldList.length; i++) {
                cloneList.push(oldList[i].clone())
            }
        }

        return clonedEntities;
    }


    let api = {
        move: function (elapsedTime, direction) {
            if (MyGame.systems.GameModel.isComplete || MyGame.systems.GameModel.isFailed) return;
            let playerMoved = false;
            let tempClone = cloneAllEntities();
            // iterate through entities, if it has input flag, then move it
            for (var value in entities) {
                if (entities.hasOwnProperty(value)) {
                    var list = entities[value]
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].input) {
                            if (list[i].move(direction)) {
                                playerMoved = true;
                            }
                        }
                    }
                }
            }
            if (playerMoved) {
                moveStack.push(tempClone);
                MyGame.assets["youObjectMoved"].play();
            }
        },
        undo: function () {
            if (moveStack.length > 0) {
                MyGame.systems.GameModel.resetGameState();
                entities = moveStack.pop();
            }
        },
        reset: function () {
            moveStack.length = 0;
            setLevel(currentLevel);
        },
        applyProperties: function (entity, property) {
            entity.properties[property] = {};
        },
        clearProperties: function (entity) {
            entity.properties = {};
            entity.input = false;
        },
        isYou: function (entity) {
            entity.properties[Properties.You] = {};
            entity.input = true;
        },
        remove: function (entity) {
            let key = entity.noun.type;
            if (entity.noun === NounType.Text) {
                return;
            }
            let index = entities[key].indexOf(entity);
            entities[key].splice(index, 1);
        },
        add: function (entity) {
            let key = entity.noun.type;
            entities[key].push(entity);
        },
        removeEntityComponent: function (entity, component) {
        },
        addEntityComponent: function (entity, component) {
        }
    }

    // Update, removes entities that are destroyed
    // Checks if the game is over
    function update(elapsedTime) {
        let removeList = []
        for (var value in entities) {
            if (entities.hasOwnProperty(value)) {
                var list = entities[value];
                for (var i = 0; i < list.length; i++) {
                    var entity = list[i];
                    // get objects colliding with entity and check rules
                    let colliedObjects = findCollidingObjects(entity, 0, 0);
                    for (let i = 0; i < colliedObjects.length; i++) {
                        const collidedObject = colliedObjects[i];

                        if (collidedObject.properties.hasOwnProperty(Properties.Sink)) {
                            MyGame.systems.ParticleSystem.objectDeath(
                                (entity.position.x) * blockSize,
                                (entity.position.y) * blockSize,
                                blockSize,
                                blockSize
                            )
                            removeList.push(entity);
                            removeList.push(collidedObject);
                        }
                        // If you hit win property
                        else if (collidedObject.properties.hasOwnProperty(Properties.Win)) {
                            if (checkIsYou(entity)) {
                                MyGame.systems.GameModel.winGame();
                            }
                        }
                        // if you hit defeat property
                        else if (collidedObject.properties.hasOwnProperty(Properties.Defeat)) {
                            if (checkIsYou(entity)) {
                                MyGame.systems.ParticleSystem.objectDeath(
                                    (entity.position.x) * blockSize,
                                    (entity.position.y) * blockSize,
                                    blockSize,
                                    blockSize
                                )
                                removeList.push(entity)
                                MyGame.systems.GameModel.failGame();
                            }
                        }
                    }
                    // update sprites
                    entity.sprite.update(elapsedTime);
                }
            }
        }

        // Remove entities that are destroyed
        for (let i = 0; i < removeList.length; i++) {
            api.remove(removeList[i]);
        }

        if (MyGame.systems.GameModel.isComplete || MyGame.systems.GameModel.isFailed) return false;
        else return true;
    }

    function render() {
        renderEntities(entities["Visuals"])
        renderEntities(entities["Hedges"])
        renderEntities(entities["Lavas"])
        renderEntities(entities["Waters"])
        renderEntities(entities["Nouns"])
        renderEntities(entities["Verbs"])
        renderEntities(entities["Joints"])
        renderEntities(entities["Walls"])
        renderEntities(entities["Rocks"])
        renderEntities(entities["Flags"])
        renderEntities(entities["BigBlue"])
    }

    function renderEntities(list) {
        for (var i = 0; i < list.length; i++) {
            var entity = list[i];
            entity.renderSprite();
        }
    }

    return {
        update: update,
        render: render,
        identifiers: {
            nounType: NounType,
            properties: Properties,
            textType: TextType,
        },
        get entities() { return entities; },
        api,
        findCollidingObjects: findCollidingObjects,
        setLevel: setLevel
    };

}());