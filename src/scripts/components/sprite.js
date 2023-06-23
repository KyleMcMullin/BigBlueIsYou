MyGame.components.Sprite = function (spec) {
    'use strict';

    const SPRITE_COUNT = 3;
    const SPRITE_TIME = [350, 350, 350];

    let color = spec.color;
    let animationTime = 0;
    let subImageIndex = 0;
    let image = MyGame.assets[spec.image];
    let subTextureWidth = 0;
    let animated = spec.animated;
    if (animated) {
        subTextureWidth = image.width / spec.spriteCount;
    }

    let api = {
        update: function (elapsedTime) {
            if (!animated) return;
            animationTime += elapsedTime;

            //
            // Check to see if we should update the animation frame
            if (animationTime >= SPRITE_TIME[subImageIndex]) {
                //
                // When switching sprites, keep the leftover time because
                // it needs to be accounted for the next sprite animation frame.
                animationTime -= SPRITE_TIME[subImageIndex];
                subImageIndex += 1;
                //
                // Wrap around from the last back to the first sprite as needed
                subImageIndex = subImageIndex % SPRITE_COUNT;
            }
        },
        render: function (model) {
            if (animated) {
                let newModel = {
                    image: image,
                    index: subImageIndex,
                    subTextureWidth: subTextureWidth,
                    center: model.center,
                    rotation: model.rotation,
                    size: {x: model.size.width, y: model.size.height},
                    color: color
                }
                MyGame.render.RenderAnimatedSprite.RenderAnimatedSprite(newModel);
            } else {
                let newModel = {
                    image: image,
                    center: model.center,
                    rotation: model.rotation,
                    size: model.size,
                    color: color
                }
                MyGame.render.RenderSprite.RenderSprite(newModel);
            }
        },
        clone: function () {
            let clonedSprite = MyGame.components.Sprite(spec);
            clonedSprite.image = image;
            clonedSprite.animated = animated;
            clonedSprite.animationTime = animationTime;
            clonedSprite.subImageIndex = subImageIndex;
            clonedSprite.subTextureWidth = subTextureWidth;
            return clonedSprite;
        }
    };
    return api;
 }