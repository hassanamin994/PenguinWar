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

        LAZER_SPEED: 25,

        laserArray: [],

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
                this.updatePositions();
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
        updatePositions: function () {
            for (var i = 0; i < ZOMBIES.laserArray.length; i++) {
                //console.log(ZOMBIES.laserArray[i]);
                if (ZOMBIES.laserArray[i].isGotOut) {
                    ZOMBIES.laserArray[i].remove();
                    ZOMBIES.laserArray.splice(i,1);
                }else{
                    ZOMBIES.laserArray[i].y -= ZOMBIES.LAZER_SPEED;
                }
            }
        },
        toggleKey: function (keyCode, isPressed) {
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
            if (keyCode == ZOMBIES.SPACE_KEY && !isPressed) {
                if (ZOMBIES.laserArray.length < 3) {
                    ZOMBIES.laserArray[ZOMBIES.laserArray.length] = new Laser('assets/images/heros/male-hero.png', 20, 5, this.hero.x + (this.hero.w / 2) - 3, this.hero.y);
                }
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