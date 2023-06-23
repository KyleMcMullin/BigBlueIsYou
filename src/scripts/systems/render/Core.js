MyGame.graphics = (function () {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    let filterCanvas = document.createElement('canvas');
    let filterContext = filterCanvas.getContext('2d');

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // --------------------------------------------------------------
    //
    // Draws a texture to the canvas with the following specification:
    //    image: Image
    //    center: {x: , y: }
    //    size: { width: , height: }
    //
    // --------------------------------------------------------------
    function drawTexture(image, center, rotation, size, color) {
        context.save();

        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width, size.height);

        if (color !== null && color !== undefined) {  
            context.globalCompositeOperation = 'source-atop';    
            context.fillStyle = color;     
            context.fillRect(center.x - (size.width / 2), center.y - (size.height / 2), size.width, size.height);
            context.strokeRect(center.x - (size.width / 2), center.y - (size.height / 2), size.width, size.height);
            context.globalCompositeOperation = 'source-over';
        }

        context.restore();
    }

    function drawCircle(spec) {
        context.beginPath();
        context.arc(spec.center.x, spec.center.y, spec.radius, 0, 2 * Math.PI);
        context.closePath();

        context.strokeStyle = spec.outlineColor;
        context.fillStyle = spec.fillColor;

        context.fill();
        context.stroke();
    }

    function drawRectangle(spec) {
        context.save();

        context.translate(spec.center.x, spec.center.y);
        context.rotate(spec.rotation);
        context.translate(-spec.center.x, -spec.center.y);

        context.strokeStyle = spec.outlineColor;
        context.fillStyle = spec.fillColor;

        context.fillRect(
            spec.position.x, spec.position.y,
            spec.width, spec.height);

        context.strokeRect(
            spec.position.x, spec.position.y,
            spec.width, spec.height);

        context.restore();
    }

    function drawText(spec) {
        context.save();

        context.font = spec.font;
        context.fillStyle = spec.fillStyle;
        context.strokeStyle = spec.strokeStyle;
        context.textBaseline = 'top';

        context.translate(spec.position.x, spec.position.y);
        context.rotate(spec.rotation);
        context.translate(-spec.position.x, -spec.position.y);


        context.fillText(spec.text, spec.position.x, spec.position.y);
        context.strokeText(spec.text, spec.position.x, spec.position.y);

        context.restore();
    }

    function drawSubTexture(image, index, subTextureWidth, center, rotation, size, color) {
        context.save();

        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        if (color !== null && color !== undefined) {  
            filterCanvas.width = image.width;
            filterCanvas.height = image.height;
            filterContext.drawImage(
                image,
                subTextureWidth * index, 0,      // Which sub-texture to pick out
                subTextureWidth, image.height,   // The size of the sub-texture
                0, 0,                            // Where to draw the sub-texture
                subTextureWidth, image.height
            );

            filterContext.fillStyle = color;
            filterContext.globalCompositeOperation = 'source-atop';
            // this covers up the texture on rock, not sure how to fix that quite yet
            filterContext.fillRect(0, 0, image.width, image.height);
            filterContext.globalCompositeOperation = 'source-over';  

            context.drawImage(
                filterCanvas,
                0, 0,      // Which sub-texture to pick out
                subTextureWidth, image.height,   // The size of the sub-texture
                center.x - size.x / 2,           // Where to draw the sub-texture
                center.y - size.y / 2,
                size.x, size.y);

        } else {
            //
            // Pick the selected sprite from the sprite sheet to render
            context.drawImage(
                image,
                subTextureWidth * index, 0,      // Which sub-texture to pick out
                subTextureWidth, image.height,   // The size of the sub-texture
                center.x - size.x / 2,           // Where to draw the sub-texture
                center.y - size.y / 2,
                size.x, size.y);
        }


        context.restore();
    }

    let api = {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        drawText: drawText,
        drawRectangle: drawRectangle,
        drawCircle: drawCircle,
        drawSubTexture: drawSubTexture,
        width: canvas.width,
        height: canvas.height
    };

    return api;
}());
