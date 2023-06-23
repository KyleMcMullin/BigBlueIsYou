MyGame.systems.rules = function () {
    const identifiers = MyGame.systems.ECS.identifiers;

    let prevYouObject = undefined;
    let prevWinObject = undefined;

    let entities = MyGame.systems.ECS.entities;

    // add special case for is win that displays particles

    function objectWasWin(key) {
        if (prevWinObject === undefined) return false;
        return prevWinObject === key;
    }

    function objectIsWin(key, verbText) {
        let showParticles = false;
        if (!objectWasWin(key)) {
            showParticles = true;
            prevWinObject = key;
        }
        let entityList = entities[key];
        for (let i = 0; i < entityList.length; i++) {
            let object = entityList[i];
            MyGame.systems.ECS.api.applyProperties(object, verbText.rules.property);
            if (showParticles) {
                MyGame.systems.ParticleSystem.objectIsWin(object.position.x * 50 + 25, object.position.y * 50 + 25, 50, 50);
            }
        }        
        if (showParticles) MyGame.assets["isWinChanged"].play();
    }

    function applyProperties(nounText, verbText) {
        // add the property associated with the verb
        if (verbText.rules.property === identifiers.properties.Win) {
            objectIsWin(nounText.rules.object, verbText);
        }
        let entityList = entities[nounText.rules.object];
        for (let i = 0; i < entityList.length; i++) {
            MyGame.systems.ECS.api.applyProperties(entityList[i], verbText.rules.property);
        }
    }

    function clearProperties(noun) {
        // remove the property associated with the nounText
        let entityList = entities[noun.rules.object];
        if (entityList === undefined || entityList.length === 0) return;
        for (let i = 0; i < entityList.length; i++) {
            MyGame.systems.ECS.api.clearProperties(entityList[i]);
        }
    }

    function applyNounChange(oldEntityText, newEntityText) {
        // if you entity has special cases
        if (newEntityText.rules.hasOwnProperty('property')) {
            objectIsYou(oldEntityText.rules.object);
        } else {
            let oldEntityList = entities[oldEntityText.rules.object];
            let newEntityList = entities[newEntityText.rules.object];
            if (oldEntityList === undefined || oldEntityList.length === 0) return;
            if (newEntityList === undefined || newEntityList.length === 0) return;
            let newEntity = entities[newEntityText.rules.object][0];
            if (newEntity === undefined) return;
            for (let i = 0; i < oldEntityList.length; i++) {
                let tempPosition = oldEntityList[i].position.clone();
                MyGame.systems.ECS.api.remove(oldEntityList[i]);
                let tempEntity = newEntity.clone();
                tempEntity.position = tempPosition;
                MyGame.systems.ECS.api.add(tempEntity);
            }
        }
    }

    function update(elapsedTime) {
        entities = MyGame.systems.ECS.entities;
        for (let nounNum = 0; nounNum < entities.Nouns.length; nounNum++) {
            let noun = entities.Nouns[nounNum];
            if (noun.noun.type !== identifiers.nounType.Text) continue;
            clearProperties(noun);
            for (let jointNum = 0; jointNum < entities.Joints.length; jointNum++) {
                let joint = entities.Joints[jointNum];
                if (noun.position.x + 1 === joint.position.x && noun.position.y === joint.position.y) {
                    for (let verbNum = 0; verbNum < entities.Verbs.length; verbNum++) {
                        let verb = entities.Verbs[verbNum];
                        if (joint.position.x + 1 === verb.position.x && joint.position.y === verb.position.y) {
                            applyProperties(noun, verb);
                        }
                    }
                    for (let noun2Num = 0; noun2Num < entities.Nouns.length; noun2Num++) {
                        let noun2 = entities.Nouns[noun2Num];
                        if (joint.position.x + 1 === noun2.position.x && joint.position.y === noun2.position.y) {
                            applyNounChange(noun, noun2);
                        }
                    }
                }
                if (noun.position.y + 1 === joint.position.y && noun.position.x === joint.position.x) {
                    for (let verbNum = 0; verbNum < entities.Verbs.length; verbNum++) {
                        let verb = entities.Verbs[verbNum];
                        if (joint.position.y + 1 === verb.position.y && joint.position.x === verb.position.x) {
                            applyProperties(noun, verb);
                        }
                    }
                    for (let noun2Num = 0; noun2Num < entities.Nouns.length; noun2Num++) {
                        let noun2 = entities.Nouns[noun2Num];
                        if (joint.position.y + 1 === noun2.position.y && joint.position.x === noun2.position.x) {
                            applyNounChange(noun, noun2);
                        }
                    }
                }
            }

        }
    }

    function objectWasYou(key) {
        if (prevYouObject === undefined) return false;
        return key === prevYouObject;
    }

    function objectIsYou(key) {
        let showParticles = false;
        if (!objectWasYou(key)) {
            prevYouObject = key;
            showParticles = true;
        }
        for (let i = 0; i < MyGame.systems.ECS.entities[key].length; i++) {
            let object = MyGame.systems.ECS.entities[key][i];
            MyGame.systems.ECS.api.isYou(object);
            if (showParticles) {
                MyGame.systems.ParticleSystem.objectIsYou(object.position.x * 50 + 25, object.position.y * 50 + 25, 50, 50);
            }
        }
    }

    return {
        update: update,
    }
}();