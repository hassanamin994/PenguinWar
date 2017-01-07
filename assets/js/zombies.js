var ZOMBIES = {
    lastLoopRun: 0,
    timeInit: 0,
    HEROWIDTH: 80,
    HEROHEIGHT: 80,
    enemies: [],
    LEVEL: 1,
    LEVEL_SPEED_Enemy_Generate: 500,
    LEVEL_SPEED_Enemy_Move: 5,
    iterations: 0,
    LEFT_KEY: 65,
    UP_KEY: 87,
    RIGHT_KEY: 68,
    DOWN_KEY: 83,
    SPACE_KEY: 32,
    LAZER_SPEED: 25,
    laserArray: [],
    ENEMYHEIGHT: 40,
    ENEMYWIDTH: 40,
    finish:false,
    score:0,
     

    init: function (options) {

        ZOMBIES.hero = new Hero('assets/images/heros/male-hero.png', this.HEROHEIGHT, this.HEROWIDTH);
        ZOMBIES.scoreDiv = document.getElementById('score');
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
            this.checkCollisions();

            this.addEnemy();

            // this.showSprites();

            this.lastLoopRun = new Date().getTime();
            this.iterations++;
        }
        if (ZOMBIES.finish){
            return;
        }
        setTimeout('ZOMBIES.loop();', 41);
    }
    ,
    updatePositions: function () {
        for (var i = 0; i < ZOMBIES.laserArray.length; i++) {
            //console.log(ZOMBIES.laserArray[i]);
            if (ZOMBIES.laserArray[i].isGotOut) {
                ZOMBIES.laserArray[i].remove();
                ZOMBIES.laserArray.splice(i, 1);
            } else {
                ZOMBIES.laserArray[i].y -= ZOMBIES.LAZER_SPEED;
            }
        }
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].y += this.LEVEL_SPEED_Enemy_Move;
            if (ZOMBIES.enemies[i].isGotOut) {
                ZOMBIES.enemies[i].remove();
                ZOMBIES.enemies.splice(i, 1);
            } else {
                ZOMBIES.enemies[i].y += ZOMBIES.helpers.getRandom(ZOMBIES.LEVEL_SPEED_Enemy_Move);
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
        if (keyCode == ZOMBIES.SPACE_KEY && !ZOMBIES.finish && !isPressed) {
            if (ZOMBIES.laserArray.length < 3 ) {
                ZOMBIES.laserArray[ZOMBIES.laserArray.length] = new Laser('assets/images/heros/male-hero.png', 20, 5, this.hero.x + (this.hero.w / 2) - 3, this.hero.y);
            }
        }
    }
    ,
    checkCollisions: function () {
        for (var i = 0; i < this.enemies.length; i++) {
            var laser = this.getIntersectingLaser(this.enemies[i]);
            if (laser) {
                var element = document.getElementById(this.enemies[i].id);
                element.style.visibility = 'hidden';
                element.parentNode.removeChild(element);
                this.enemies.splice(i, 1);
                i--;
                laser.y = -laser.h;
                 ZOMBIES.score += 100;
                 ZOMBIES.scoreDiv.innerText= ZOMBIES.score ;

            } else if (this.intersects(this.hero, this.enemies[i])) {
                this.gameOver();
            } else if (this.enemies[i].y + this.enemies[i].h >= 500) {
                var element = document.getElementById(this.enemies[i].id);
                element.style.visibility = 'hidden';
                element.parentNode.removeChild(element);
                this.enemies.splice(i, 1);
                i--;
            }
        }
    },
    getIntersectingLaser: function (enemy) {
        var result = null;
        for (var i = 0; i < this.laserArray.length; i++) {
            if (this.intersects(this.laserArray[i], enemy)) {
                result = this.laserArray[i];
                break;
            }
        }
        return result;
    }

    ,
    gameOver: function () {
        this.hero.remove();
        this.finish = true;
    }
    ,
    intersects: function (a, b) {
        return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }
    ,
    helpers: {
        getRandom: function (maxSize) {
            return parseInt(Math.random() * maxSize);
        }
    }
    , addEnemy: function () {
        this.interval = 50;

        //   if (this.iterations > ZOMBIES.LEVEL * ZOMBIES.LEVEL_SPEED_Enemy_Generate) {
        //     this.interval = 5;
        //   } else if (this.iterations > ZOMBIES.LEVEL * ZOMBIES.LEVEL_SPEED_Enemy_Generate) {
        //     this.interval = 20;
        //   } else if (this.iterations > ZOMBIES.LEVEL * ZOMBIES.LEVEL_SPEED_Enemy_Generate) {
        //     this.interval = 35;
        //   }

        if (this.helpers.getRandom(this.interval) == 0) {

            var elementName = 'enemy' + this.helpers.getRandom(10000000);
            var enemy = new Enemy('assets/images/heros/male-hero.png', this.ENEMYHEIGHT, this.ENEMYWIDTH);

            console.log(enemy);
            this.enemies.push(enemy);
        }
    }

}
    ;
ZOMBIES.init();
