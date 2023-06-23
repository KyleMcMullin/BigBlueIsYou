MyGame.components.Noun = function(nounType) {
    let that = {};
    let type = nounType;

    Object.defineProperty(that, 'type', {
        get: () => type,
        set: value => { type = value; }
    });

    return that;
}