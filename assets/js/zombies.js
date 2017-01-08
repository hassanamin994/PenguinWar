var ZOMBIES = {
        lastLoopRun: 0,
        timeInit: 0,
        HEROWIDTH: 80,
        HEROHEIGHT: 80,
        enemies: [],
        LEVEL: 1,
        LEVEL_SPEED_Enemy_Generate: 500,
        LEVEL_SPEED_Enemy_Move: 2,
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

        init: function (options) {

            ZOMBIES.hero = new Hero('assets/images/heros/male-hero.png', ZOMBIES.HEROHEIGHT, ZOMBIES.HEROWIDTH);

            document.onkeydown = function (evt) {
                ZOMBIES.toggleKey(evt.keyCode, true);
            };

            document.onkeyup = function (evt) {
                ZOMBIES.toggleKey(evt.keyCode, false);
            };

            ZOMBIES.loop();
        }
        ,
        loop: function () {

            if (new Date().getTime() - ZOMBIES.lastLoopRun > 40) {
                ZOMBIES.updatePositions();
                ZOMBIES.hero.handelControllers();
                ZOMBIES.checkCollisions();

                ZOMBIES.addEnemy();

                // ZOMBIES.showSprites();

                ZOMBIES.lastLoopRun = new Date().getTime();
                ZOMBIES.iterations++;
                console.log(ZOMBIES.iterations);
            }
            setTimeout('ZOMBIES.loop();', 41);
        }
        ,
        updatePositions: function () {
            for (var i = 0; i < ZOMBIES.laserArray.length; i++) {
                //console.log(ZOMBIES.laserArray[i]);
                if (ZOMBIES.laserArray[i].isGotOut) {
                    console.log('remove');
                    ZOMBIES.laserArray[i].remove();
                    ZOMBIES.laserArray.splice(i, 1);
                } else {
                    ZOMBIES.laserArray[i].y -= ZOMBIES.LAZER_SPEED;
                }
            }
            for (var i = 0; i < ZOMBIES.enemies.length; i++) {
                ZOMBIES.enemies[i].y += ZOMBIES.LEVEL_SPEED_Enemy_Move;
                if (ZOMBIES.enemies[i].isGotOut) {
                    ZOMBIES.enemies[i].remove();
                    ZOMBIES.enemies.splice(i, 1);
                } else {
                    ZOMBIES.enemies[i].y += ZOMBIES.LEVEL_SPEED_Enemy_Move;
                }
            }

        },
        toggleKey: function (keyCode, isPressed) {
            if (keyCode == ZOMBIES.LEFT_KEY) {
                ZOMBIES.hero.moveLeft(isPressed);
            }
            if (keyCode == ZOMBIES.RIGHT_KEY) {
                ZOMBIES.hero.moveRight(isPressed);
            }
            if (keyCode == ZOMBIES.UP_KEY) {
                ZOMBIES.hero.moveUp(isPressed);
            }
            if (keyCode == ZOMBIES.DOWN_KEY) {
                ZOMBIES.hero.moveDown(isPressed);
            }
            if (keyCode == ZOMBIES.SPACE_KEY && !isPressed) {
                if (ZOMBIES.laserArray.length < 3) {
                    ZOMBIES.laserArray[ZOMBIES.laserArray.length] = new Laser('assets/images/heros/male-hero.png', 20, 5, ZOMBIES.hero.x + (ZOMBIES.hero.w / 2) - 3, ZOMBIES.hero.y);
                }
            }
        }
        ,
        checkCollisions: function () {
            for (var i = 0; i < ZOMBIES.enemies.length; i++) {

                var laser = ZOMBIES.getIntersectingLaser(ZOMBIES.enemies[i]);
                if (laser) {

                    (function () {
                        var i2 = i; // closure of i (lexical scope: for-loop)

                        // Hassan Edit, removed the enemy immediatly after it die instead of in timeout because of a BUG !
                        ZOMBIES.enemies[i2].onDie();
                        var temp =  ZOMBIES.enemies[i2] ;
                        ZOMBIES.enemies.splice(i2, 1);
                        setTimeout(function () {
                            temp.remove();
                            console.log(i2 + 'deletedd')
                        }, 500)
                    })();


                    i--;
                    laser.y = -laser.h;
                    // score += 100;
                } else if (ZOMBIES.intersects(ZOMBIES.hero, ZOMBIES.enemies[i])) {
                    ZOMBIES.gameOver();
                }
            }
        },
        getIntersectingLaser: function (enemy) {
            var result = null;
            for (var i = 0; i < ZOMBIES.laserArray.length; i++) {
                if (ZOMBIES.intersects(ZOMBIES.laserArray[i], enemy)) {
                    result = ZOMBIES.laserArray[i];
                    break;
                }
            }
            return result;
        }

        ,
        gameOver: function () {
            var element = document.getElementById(hero.id);
            element.style.visibility = 'hidden';
            // element = document.getElementById('gameover');
            // element.style.visibility = 'visible';
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
            ZOMBIES.interval = 50;

            //   if (ZOMBIES.iterations > ZOMBIES.LEVEL * ZOMBIES.LEVEL_SPEED_Enemy_Generate) {
            //     ZOMBIES.interval = 5;
            //   } else if (ZOMBIES.iterations > ZOMBIES.LEVEL * ZOMBIES.LEVEL_SPEED_Enemy_Generate) {
            //     ZOMBIES.interval = 20;
            //   } else if (ZOMBIES.iterations > ZOMBIES.LEVEL * ZOMBIES.LEVEL_SPEED_Enemy_Generate) {
            //     ZOMBIES.interval = 35;
            //   }

            if (ZOMBIES.helpers.getRandom(ZOMBIES.interval) == 0) {
                var elementName = 'enemy' + ZOMBIES.helpers.getRandom(10000000);
                var enemy = new Enemy('assets/images/heros/male-hero.png', ZOMBIES.ENEMYHEIGHT, ZOMBIES.ENEMYWIDTH);
                ZOMBIES.enemies.push(enemy);
            }
        }

    }
    ;
ZOMBIES.init();
