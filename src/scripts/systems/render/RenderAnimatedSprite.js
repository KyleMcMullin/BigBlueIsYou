// --------------------------------------------------------------
//
// Renders an animated model based on a spritesheet.
//
// --------------------------------------------------------------
MyGame.render.RenderAnimatedSprite = (function(graphics) {
    'use strict';

    //------------------------------------------------------------------
    //
    // Render the specific sub-texture animation frame
    //
    //------------------------------------------------------------------
    function RenderAnimatedSprite(model) {
        graphics.drawSubTexture(model.image, model.index, model.subTextureWidth, model.center, model.rotation, model.size, model.color);
    }

    let api = {
        RenderAnimatedSprite: RenderAnimatedSprite
    };

    return api;
})(MyGame.graphics);
