class Entity {
    constructor() {
        this.properties = {};
        this.sprite = null;
        this.position = null;
        this.noun = null;
        this.text = null;
        this.rules = {};
        this.input = false;
    }

    checkRules() {
        return MyGame.systems.ECS.checkRules(this);
    }

    move(direction) {
        if (MyGame.systems.GameModel.isComplete || MyGame.systems.GameModel.isFailed) return;
        let collidedObjs = this.findCollidingObjects(direction.x, direction.y);
        if (collidedObjs.length > 0) {
            let canMove = true;
            for (let i = 0; i < collidedObjs.length && canMove; i++) {
                const collidedObject = collidedObjs[i];
                if (collidedObject.properties.hasOwnProperty(MyGame.systems.ECS.identifiers.properties.Stop)) {
                    canMove = false;
                }
                else if (collidedObject.properties.hasOwnProperty(MyGame.systems.ECS.identifiers.properties.Pushable)) {
                    canMove = collidedObject.move(direction);
                }
            }
            if (canMove) {
                this.changePos(direction)
                return true;
            }
            else {
                return false;
            }
        } else {
            this.changePos(direction)
            return true;
        }
    }

    changePos(direction) {
        this.position.x += direction.x;
        this.position.y += direction.y;
    }

    copyComponents() {
        let components = {};
        for (const property in this.components) {
            if (this.components.hasOwnProperty(property)) {
                components[property] = {};
            }
        }
        return components;
    }

    clone() {
        let clonedEntity = new Entity();
        clonedEntity.sprite = this.sprite.clone();
        clonedEntity.position = this.position.clone();
        if (this.noun !== null) clonedEntity.noun = MyGame.components.Noun(this.noun.type);
        if (this.text !== null) clonedEntity.text = MyGame.components.Text(this.text.text);
        for (const property in this.properties) {
            if (this.properties.hasOwnProperty(property)) {
                clonedEntity.properties[property] = {};
            }
        }
        for (const rule in this.rules) {
            if (this.rules.hasOwnProperty(rule)) {
                clonedEntity.rules[rule] = this.rules[rule];
            }
        }
        clonedEntity.input = this.input;
        return clonedEntity;
    }

    findCollidingObjects(directionX, directionY) {
        return MyGame.systems.ECS.findCollidingObjects(this, directionX, directionY);
    }

    renderSprite() {
        this.sprite.render({ center: { x: (this.position.x * 50) + 25, y: (this.position.y * 50) + 25 }, rotation: 0, size: { width: 50, height: 50 } });
    }
}

let api = {
    createHedge: function createHedge(spec) {
        const hedge = new Entity();
        hedge.sprite = MyGame.components.Sprite({ animated: false, image: "hedge", color: 'rgb(45, 168, 3)' });
        hedge.position = MyGame.components.Position(spec.x, spec.y);
        hedge.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Hedge);
        hedge.properties[(MyGame.systems.ECS.identifiers.properties.Stop)] = {};
        return hedge;
    },

    createGrass: function createGrass(spec) {
        const grass = new Entity();
        grass.sprite = MyGame.components.Sprite({ animated: true, image: "grass", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(124, 245, 83)' });
        grass.position = MyGame.components.Position(spec.x, spec.y);
        return grass;
    },

    createFloor: function createFloor(spec) {
        const floor = new Entity();
        floor.sprite = MyGame.components.Sprite({ animated: true, image: "floor", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(48, 48, 47)' });
        floor.position = MyGame.components.Position(spec.x, spec.y);
        return floor;
    },

    createBigBlue: function createBigBlue(spec) {
        const BigBlue = new Entity();
        BigBlue.sprite = MyGame.components.Sprite({ animated: false, image: "bigBlue" });
        BigBlue.position = MyGame.components.Position(spec.x, spec.y);
        BigBlue.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.BigBlue);
        BigBlue.input = true;
        return BigBlue;
    },

    createFlag: function createFlag(spec) {
        const flag = new Entity();
        flag.sprite = MyGame.components.Sprite({ animated: true, image: "flag", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(245, 233, 7)' });
        flag.position = MyGame.components.Position(spec.x, spec.y);
        flag.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Flag);
        return flag;
    },

    createWall: function createWall(spec) {
        const wall = new Entity();
        wall.sprite = MyGame.components.Sprite({ animated: true, image: "wall", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(87, 87, 87)' });
        wall.position = MyGame.components.Position(spec.x, spec.y);
        wall.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Wall);
        // wall.properties[(MyGame.systems.ECS.identifiers.properties.Stop)] = {};
        return wall;
    },

    createRock: function createRock(spec) {
        const rock = new Entity();
        rock.sprite = MyGame.components.Sprite({ animated: true, image: "rock", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(99, 79, 5)' });
        rock.position = MyGame.components.Position(spec.x, spec.y);
        rock.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Rock);
        return rock;
    },

    createLava: function createLava(spec) {
        const lava = new Entity();
        lava.sprite = MyGame.components.Sprite({ animated: true, image: "lava", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(242, 124, 39)' });
        lava.position = MyGame.components.Position(spec.x, spec.y);
        lava.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Lava);
        return lava;
    },

    createWater: function createWater(spec) {
        const water = new Entity();
        water.sprite = MyGame.components.Sprite({ animated: true, image: "water", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(11, 24, 163)' });
        water.position = MyGame.components.Position(spec.x, spec.y);
        water.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Water);
        return water;
    },

    createBigBlueText: function createBigBlueText(spec) {
        const BigBlueText = new Entity();
        BigBlueText.sprite = MyGame.components.Sprite({ animated: true, image: "word-baba", spriteTime: [40, 40, 40], spriteCount: 3 });
        BigBlueText.position = MyGame.components.Position(spec.x, spec.y);
        BigBlueText.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Text);
        BigBlueText.text = MyGame.components.Text(MyGame.systems.ECS.identifiers.textType.Noun);
        BigBlueText.properties[(MyGame.systems.ECS.identifiers.properties.Pushable)] = {};
        BigBlueText.rules = {
            object: 'BigBlue',
        }
        return BigBlueText;
    },

    createFlagText: function createFlagText(spec) {
        const flagText = new Entity();
        flagText.sprite = MyGame.components.Sprite({ animated: true, image: "word-flag", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(242, 212, 95)' });
        flagText.position = MyGame.components.Position(spec.x, spec.y);
        flagText.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Text);
        flagText.text = MyGame.components.Text(MyGame.systems.ECS.identifiers.textType.Noun);
        flagText.properties[(MyGame.systems.ECS.identifiers.properties.Pushable)] = {};
        flagText.rules = {
            object: 'Flags',
        }
        return flagText;
    },

    createLavaText: function createLavaText(spec) {
        const lavaText = new Entity();
        lavaText.sprite = MyGame.components.Sprite({ animated: true, image: "word-lava", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(242, 160, 68)' });
        lavaText.position = MyGame.components.Position(spec.x, spec.y);
        lavaText.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Text);
        lavaText.text = MyGame.components.Text(MyGame.systems.ECS.identifiers.textType.Noun);
        lavaText.properties[(MyGame.systems.ECS.identifiers.properties.Pushable)] = {};
        lavaText.rules = {
            object: 'Lavas',
        }
        return lavaText;
    },

    createRockText: function createRockText(spec) {
        const rockText = new Entity();
        rockText.sprite = MyGame.components.Sprite({ animated: true, image: "word-rock", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(140, 121, 11)' });
        rockText.position = MyGame.components.Position(spec.x, spec.y);
        rockText.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Text);
        rockText.text = MyGame.components.Text(MyGame.systems.ECS.identifiers.textType.Noun);
        rockText.properties[(MyGame.systems.ECS.identifiers.properties.Pushable)] = {};
        rockText.rules = {
            object: 'Rocks',
        }
        return rockText;
    },

    createWallText: function createWallText(spec) {
        const wallText = new Entity();
        wallText.sprite = MyGame.components.Sprite({ animated: true, image: "word-wall", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(59, 58, 57)' });
        wallText.position = MyGame.components.Position(spec.x, spec.y);
        wallText.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Text);
        wallText.text = MyGame.components.Text(MyGame.systems.ECS.identifiers.textType.Noun);
        wallText.properties[(MyGame.systems.ECS.identifiers.properties.Pushable)] = {};
        wallText.rules = {
            object: 'Walls',
        }
        return wallText;
    },

    createWaterText: function createWaterText(spec) {
        const waterText = new Entity();
        waterText.sprite = MyGame.components.Sprite({ animated: true, image: "word-water", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(39, 185, 242)' });
        waterText.position = MyGame.components.Position(spec.x, spec.y);
        waterText.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Text);
        waterText.text = MyGame.components.Text(MyGame.systems.ECS.identifiers.textType.Noun);
        waterText.properties[(MyGame.systems.ECS.identifiers.properties.Pushable)] = {};
        waterText.rules = {
            object: 'Waters',
        }
        return waterText;
    },

    createYouText: function createYouText(spec) {
        const youText = new Entity();
        youText.sprite = MyGame.components.Sprite({ animated: true, image: "word-you", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(163, 11, 163)' });
        youText.position = MyGame.components.Position(spec.x, spec.y);
        youText.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Text);
        youText.text = MyGame.components.Text(MyGame.systems.ECS.identifiers.textType.Verb);
        youText.properties[(MyGame.systems.ECS.identifiers.properties.Pushable)] = {};
        youText.rules = {
            property: MyGame.systems.ECS.identifiers.properties.You,
        }
        return youText;
    },

    createDefeatText: function createDefeatText(spec) {
        const defeatText = new Entity();
        defeatText.sprite = MyGame.components.Sprite({ animated: true, image: "word-kill", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(163, 11, 11)' });
        defeatText.position = MyGame.components.Position(spec.x, spec.y);
        defeatText.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Text);
        defeatText.text = MyGame.components.Text(MyGame.systems.ECS.identifiers.textType.Verb);
        defeatText.properties[(MyGame.systems.ECS.identifiers.properties.Pushable)] = {};
        defeatText.rules = {
            property: MyGame.systems.ECS.identifiers.properties.Defeat,
        }
        return defeatText;
    },

    createSinkText: function createSinkText(spec) {
        const sinkText = new Entity();
        sinkText.sprite = MyGame.components.Sprite({ animated: true, image: "word-sink", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(11, 57, 163)' });
        sinkText.position = MyGame.components.Position(spec.x, spec.y);
        sinkText.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Text);
        sinkText.text = MyGame.components.Text(MyGame.systems.ECS.identifiers.textType.Verb);
        sinkText.properties[(MyGame.systems.ECS.identifiers.properties.Pushable)] = {};
        sinkText.rules = {
            property: MyGame.systems.ECS.identifiers.properties.Sink,
        }
        return sinkText;
    },

    createStopText: function createStopText(spec) {
        const stopText = new Entity();
        stopText.sprite = MyGame.components.Sprite({ animated: true, image: "word-stop", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(77, 26, 4)' });
        stopText.position = MyGame.components.Position(spec.x, spec.y);
        stopText.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Text);
        stopText.text = MyGame.components.Text(MyGame.systems.ECS.identifiers.textType.Verb);
        stopText.properties[(MyGame.systems.ECS.identifiers.properties.Pushable)] = {};
        stopText.rules = {
            property: MyGame.systems.ECS.identifiers.properties.Stop,
        }
        return stopText;
    },

    createPushText: function createPushText(spec) {
        const pushText = new Entity();
        pushText.sprite = MyGame.components.Sprite({ animated: true, image: "word-push", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(4, 77, 18)' });
        pushText.position = MyGame.components.Position(spec.x, spec.y);
        pushText.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Text);
        pushText.text = MyGame.components.Text(MyGame.systems.ECS.identifiers.textType.Verb);
        pushText.properties[(MyGame.systems.ECS.identifiers.properties.Pushable)] = {};
        pushText.rules = {
            property: MyGame.systems.ECS.identifiers.properties.Pushable,
        }
        return pushText;
    },

    createWinText: function createWinText(spec) {
        const winText = new Entity();
        winText.sprite = MyGame.components.Sprite({ animated: true, image: "word-win", spriteTime: [40, 40, 40], spriteCount: 3, color: 'rgb(250, 244, 70)' });
        winText.position = MyGame.components.Position(spec.x, spec.y);
        winText.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Text);
        winText.text = MyGame.components.Text(MyGame.systems.ECS.identifiers.textType.Verb);
        winText.properties[(MyGame.systems.ECS.identifiers.properties.Pushable)] = {};
        winText.rules = {
            property: MyGame.systems.ECS.identifiers.properties.Win,
        }
        return winText;
    },

    createIsText: function createIsText(spec) {
        const isText = new Entity();
        isText.sprite = MyGame.components.Sprite({ animated: true, image: "word-is", spriteTime: [40, 40, 40], spriteCount: 3 });
        isText.position = MyGame.components.Position(spec.x, spec.y);
        isText.noun = MyGame.components.Noun(MyGame.systems.ECS.identifiers.nounType.Text);
        isText.text = MyGame.components.Text(MyGame.systems.ECS.identifiers.textType.Joint);
        isText.properties[(MyGame.systems.ECS.identifiers.properties.Pushable)] = {};
        return isText;
    }
}


MyGame.components.Entity = (function () {
    return {
        Entity: Entity,
        api: api
    }
})();