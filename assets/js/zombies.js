var ZOMBIES = {
        lastLoopRun: 0,
        timeInit: 0,
        HEROWIDTH: 80,
        HEROHEIGHT: 80,
        enemies:[],
        LEVEL : 1,
        LEVEL_SPEED_Enemy_Generate : 500,
        LEVEL_SPEED_Enemy_Move : 1,
        iterations:0,
        LEFT_KEY: 65,
        UP_KEY: 87,
        RIGHT_KEY: 68,
        DOWN_KEY: 83,
        SPACE_KEY: 32,
        LAZER_SPEED: 25,
        laserArray: [],
        ENEMYHEIGHT: 40,
        ENEMYWIDTH: 40,

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

                this.addEnemy();

                // this.showSprites();

                this.lastLoopRun = new Date().getTime();
                  this.iterations ++;
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
            for( var i = 0; i < this.enemies.length ; i++){ 
                this.enemies[i].y += this.LEVEL_SPEED_Enemy_Move;
                if (ZOMBIES.enemies[i].isGotOut) {
                    ZOMBIES.enemies[i].remove();
                    ZOMBIES.enemies.splice(i,1);
                }else{
                    ZOMBIES.enemies[i].y += ZOMBIES.LAZER_SPEED;
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
        ,addEnemy:function () {
  this.interval = 50;

console.log('addEnemy')
  if (this.iterations > ZOMBIES.LEVEL * ZOMBIES.LEVEL_SPEED_Enemy_Generate) {
    this.interval = 5;
  } else if (this.iterations > ZOMBIES.LEVEL * ZOMBIES.LEVEL_SPEED_Enemy_Generate) {
    this.interval = 20;
  } else if (this.iterations > ZOMBIES.LEVEL * ZOMBIES.LEVEL_SPEED_Enemy_Generate) {
    this.interval = 35;
  }
  
  if (this.helpers.getRandom(this.interval) == 0) {

    var elementName = 'enemy' + this.helpers.getRandom(10000000);
    var enemy = new Enemy('assets/images/heros/male-hero.png' ,this.ENEMYHEIGHT,this.ENEMYWIDTH ); 

    console.log(enemy);   
    this.enemies.push (enemy);
  }
}

    }
    ;
ZOMBIES.init();
