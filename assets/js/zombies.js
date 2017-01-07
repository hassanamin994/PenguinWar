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
                    console.log(ZOMBIES.timeInit) ;
                    clearInterval(ZOMBIES.timeInit);
                    ZOMBIES.timeInit = null;
                    console.log(ZOMBIES.timeInit) ;
                  //  ZOMBIES.timeInit = null ;
                    ZOMBIES.hero.element.classList.remove("hero-is-shoot");
                    ZOMBIES.hero.element.classList.add("dont-shoot");
                },500);

                  console.log("space up ") ;


            }else {
                console.log(ZOMBIES.timeInit)
                if(!ZOMBIES.timeInit){
                  ZOMBIES.timeInit = setInterval(function () {
                      ZOMBIES.hero.element.classList.add("hero-is-shoot");
                      setTimeout(function(){
                        ZOMBIES.hero.element.classList.remove("hero-is-shoot");
                      },300);
                  },350);
                }
                console.log("space down ") ;
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
