MyGame.render.RenderSprite = (function(graphics) {
    'use strict';

    function RenderSprite(model) {
        graphics.drawTexture(model.image, model.center, model.rotation, model.size, model.color);
    }

    let api = {
        RenderSprite: RenderSprite
    };

    return api;
})(MyGame.graphics);
