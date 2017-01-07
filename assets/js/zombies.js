var ZOMBIES = {
    lastLoopRun:0,
    timeInit : 0,

    init: function (options) {

        ZOMBIES.hero = new Hero('assets/images/heros/male-hero.png',20,20);

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
        }
        if (keyCode == 38) {
            this.hero.moveUp(isPressed);
        }
        if (keyCode == 40) {
            this.hero.moveDown(isPressed);
        }
        if (keyCode == 32) {
            this.hero.fire(isPressed);
            if (!isPressed) {
                

                setTimeout(function (argument) {
                    clearInterval(this.timeInit);
                    ZOMBIES.hero.element.classList.remove("hero-is-shoot");
                },500);
                

            }else {
                console.log(this.timeInit)
                this.timeInit = setInterval(function () {
                    ZOMBIES.hero.element.classList.add("hero-is-shoot");
                }, 20);
                
            }
        }
    },
    helpers: {
        getRandom : function (maxSize) {
            return parseInt(Math.random() * maxSize);
        }
    }
};

ZOMBIES.init();