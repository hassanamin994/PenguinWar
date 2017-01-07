var ZOMBIES = {
        lastLoopRun: 0,
        timeInit: 0,
        HEROWIDTH: 80,
        HEROHEIGHT: 80,

        LEFT_KEY: 65,
        UP_KEY: 87,
        RIGHT_KEY: 68,
        DOWN_KEY: 83,
        SPACE_KEY: 32,


        init: function (options) {

            ZOMBIES.hero = new Hero('assets/images/heros/male-hero.png', this.HEROHEIGHT, this.HEROWIDTH);

            document.onkeydown = function (evt) {
                ZOMBIES.toggleKey(evt.keyCode, true);
            };

            document.onkeyup = function (evt) {
                ZOMBIES.toggleKey(evt.keyCode, false);
            };

            this.loop();
        }
        ,
        loop: function () {
            if (new Date().getTime() - this.lastLoopRun > 40) {

                // this.updatePositions();
                this.hero.handelControllers();
                // this.checkCollisions();

                // this.addEnemy();

                // this.showSprites();

                this.lastLoopRun = new Date().getTime();
                //iterations++;
            }
            setTimeout('ZOMBIES.loop();', 41);
        }
        ,
        toggleKey: function (keyCode, isPressed) {
            console.log(keyCode,isPressed);
            if (keyCode == ZOMBIES.LEFT_KEY) {
                this.hero.moveLeft(isPressed);
            }
            if (keyCode == ZOMBIES.RIGHT_KEY) {
                this.hero.moveRight(isPressed);
            }
            if (keyCode == ZOMBIES.UP_KEY) {
                this.hero.moveUp(isPressed);
            }
            if (keyCode == ZOMBIES.DOWN_KEY) {
                this.hero.moveDown(isPressed);
            }
            if (keyCode == ZOMBIES.SPACE_KEY) {
                this.hero.fire(isPressed);
            }
        }
        ,
        helpers: {
            getRandom: function (maxSize) {
                return parseInt(Math.random() * maxSize);
            }
        }
    }
    ;

ZOMBIES.init();