MyGame.components.Text = function(textType) {
    let that = {};
    let type = textType;

    Object.defineProperty(that, 'type', {
        get: () => type,
        set: value => { type = value; }
    });

    return that;
}