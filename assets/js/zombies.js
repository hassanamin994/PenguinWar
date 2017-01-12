Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
};

var ZOMBIES = {
    lastLoopRun: 0,
    timeInit: 0,
    HEROWIDTH: 80,
    HEROHEIGHT: 80,


    LEVEL_SPEED_Enemy_Generate: 500,
    LEVEL_SPEED_Enemy_Move: 2,

    iterations: 0,
    LEFT_KEY: 65,
    UP_KEY: 87,
    RIGHT_KEY: 68,
    DOWN_KEY: 83,
    SPACE_KEY: 32,
    LAZER_SPEED: 25,
    ENEMYHEIGHT: 60,
    ENEMYWIDTH: 60,
    FINISH: false,
    SCORE: 0,
    interval: 50,

    laserArray: [],
    exirArray: [],
    enemies: [],


    LEVEL: 1,

    //current level
    CURRENT_LEVEL: 1,
    // the current weapon that shoot now
    CURRENT_WEAPON: 'OS',
    // all weapons player take to toggle between them
    MY_WEAPONS: ['OS'],

    WEAPONS_LIMITS: {},

    WEAPONS_MAP: {
        OS: {
            IMAGE: 'os.png',
            SPEED: 20,
            LIMIT: 0
        },
        RUBY: {
            IMAGE: 'ruby.png',
            SPEED: 50,
            LIMIT: 10
        }
    },

    EXIRS_MAP: {
        RUBY: {
            NAME: 'RUBY',
            IMAGE: 'ruby.png',
            ACTION: 'CHANGE_WEAPON',
            VALUE: 'RUBY'
        }
    },

    GAME_MAP: {
        1: {
            NAME: 'Kill Duke',
            ENEMY_SPEED: 5,
            EXIRS: ['RUBY']
        }
    },

    terminalElement: document.getElementById('cmds'),

    init: function (options) {

        ZOMBIES.hero = new Hero('assets/images/heros/male-hero.png', ZOMBIES.HEROHEIGHT, ZOMBIES.HEROWIDTH);
        ZOMBIES.scoreDiv = document.getElementById('score');
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
        }

        if (!ZOMBIES.FINISH)
            setTimeout('ZOMBIES.loop();', 41);
    }
    ,
    updatePositions: function () {
        for (var i = 0; i < ZOMBIES.laserArray.length; i++) {
            if (ZOMBIES.laserArray[i].isGotOut) {
                ZOMBIES.laserArray[i].remove();
                ZOMBIES.laserArray.splice(i, 1);
            } else {
                ZOMBIES.laserArray[i].y -= ZOMBIES.WEAPONS_MAP[ZOMBIES.CURRENT_WEAPON].SPEED;
            }
        }
        for (var i = 0; i < ZOMBIES.enemies.length; i++) {
            if (ZOMBIES.enemies[i].isGotOut) {
                ZOMBIES.enemies[i].remove();
                ZOMBIES.enemies.splice(i, 1);
            } else {
                ZOMBIES.enemies[i].y += ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].ENEMY_SPEED;
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
        if (keyCode == ZOMBIES.SPACE_KEY && !ZOMBIES.finish && !isPressed) {
            if (ZOMBIES.laserArray.length < 3) {
                ZOMBIES.laserArray[ZOMBIES.laserArray.length] = new Laser('assets/images/weapons/' + ZOMBIES.WEAPONS_MAP[ZOMBIES.CURRENT_WEAPON].IMAGE, 10, 10, ZOMBIES.hero.x + (ZOMBIES.hero.w / 2) - 5, ZOMBIES.hero.y);

                //if the weapon is limited
                if (ZOMBIES.WEAPONS_MAP[ZOMBIES.CURRENT_WEAPON].LIMIT > 0) {
                    // if the limit not set yet
                    if(typeof ZOMBIES.WEAPONS_LIMITS[ZOMBIES.CURRENT_WEAPON] == 'undefined'){
                        ZOMBIES.WEAPONS_LIMITS[ZOMBIES.CURRENT_WEAPON] = ZOMBIES.WEAPONS_MAP[ZOMBIES.CURRENT_WEAPON].LIMIT;
                    }else{
                        //decrement
                        ZOMBIES.WEAPONS_LIMITS[ZOMBIES.CURRENT_WEAPON] -= 1;
                    }
                    //back to the previous weapon in the list
                    if (ZOMBIES.WEAPONS_LIMITS[ZOMBIES.CURRENT_WEAPON] == 0) {
                        ZOMBIES.CURRENT_WEAPON = 'OS';
                    }
                }

            }
        }
    }
    ,
    checkCollisions: function () {
        for (var i = 0; i < ZOMBIES.exirArray.length; i++) {
            if (ZOMBIES.intersects(ZOMBIES.hero, ZOMBIES.exirArray[i])) {
                if (ZOMBIES.exirArray[i].config.ACTION == 'CHANGE_WEAPON') {
                    ZOMBIES.CURRENT_WEAPON = ZOMBIES.exirArray[i].config.VALUE;
                    ZOMBIES.addToTerminal('sudo apt-get install ' + ZOMBIES.exirArray[i].config.VALUE);
                    // to add the weapon to the list to toggle between them
                    ZOMBIES.MY_WEAPONS.push(ZOMBIES.exirArray[i].config.VALUE);
                }
                ZOMBIES.exirArray[i].remove();
                ZOMBIES.exirArray.splice(i, 1);
            }
        }


        for (var i = 0; i < ZOMBIES.enemies.length; i++) {

            var laser = ZOMBIES.getIntersectingLaser(ZOMBIES.enemies[i]);
            if (laser) {
                var enemyX = ZOMBIES.enemies[i].x;
                var enemyY = ZOMBIES.enemies[i].y;

                (function () {
                    var i2 = i;
                    // Hassan Edit, removed the enemy immediatly after it die instead of in timeout because of a BUG !
                    ZOMBIES.enemies[i2].onDie();
                    var temp = ZOMBIES.enemies[i2];
                    ZOMBIES.enemies.splice(i2, 1);
                    setTimeout(function () {

                        temp.remove();
                    }, 500);
                })();

                if (ZOMBIES.helpers.getRandom(2) == 1) {
                    var exirKey = ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].EXIRS.random();
                    var exirConfig = ZOMBIES.EXIRS_MAP[exirKey];
                    ZOMBIES.exirArray.push(new Exir(exirConfig, enemyX, enemyY))
                }

                i--;
                laser.y = -laser.h;
                ZOMBIES.SCORE += 100;
                ZOMBIES.scoreDiv.textContent = ZOMBIES.SCORE;
            } else if (ZOMBIES.intersects(ZOMBIES.hero, ZOMBIES.enemies[i])) {
                ZOMBIES.addToTerminal('kernel error');
                ZOMBIES.enemies[i].onDie();
                ZOMBIES.gameOver();
            }
        }
    },
    getIntersectingLaser: function (enemy) {
        var result = null;
        for (var i = 0; i < ZOMBIES.laserArray.length; i++) {
            if (ZOMBIES.intersects(ZOMBIES.laserArray[i], enemy)) {
                result = ZOMBIES.laserArray[i];
                ZOMBIES.checkScore(ZOMBIES.SCORE);
                break;
            }
        }
        return result;
    }

    ,
    gameOver: function () {
        ZOMBIES.FINISH = true;
        var element = document.getElementById(hero.id);
        element.style.visibility = 'hidden';
        //element.parentElement
        // element = document.getElementById('gameover');
        // element.style.visibility = 'visible';
    }
    ,
    intersects: function (a, b) {
        return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }
    ,
    checkScore: function (score) {
        if (score % 100 == 0) {
            ZOMBIES.LEVEL++;
            ZOMBIES.interval -= 5;
            ZOMBIES.addToTerminal('sudo apt-get update level');
        }
    }
    ,
    helpers: {
        getRandom: function (maxSize) {
            return parseInt(Math.random() * maxSize);
        }
    },
    addToTerminal: function (cmd) {
        var cmdElement = document.createElement('p');
        cmdElement.innerHTML = '<strong>root@Zombies:~$</strong> ' + cmd;
        ZOMBIES.terminalElement.appendChild(cmdElement);
    },
    addEnemy: function () {
        if (ZOMBIES.helpers.getRandom(ZOMBIES.interval) == 0) {
            var enemyName = 'enemy' + ZOMBIES.helpers.getRandom(10000000);
            var enemyObj = new Enemy('assets/images/enemy/' + ['duke2.png', 'duke.png'].random(), ZOMBIES.ENEMYHEIGHT, ZOMBIES.ENEMYWIDTH);

            enemyObj.addClass(['tada-animation', 'woble-animation', 'shake-animation', 'bounce-animation'].random());

            ZOMBIES.enemies.push(enemyObj);
        }
    }

};
ZOMBIES.init();
