// Position factory function
MyGame.components.Position = function(inputX, inputY) {
    let that = {};
    let x = inputX;
    let y = inputY;

    Object.defineProperty(that, 'x', {
        get: () => x,
        set: value => { x = value; }
    });

    Object.defineProperty(that, 'y', {
        get: () => y,
        set: value => { y = value; }
    });

    that.clone = () => {
        let clonedPosition = MyGame.components.Position();
        clonedPosition.x = x;
        clonedPosition.y = y;
        return clonedPosition;
    };

    return that;
};