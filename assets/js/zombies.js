var ZOMBIES = {
    lastLoopRun:0,
    timeInit : 0,
    HEROWIDTH : 80,
    HEROHEIGHT : 64,

    init: function (options) {

        ZOMBIES.hero = new Hero('assets/images/heros/male-hero.png',this.HEROHEIGHT,this.HEROWIDTH);

        document.onkeydown = function(evt) {
            ZOMBIES.toggleKey(evt.keyCode, true);
        };

        document.onkeyup = function(evt) {
            ZOMBIES.toggleKey(evt.keyCode, false);
        };

        this.loop();
    },
    loop:function(){
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
    },
    toggleKey : function (keyCode, isPressed) {
        if (keyCode == 37) {
            this.hero.moveLeft(isPressed);
        }
        if (keyCode == 39) {
            this.hero.moveRight(isPressed);
            this.hero.addClass('hero-go-right');
        }
        if (keyCode == 38) {
            this.hero.moveUp(isPressed);
        }
        if (keyCode == 40) {
            this.hero.moveDown(isPressed);
        }
        if (keyCode == 32) {
            this.hero.fire(isPressed);

        }
    },
    helpers: {
        getRandom : function (maxSize) {
            return parseInt(Math.random() * maxSize);
        }
    }
};

ZOMBIES.init();
