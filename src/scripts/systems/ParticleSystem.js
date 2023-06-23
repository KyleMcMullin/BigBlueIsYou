MyGame.systems.ParticleSystem = function () {
    let nextName = 1;
    let particles = {};

    function resetParticeSystem() {
        nextName = 1;
        particles = {};
    }
    //------------------------------------------------------------------
    //
    // This creates one new particle
    //
    //------------------------------------------------------------------
    function create(spec) {
        let size = Random.nextGaussian(spec.size.mean, spec.size.stdev);
        let direction = Random.nextCircleVector();
        let x = Random.nextRange(spec.center.x - (spec.width / 2), spec.center.x + (spec.width / 2));
        let y = Random.nextRange((spec.center.y - (spec.height / 2)), (spec.center.y + (spec.height / 2)));
        let p = {
            center: { x: x, y: y },
            radius: size,
            direction: direction,
            speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev), // pixels per second
            rotation: 0,
            lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),    // How long the particle should live, in seconds
            alive: 0,    // How long the particle has been alive, in seconds
            fillColor: spec.fillColor,
            outlineColor: spec.outlineColor
        };

        return p;
    }

    function createSide(spec, range, direction) {
        let size = Random.nextGaussian(spec.size.mean, spec.size.stdev);
        let x = Random.nextRange(range.x.min, range.x.max);
        let y = Random.nextRange(range.y.min, range.y.max);
        let p = {
            center: { x: x, y: y },
            radius: size,  // Making square particles
            direction: { x: direction.x, y: direction.y },
            speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev), // pixels per second
            rotation: 0,
            lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),    // How long the particle should live, in seconds
            alive: 0,    // How long the particle has been alive, in seconds
            fillColor: spec.fillColor,
            outlineColor: spec.outlineColor
        };
        return p;
    }

    //------------------------------------------------------------------
    //
    // Update the state of all particles.  This includes removing any that have exceeded their lifetime.
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        let removeMe = [];

        //
        // We work with time in seconds, elapsedTime comes in as milliseconds
        elapsedTime = elapsedTime / 1000;

        Object.getOwnPropertyNames(particles).forEach(function (value, index, array) {
            let particle = particles[value];
            //
            // Update how long it has been alive
            particle.alive += elapsedTime;

            //
            // Update its center
            particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
            particle.center.y += (elapsedTime * particle.speed * particle.direction.y);

            //
            // Rotate proportional to its speed
            particle.rotation += particle.speed / 500;

            //
            // If the lifetime has expired, identify it for removal
            if (particle.alive > particle.lifetime) {
                removeMe.push(value);
            }
        });

        //
        // Remove all of the expired particles
        for (let particle = 0; particle < removeMe.length; particle++) {
            delete particles[removeMe[particle]];
        }
        removeMe.length = 0;
    }

    function generateNewParticles(spec) {
        for (let particle = 0; particle < (Random.nextRange(150, 300)); particle++) {
            //
            // Assign a unique name to each particle
            particles[nextName++] = create(spec);
        }
    }

    function generateNewParticlesSide(spec, range, direction) {
        for (let particle = 0; particle < (Random.nextRange(150, 300)); particle++) {
            //
            // Assign a unique name to each particle
            particles[nextName++] = createSide(spec, range, direction);
        }
    }

    // center of object that died
    function objectDeath(x, y, width, height) {
        let spec = {
            center: { x: x, y: y },
            width: width,
            height: height,
            size: { mean: .6, stdev: .1 },
            speed: { mean: 30, stdev: 10 },
            lifetime: { mean: 0.30, stdev: 0.05 },
            fillColor: 'rgba(255, 25, 0, 1)',
            outlineColor: 'rgba(255, 25, 0, 1)'
        };
        generateNewParticles(spec);
    }

    // from edge
    function objectIsWin(x, y, width, height) {
        let spec = {
            center: { x: x, y: y },
            width: width,
            height: height,
            size: { mean: .5, stdev: .1 },
            speed: { mean: 30, stdev: 10 },
            lifetime: { mean: 0.20, stdev: 0.05 },
            fillColor: 'rgba(255, 217, 0, 1)',
            outlineColor: 'rgba(255, 217, 0, 1)'
        };
        let rightRange = { x: { min: x + (width / 2), max: x + (width / 2) }, y: { min: y - (height / 2), max: y + (height / 2) } };
        let leftRange = { x: { min: x - (width / 2), max: x - (width / 2) }, y: { min: y - (height / 2), max: y + (height / 2) } };
        let topRange = { x: { min: x - (width / 2), max: x + (width / 2) }, y: { min: y - (height / 2), max: y - (height / 2) } };
        let bottomRange = { x: { min: x - (width / 2), max: x + (width / 2) }, y: { min: y + (height / 2), max: y + (height / 2) } };

        generateNewParticlesSide(spec, rightRange, { x: 1, y: 0 });
        generateNewParticlesSide(spec, leftRange, { x: -1, y: 0 });
        generateNewParticlesSide(spec, topRange, { x: 0, y: -1 });
        generateNewParticlesSide(spec, bottomRange, { x: 0, y: 1 });
    }

    // from edge
    function objectIsYou(x, y, width, height) {
        let spec = {
            center: { x: x, y: y },
            width: width,
            height: height,
            size: { mean: .5, stdev: .1 },
            speed: { mean: 45, stdev: 10 },
            lifetime: { mean: 0.15, stdev: 0.05 },
            fillColor: 'rgba(173, 0, 165, 1)',
            outlineColor: 'rgba(173, 0, 165, 1)'
        };
        let rightRange = { x: { min: x + (width / 2), max: x + (width / 2) }, y: { min: y - (height / 2), max: y + (height / 2) } };
        let leftRange = { x: { min: x - (width / 2), max: x - (width / 2) }, y: { min: y - (height / 2), max: y + (height / 2) } };
        let topRange = { x: { min: x - (width / 2), max: x + (width / 2) }, y: { min: y - (height / 2), max: y - (height / 2) } };
        let bottomRange = { x: { min: x - (width / 2), max: x + (width / 2) }, y: { min: y + (height / 2), max: y + (height / 2) } };

        generateNewParticlesSide(spec, rightRange, { x: 1, y: 0 });
        generateNewParticlesSide(spec, leftRange, { x: -1, y: 0 });
        generateNewParticlesSide(spec, topRange, { x: 0, y: -1 });
        generateNewParticlesSide(spec, bottomRange, { x: 0, y: 1 });
    }

    // center of screen
    function roundWin() {
        let spec = {
            center: { x: 750, y: 300 },
            width: 100,
            height: 100,
            size: { mean: 1, stdev: .2 },
            speed: { mean: 70, stdev: 20 },
            lifetime: { mean: 3, stdev: 0.5 },
            fillColor: 'rgba(255, 217, 0, 1)',
            outlineColor: 'rgba(255, 217, 0, 1)'
        };
        generateNewParticles(spec);
        spec.center = { x: 350, y: 300 };
        generateNewParticles(spec);
        spec.center = { x: 550, y: 500 };
        generateNewParticles(spec);
    }

    return {
        get particles() { return particles; },
        update: update,
        objectDeath: objectDeath,
        objectIsWin: objectIsWin,
        objectIsYou: objectIsYou,
        roundWin: roundWin,
        resetParticeSystem: resetParticeSystem
    };
}();