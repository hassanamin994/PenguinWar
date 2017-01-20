Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
};

var ZOMBIES = {
    lastLoopRun: 0,
    timeInit: 0,
    HEROWIDTH: 80,
    HEROHEIGHT: 80,

    iterations: 0,

    LEFT_KEY: 65,
    UP_KEY: 87,
    RIGHT_KEY: 68,
    DOWN_KEY: 83,
    SPACE_KEY: 32,
    NEXT_WEAPON: 69,
    PREV_WEAPON: 81,
    ESC: 27,
    // Player info
    PLAYERS: [],
    CURRENT_PLAYER: {},
    FINISH: false,
    //to stop generate enemy when become false in add monster function
    monster: false,
    SCORE: 0,
    interval: 50,
    MONSTERAPPEARED: false,
    SCORELIMIT:3000,

    laserArray: [],
    exirArray: [],
    enemies: [],

    pause: false, // to handel pause
    started: false,

    stopEnemyAdd: false,

    LEVEL: 1,
    MUSIC: [],

    //current level
    CURRENT_LEVEL: 1,
    // the current weapon that shoot now
    CURRENT_WEAPON: 'OS',
    // current background music
    CURRENT_MUSIC: '',
    // all weapons player take to toggle between them
    MY_WEAPONS: ['OS'],

    WEAPONS_LIMITS: {
        'OS': 0
    },
    MONSTER_HEALTH: {
        1: 4,
        2: 10,
        3: 15
    }
    ,

    WEAPONS_MAP: {
        OS: {
            IMAGE: 'os.png',
            SPEED: 20,
            LIMIT: 0,
            ANIMATE: 'flip',
            MULTIPLE: 1,
            SOUND: 'assets/sounds/hit.wav'
        },
        RUBY: {
            IMAGE: 'ruby.png',
            SPEED: 30,
            LIMIT: 10,
            ANIMATE: 'wobble',
            MULTIPLE: 3,
            SOUND:'assets/sounds/hit.wav'

        },
        PYTHON: {
            IMAGE: 'python.png',
            SPEED: 40,
            LIMIT: 5,
            ANIMATE: 'wobble',
            MULTIPLE: 5,
            SOUND: 'assets/sounds/python.ogg'
        }
    },
    ENEMIES_MAP: {
        DUKE: {
            IMAGE: ['duke2.png', 'duke.png'],
            ANIMATE: ['bounce', 'pulse', 'rubberBand', 'shake', 'headShake', 'swing', 'tada'],
            WIDTH: 60,
            HEIGHT: 60,
            SOUND: 'assets/sounds/duke-die.ogg',
            DEATHTYPE: 'explode'
        },
        EXPLORER: {
            IMAGE: ['explorer.png'],
            ANIMATE: ['bounce', 'pulse', 'rubberBand', 'shake', 'headShake', 'swing', 'tada'],
            WIDTH: 60,
            HEIGHT: 60,
            SOUND: 'assets/sounds/explorer-die.ogg',
            DEATHTYPE: 'explode_xpiece'
        },
        CYBER: {
            IMAGE: ['cyber.png'],
            ANIMATE: ['bounce', 'pulse', 'rubberBand', 'shake', 'headShake', 'swing', 'tada'],
            WIDTH: 60,
            HEIGHT: 60,
            SOUND: 'assets/sounds/explorer-die.ogg',
            DEATHTYPE: 'explode'
        },
    },
    MONSTERS_MAP: {
        DUKE: {
            IMAGE: 'duke2.png',
            ANIMATE: [],
            WIDTH: 150,
            HEIGHT: 100,
            HEALTH: 5,
            ROCKETS: 4,
            SOUND: 'assets/sounds/monster-appear.ogg',
            DEATHTYPE: 'explode'
        },
        EXPLORER: {
            IMAGE: 'explorer.png',
            ANIMATE: [],
            WIDTH: 150,
            HEIGHT: 100,
            HEALTH: 10,
            ROCKETS: 4,
            SOUND: 'assets/sounds/monster-appear.ogg',
            DEATHTYPE: 'explode_xpiece'
        },
        CYBER: {
            IMAGE: 'cyber.png',
            ANIMATE: [],
            WIDTH: 150,
            HEIGHT: 100,
            HEALTH: 10,
            ROCKETS: 4,
            SOUND: 'assets/sounds/monster-appear.ogg',
            DEATHTYPE: 'explode'
        },
    },
    EXIRS_MAP: {
        RUBY: {
            NAME: 'RUBY',
            IMAGE: 'ruby.png',
            ACTION: 'CHANGE_WEAPON',
            VALUE: 'RUBY'
        },
        LIVE: {
            NAME: 'LIVE',
            IMAGE: 'heart.png',
            ACTION: 'LIVE',
            VALUE: 'LIVE'
        },
        PYTHON: {
            NAME: 'PYTHON',
            IMAGE: 'python.png',
            ACTION: 'CHANGE_WEAPON',
            VALUE: 'PYTHON'
        },
        UBUNTU: {
            NAME: 'UBUNTU',
            IMAGE: 'ubuntu.png',
            ACTION: 'CHANGE_HERO',
            VALUE: 'ubuntu.png',
            HERO_MOVEMENT: 30
        },
        FEDORA: {
            NAME: 'FEDORA',
            IMAGE: 'fedora.png',
            ACTION: 'CHANGE_HERO',
            VALUE: 'fedora.png',
            HERO_MOVEMENT: 40
        },
        CENTOS: {
            NAME: 'CENTOS',
            IMAGE: 'centos.png',
            ACTION: 'CHANGE_HERO',
            VALUE: 'centos.png',
            HERO_MOVEMENT: 50
        },
    },

    GAME_MAP: {
        1: {
            NAME: 'Kill Duke',
            ENEMY_SPEED: 5,
            EXIRS: ['LIVE', 'RUBY', 'PYTHON', 'FEDORA'],
            ENEMIES: ['DUKE'],
            MONSTER: ['DUKE'],
            BACKGROUND: 'clouds',
            BADGE: 'duke-badge.png',
            SLOAGAN: 'JAVA ASSASIN!',
            SOUND: 'assets/sounds/background/level1_map.ogg'
        },
        2: {
            NAME: 'Kill Internet Explorer',
            ENEMY_SPEED: 10,
            EXIRS: ['RUBY', 'LIVE', 'PYTHON', 'UBUNTU', 'CENTOS'],
            ENEMIES: ['EXPLORER'],
            MONSTER: ['EXPLORER'],
            BACKGROUND: 'sky',
            SOUND: 'assets/sounds/background/level2_map.ogg',
            BADGE: 'microsoft-badge.png',
            SLOAGAN: 'MICROSOFT ASSASIN!'
        },
        3: {
            NAME: 'Kill Cyber Security',
            ENEMY_SPEED: 15,
            EXIRS: ['RUBY', 'PYTHON', 'LIVE', 'UBUNTU', 'CENTOS', 'FEDORA'],
            ENEMIES: ['CYBER'],
            MONSTER: ['CYBER'],
            BACKGROUND:'clouds',
            SOUND:'assets/sounds/background/level1_map.ogg',
            BADGE:'final-badge.png',
            SLOAGAN:'OPEN SOURCE MASTER !',
        },
        4: {
            NAME: 'Soon',
            ENEMY_SPEED: 10,
            EXIRS: ['RUBY'],
            ENEMIES: ['CYBER'],
            MONSTER: ['CYBER'],
            BACKGROUND:'clouds',
            SOUND:'assets/sounds/background/level1_map.ogg',
            BADGE:'final-badge.png',
            SLOAGAN:'Soon !',
        }

    },

    terminalElement: document.getElementById('cmds'),
    // Initialization function
    // GAME ENTRY POINT HERE
    init: function (playername) {
        ZOMBIES.pauseDiv = document.getElementById('pause');
        ZOMBIES.gameOverDiv = document.getElementById('gameover');
        ZOMBIES.levelInfoDiv = document.getElementById('levelinfo');
        ZOMBIES.scoreDiv = document.getElementById('score');
        ZOMBIES.weaponsListDiv = document.getElementById('weapons_list');
        ZOMBIES.heartsDiv = document.getElementById('hearts');
        ZOMBIES.playernameDiv = document.getElementById('player-name');
        for (var i = 1; i <= 3; i++) {
            ZOMBIES.MUSIC[i] = new Audio(ZOMBIES.GAME_MAP[i].SOUND);
        }
        /////////////////////////////////////
        // Sounds Section
        ////////////////////////////////////
        ZOMBIES.CURRENT_LEVEL = 1;
        ZOMBIES.CURRENT_MUSIC = 'assets/sounds/background/level1_map.ogg'
        ZOMBIES.playBackgroundMusic();


        ///////////////////////////////////////
        ///////////////////////////////////////
        ZOMBIES.hero = new Hero('assets/images/heros/' + playername + '.png', ZOMBIES.HEROHEIGHT, ZOMBIES.HEROWIDTH);
        ///////////////////////////////////////////////////
        // INITIAL SETTINGS, DO NOT CHANGE !!!
        ///////////////////////////////////////////////////
        ZOMBIES.hero.live = 3;
        ZOMBIES.pause = false;
        ZOMBIES.started = true;
        ZOMBIES.iterations = 0;
        ZOMBIES.setLevelBackground(ZOMBIES.CURRENT_LEVEL);
        /// gives underfind , check back later

        ////////////////////////////////////////
        ZOMBIES.hero.addClass('animated');
        ZOMBIES.hero.addClass('fadeInUp');

        setTimeout(function () {
            ZOMBIES.hero.removeClass('animated');
            ZOMBIES.hero.removeClass('fadeInUp');
        }, 800);
        // Resetting the number of Hearts every init call
        ZOMBIES.heartsDiv.innerHTML = " ";
        for (var i = 1; i <= ZOMBIES.hero.live; i++) {
            ZOMBIES.addHeart(i);
        }

        document.onkeydown = function (evt) {
            ZOMBIES.toggleKey(evt.keyCode, true);
        };

        document.onkeyup = function (evt) {
            // dont make any action whene game finish
            if (ZOMBIES.FINISH) {
                return;
            }

            if (evt.keyCode == ZOMBIES.ESC || (evt.keyCode == ZOMBIES.SPACE_KEY && ZOMBIES.pause)) {
                if (!ZOMBIES.pause) {
                    ZOMBIES.pauseDiv.style.display = 'block';
                    document.getElementById('menu-div').style.visibility = 'visible';
                    document.getElementById('menu-div').style.left = '5%';
                    document.getElementById('menu-div').style.background = ' rgba(255,255,255,0)';
                    if (newgameDiv.style.visibility == "visible") {
                        newgameDiv.style.visibility = "hidden";
                        newgameDiv.style.left = "-50%";
                    }
                    if (highscoresDiv.style.visibility == "visible") {
                        highscoresDiv.style.visibility = "hidden";
                        highscoresDiv.style.left = "-50%";
                    }
                } else {
                    ZOMBIES.pauseDiv.style.display = 'none';
                    document.getElementById('menu-div').style.visibility = 'hidden';
                    document.getElementById('menu-div').style.left = '-9999999px';
                    if (newgameDiv.style.visibility == "visible") {
                        newgameDiv.style.visibility = "hidden";
                        newgameDiv.style.left = "-50%";
                    }
                    if (highscoresDiv.style.visibility == "visible") {
                        highscoresDiv.style.visibility = "hidden";
                        highscoresDiv.style.left = "-50%";
                    }
                }
                ZOMBIES.pause = !ZOMBIES.pause;
            }

            ZOMBIES.toggleKey(evt.keyCode, false);
        };
        ZOMBIES.FINISH = false;
        ZOMBIES.loop();
        ZOMBIES.refreshWeaponsList();

        console.log(ZOMBIES.CURRENT_PLAYER.name);
    }
    ,
    // Function that Resets the gameplay
    restart: function (playername) {
        if (ZOMBIES.hero) {
            ZOMBIES.hero.remove();
            ZOMBIES.hero = null;
        }
        ZOMBIES.SCORE = 0;
        ZOMBIES.scoreDiv.textContent = 0;
        ZOMBIES.MY_WEAPONS = ['OS'];
        // killing all existing enemies before restarting

        ZOMBIES.clearEnemies();
        ZOMBIES.clearExirs();
        ZOMBIES.CURRENT_WEAPON = "OS";
        ZOMBIES.init(playername);


    }
    ,
    // The main loop function for running the game
    loop: function () {


        if (!ZOMBIES.pause) {

            if (new Date().getTime() - ZOMBIES.lastLoopRun > 40) {
                ZOMBIES.updatePositions();
                ZOMBIES.hero.handelControllers();
                ZOMBIES.checkCollisions();

                // if(!ZOMBIES.monster)
                if (!ZOMBIES.stopEnemyAdd)
                    ZOMBIES.addEnemy();

                // ZOMBIES.showSprites();

                ZOMBIES.lastLoopRun = new Date().getTime();
                ZOMBIES.iterations++;
            }
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
                if (ZOMBIES.laserArray[i].direction == 'left') {
                    ZOMBIES.laserArray[i].x -= ZOMBIES.helpers.getRandom(20);
                }
                if (ZOMBIES.laserArray[i].direction == 'right') {
                    ZOMBIES.laserArray[i].x += ZOMBIES.helpers.getRandom(20);
                }
            }
        }
        for (var i = 0; i < ZOMBIES.enemies.length; i++) {

            if (ZOMBIES.enemies[i].isGotOut && !ZOMBIES.enemies[i].monster) {
                ZOMBIES.enemies[i].remove();
                ZOMBIES.enemies.splice(i, 1);
            } else if (!ZOMBIES.enemies[i].monster && (ZOMBIES.enemies[i].direction == null)) {
                ZOMBIES.enemies[i].y += ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].ENEMY_SPEED;
                if (ZOMBIES.enemies[i].x < GAME_WIDTH / 10) {
                    ZOMBIES.enemies[i].direction = "right";
                } else if (ZOMBIES.enemies[i].x > GAME_WIDTH - (GAME_WIDTH / 10)) {
                    ZOMBIES.enemies[i].direction = "left";
                }
                if (ZOMBIES.enemies[i].direction == 'left') {
                    ZOMBIES.enemies[i].x -= ZOMBIES.helpers.getRandom(20);
                }
                if (ZOMBIES.enemies[i].direction == 'right') {
                    ZOMBIES.enemies[i].x += ZOMBIES.helpers.getRandom(20);
                }

                //ZOMBIES.enemies[i].x += ZOMBIES.helpers.getRandom(10) - 5;
            } else {
                if (!ZOMBIES.enemies[i].monster)
                    ZOMBIES.enemies[i].y += 20;

                if (ZOMBIES.enemies[i].direction == null) {
                    if (ZOMBIES.helpers.getRandom(2) == 1) {
                        ZOMBIES.enemies[i].direction = "left";
                    } else {
                        ZOMBIES.enemies[i].direction = "right";
                    }
                } else {

                    if (ZOMBIES.enemies[i].x < GAME_WIDTH / 10) {
                        ZOMBIES.enemies[i].direction = "right";
                    } else if (ZOMBIES.enemies[i].x > GAME_WIDTH - (GAME_WIDTH / 10)) {
                        ZOMBIES.enemies[i].direction = "left";
                        //console.log("Direction changed to left ") ;
                    }
                }
                if (ZOMBIES.enemies[i].direction == "right") {
                    ZOMBIES.enemies[i].x += ZOMBIES.helpers.getRandom(10);

                }
                if (ZOMBIES.enemies[i].direction == "left") {
                    ZOMBIES.enemies[i].x -= ZOMBIES.helpers.getRandom(10);
                }
                //console.log(ZOMBIES.MONSTERS_MAP[ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].MONSTER].DIRECTION );
                //console.log(ZOMBIES.enemies[i].x);
            }

        }

    },
    toggleKey: function (keyCode, isPressed) {

        if (ZOMBIES.pause)
            return;
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

        if (ZOMBIES.MY_WEAPONS.length > 1 && !ZOMBIES.FINISH) {
            var current_weapon_index = ZOMBIES.getCurrentWeaponIndex();
            if (keyCode == ZOMBIES.NEXT_WEAPON && !isPressed) {
                current_weapon_index++;
                if (current_weapon_index >= ZOMBIES.MY_WEAPONS.length) {
                    current_weapon_index = 0;
                }
                ZOMBIES.CURRENT_WEAPON = ZOMBIES.MY_WEAPONS[current_weapon_index];
                ZOMBIES.refreshWeaponsList();
            }
            if (keyCode == ZOMBIES.PREV_WEAPON && !isPressed) {
                current_weapon_index--;
                if (current_weapon_index < 0) {
                    current_weapon_index = ZOMBIES.MY_WEAPONS.length - 1;
                }
                ZOMBIES.CURRENT_WEAPON = ZOMBIES.MY_WEAPONS[current_weapon_index];
                ZOMBIES.refreshWeaponsList();
            }
        }                                                                   // Prevent hero from firing when is died
        if (keyCode == ZOMBIES.SPACE_KEY && !ZOMBIES.FINISH && !isPressed && ZOMBIES.hero.dieable) {

            var attackSound = new Audio(ZOMBIES.WEAPONS_MAP[ZOMBIES.CURRENT_WEAPON].SOUND);

            if (ZOMBIES.laserArray.length < 3) {
                var laserMultiple = ZOMBIES.WEAPONS_MAP[ZOMBIES.CURRENT_WEAPON].MULTIPLE;

                // to make the weapon shoot more than one rocket
                for (var i = 1; i <= laserMultiple; i++) {
                    //if we have 3 rockets 1 = left , 2 = center, 3 = right and so on
                    var laserDirection = 'straight';

                    //if weapon has the Multiple option
                    if (laserMultiple > 1) {
                        //if i less than the middle to left
                        if (i < Math.ceil(laserMultiple / 2)) {
                            laserDirection = 'left';
                        } else if (i > Math.ceil(laserMultiple / 2)) {
                            laserDirection = 'right';
                        }
                    }

                    var lasser = new Laser('assets/images/weapons/' + ZOMBIES.WEAPONS_MAP[ZOMBIES.CURRENT_WEAPON].IMAGE, 20, 20, ZOMBIES.hero.x + (ZOMBIES.hero.w / 2) - 10, ZOMBIES.hero.y, laserDirection);
                    attackSound.play();
                    //if the current weapon has animation effect
                    if (ZOMBIES.WEAPONS_MAP[ZOMBIES.CURRENT_WEAPON].ANIMATE) {
                        lasser.addClass('animated');
                        lasser.addClass(ZOMBIES.WEAPONS_MAP[ZOMBIES.CURRENT_WEAPON].ANIMATE);
                    }

                    ZOMBIES.laserArray[ZOMBIES.laserArray.length] = lasser;
                }

                //if the weapon is limited
                if (ZOMBIES.WEAPONS_MAP[ZOMBIES.CURRENT_WEAPON].LIMIT > 0) {
                    // if the limit not set yet
                    if (typeof ZOMBIES.WEAPONS_LIMITS[ZOMBIES.CURRENT_WEAPON] == 'undefined') {
                        ZOMBIES.WEAPONS_LIMITS[ZOMBIES.CURRENT_WEAPON] = ZOMBIES.WEAPONS_MAP[ZOMBIES.CURRENT_WEAPON].LIMIT;
                    } else {
                        //decrement
                        ZOMBIES.WEAPONS_LIMITS[ZOMBIES.CURRENT_WEAPON] -= 1;
                    }
                    //back to the previous weapon in the list
                    if (ZOMBIES.WEAPONS_LIMITS[ZOMBIES.CURRENT_WEAPON] <= 0) {
                        //exceed the limit, remove the weapon from my weapons by get index first then splice
                        var current_weapon_index = ZOMBIES.getCurrentWeaponIndex();
                        ZOMBIES.MY_WEAPONS.splice(current_weapon_index, 1);
                        ZOMBIES.addToTerminal('sudo apt-get purge ' + ZOMBIES.CURRENT_WEAPON, 'white');
                        //set current weapon to the previous weapon (index - 1) , it will never be 0 because os always the first, because its infinite
                        ZOMBIES.CURRENT_WEAPON = ZOMBIES.MY_WEAPONS[current_weapon_index - 1];
                    }
                }

                ZOMBIES.refreshWeaponsList();

            }
        }
    }
    ,
    //handel collision Between hero and EXIRS
    checkCollisions: function () {
        for (var i = 0; i < ZOMBIES.exirArray.length; i++) {
            if (ZOMBIES.intersects(ZOMBIES.hero, ZOMBIES.exirArray[i])) {
                if (ZOMBIES.exirArray[i].config.ACTION == 'CHANGE_WEAPON') {
                    //if it is a new weapon, if i have the weapon just increase the limit and not change weapon
                    if (ZOMBIES.MY_WEAPONS.indexOf(ZOMBIES.exirArray[i].config.VALUE) == -1) {
                        ZOMBIES.CURRENT_WEAPON = ZOMBIES.exirArray[i].config.VALUE;
                    }
                    ZOMBIES.addToTerminal('sudo apt-get install ' + ZOMBIES.exirArray[i].config.VALUE, 'white');
                    // to add the weapon to the list to toggle between them
                    ZOMBIES.addWeapon(ZOMBIES.exirArray[i].config.VALUE);
                }
                if (ZOMBIES.exirArray[i].config.ACTION == 'CHANGE_HERO') {
                    ZOMBIES.hero.element.children[0].src = 'assets/images/heros/' + ZOMBIES.exirArray[i].config.VALUE;
                    ZOMBIES.hero.HERO_MOVEMENT = ZOMBIES.exirArray[i].config.HERO_MOVEMENT;
                    ZOMBIES.addToTerminal('sudo switch to ' + ZOMBIES.exirArray[i].config.NAME, 'green');
                }
                if (ZOMBIES.exirArray[i].config.ACTION == 'LIVE') {
                    ZOMBIES.hero.live++;
                    ZOMBIES.addHeart(ZOMBIES.hero.live);
                    ZOMBIES.addToTerminal('sudo apt-git upgrade ');
                }
                ZOMBIES.exirArray[i].remove();
                ZOMBIES.exirArray.splice(i, 1);
            }
        }
        //handel collision Between enemies and laser
        for (var i = 0; i < ZOMBIES.enemies.length; i++) {

            var laser = ZOMBIES.getIntersectingLaser(ZOMBIES.enemies[i]);
            if (laser && !ZOMBIES.enemies[i].monster) {
                var enemyX = ZOMBIES.enemies[i].x;
                var enemyY = ZOMBIES.enemies[i].y;
                (function () {
                    var i2 = i;
                    // Hassan Edit, removed the enemy immediatly after it die instead of in timeout because of a BUG !
                    ZOMBIES.enemies[i2].onDie();
                    // Playing the sound for the dead enemy
                    ZOMBIES.playSound(ZOMBIES.ENEMIES_MAP[ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].ENEMIES[0]].SOUND);
                    var temp = ZOMBIES.enemies[i2];
                    ZOMBIES.enemies.splice(i2, 1);
                    setTimeout(function () {

                        temp.remove();
                    }, 1000);
                })();

                if (ZOMBIES.helpers.getRandom(2) == 1) {
                    var exirKey = ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].EXIRS.random();
                    var exirConfig = ZOMBIES.EXIRS_MAP[exirKey];
                    ZOMBIES.exirArray.push(new Exir(exirConfig, enemyX, enemyY))
                }
                i--;
                laser.y = -laser.h;
                if (!ZOMBIES.MONSTERAPPEARED) {
                    ZOMBIES.SCORE += 100;
                    ZOMBIES.scoreDiv.textContent = ZOMBIES.SCORE;
                    console.log(ZOMBIES.SCORE);
                }
                //handel collision hero and enemies
            } else if (ZOMBIES.intersects(ZOMBIES.hero, ZOMBIES.enemies[i]) && ZOMBIES.hero.dieable && !ZOMBIES.enemies[i].monster) {
                if (ZOMBIES.hero.live > 1) {
                    ZOMBIES.addToTerminal('Fetal Error, entering rescue mode...', 'red');
                } else {
                    ZOMBIES.addToTerminal('KERNEL ERROR! System require Manual reset', 'red');
                }
                //ZOMBIES.enemies[i].onDie();
                (function () {
                    var i2 = i;
                    // kazafy >> copy hassan code to remove enemy when intersect whith hero
                    // Hassan Edit, removed the enemy immediatly after it die instead of in timeout because of a BUG !
                    ZOMBIES.enemies[i2].onDie();
                    var temp = ZOMBIES.enemies[i2];
                    ZOMBIES.enemies.splice(i2, 1);
                    setTimeout(function () {

                        temp.remove();
                    }, 1000);
                })();

                ZOMBIES.gameOver();
            }
            //handel collision between hero and monster
            else if (ZOMBIES.intersects(ZOMBIES.hero, ZOMBIES.enemies[i]) && ZOMBIES.hero.dieable && ZOMBIES.enemies[i].monster) {

                if (ZOMBIES.hero.live > 1) {
                    ZOMBIES.addToTerminal('Fetal Error, entering rescue mode...', 'red');
                } else {
                    ZOMBIES.addToTerminal('KERNEL ERROR! System require Manual reset', 'red');
                }

                ZOMBIES.gameOver();

                //handel collision between laser and monster
            } else if (laser && ZOMBIES.enemies[i].monster) {
                var monsterKey = ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].MONSTER;
                var monsterConfig = ZOMBIES.MONSTERS_MAP[monsterKey];
                laser.remove();
                ZOMBIES.laserArray.splice(ZOMBIES.laserArray.indexOf(laser), 1);
                if (monsterConfig.HEALTH == 1) {
                    (function () {
                        var i2 = i;
                        // Hassan Edit, removed the enemy immediatly after it die instead of in timeout because of a BUG !


                        ZOMBIES.enemies[i2].onDie();
                        ZOMBIES.monsterObj = null;
                        var temp = ZOMBIES.enemies[i2];
                        ZOMBIES.enemies.splice(i2, 1);
                        setTimeout(function () {

                            temp.remove();
                        }, 1000);
                        ZOMBIES.MONSTERAPPEARED = false;
                        // Added to prevent monster from appearing after it die because score is still %3000
                        ZOMBIES.SCORE += 100;
                        ////////////////////
                        // reset the value monster lives for the initial value
                        ////////////

                        ZOMBIES.MONSTERS_MAP[ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].MONSTER].HEALTH = ZOMBIES.MONSTER_HEALTH[ZOMBIES.CURRENT_LEVEL];

                        ZOMBIES.CURRENT_LEVEL++;

                        if (ZOMBIES.CURRENT_LEVEL >= 4) {
                            ZOMBIES.pause = true;
                            ZOMBIES.levelInfoDiv.style.display = 'block';
                            ZOMBIES.levelInfoDiv.innerHTML =
                                '<div class="leveltext animated rubberBand">' +
                                '<h2>' + 'You\'ve Earned a new Badge !<h2>' +
                                '<h1 style="color:green;">' + ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL - 1].SLOAGAN + '</h1>' +
                                '<h2>Wait For Level ' + ZOMBIES.CURRENT_LEVEL + ' In Version 2.0 ?</h2>' +
                              '</div>';
                            document.getElementById('levelinfo').style.background = '#1b181a url("assets/images/badges/' + ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL - 1].BADGE + '") no-repeat center 10px'
                        }else{
                            ZOMBIES.moveToNextLevel();
                        }

                    })();
                } else {

                    monsterConfig.HEALTH--;
                }

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
    },
    clearExirs: function () {
        for (i = 0; i < ZOMBIES.exirArray.length; i++) {
            ZOMBIES.exirArray[i].remove();
            ZOMBIES.exirArray.splice(i, 1);
        }
    }
    ,
    clearEnemies: function () {
        for (var i = 0; i < ZOMBIES.enemies.length; i++) {
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
        }
    },
    setLevelBackground: function (level) {
        var newBG = '<video id="background-video" loop muted autoplay class="fullscreen-bg__video"><source src="assets/videos/' + ZOMBIES.GAME_MAP[level].BACKGROUND + '.mp4" type="video/mp4"></video>'
        document.getElementsByClassName('fullscreen-bg')[0].innerHTML = newBG;
    }
    ,
    moveToNextLevel: function () {

        ZOMBIES.stopBackgroundMusic();

        // changing background music
        ZOMBIES.CURRENT_MUSIC = ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].SOUND;

        // moved into separate function because it's needed in restart method
        ZOMBIES.clearEnemies();
        ZOMBIES.stopEnemyAdd = true;
        ZOMBIES.hero.dieable = false;
        ZOMBIES.addToTerminal('move to next Level', 'green');

        setTimeout(function () {
            ZOMBIES.setLevelBackground(ZOMBIES.CURRENT_LEVEL);
            ZOMBIES.levelInfoDiv.style.display = 'block';
            ZOMBIES.playBackgroundMusic();
        }, 2000);

        ZOMBIES.levelInfoDiv.innerHTML =
            '<div class="leveltext animated rubberBand">' +
            '<h2>' + 'You\'ve Earned a new Badge !<h2>' +
            '<h1 style="color:green;">' + ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL - 1].SLOAGAN + '</h1>' +
            '<h2>Ready For Level ' + ZOMBIES.CURRENT_LEVEL + ' ?</h2>' +
            '<h2>' + ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].NAME + '</h2>' +
            '<h4>Level Monster ' + ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].MONSTER.join(', ') + '</h4>' +
            '<h4>Tty to take ' + ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].EXIRS.join(', ') + ' to maximum your strength</h4>' +
            '</div>';

        document.getElementById('levelinfo').style.background = '#1b181a url("assets/images/badges/' + ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL - 1].BADGE + '") no-repeat center 10px'

        setTimeout(function () {
            ZOMBIES.stopEnemyAdd = false;
            ZOMBIES.hero.dieable = true;
            ZOMBIES.levelInfoDiv.style.display = 'none';
        }, 7000);
        // ZOMBIES.pause = true ;

        // setTimeout(function() {
        //    ZOMBIES.pause = false ;
        // }, 2000);
    }
    ,
    updateHighscores: function () {
        for (i = 0; i < ZOMBIES.PLAYERS.length; i++) {
            if (ZOMBIES.PLAYERS[i].name == ZOMBIES.CURRENT_PLAYER.name) {
                // if player achieved a new highscore , update it
                if (ZOMBIES.PLAYERS[i].highscore < ZOMBIES.scoreDiv.textContent) {
                    ZOMBIES.PLAYERS[i].highscore = ZOMBIES.scoreDiv.textContent;
                    // need to add flag later to notify that he achived highscore
                }
                break;
            }
        }
        // sorting the highscores
        ZOMBIES.PLAYERS.sort(ZOMBIES.helpers.sortbyScore);
        // pushing into the DOM
        var highscoretemplate = '<tr><th>Name</th><th>Score</th></tr>';
        for (i = 0; i < ZOMBIES.PLAYERS.length; i++) {
            highscoretemplate += '<tr>' + '<td>' + ZOMBIES.PLAYERS[i].name + '</td>' + '<td>' + ZOMBIES.PLAYERS[i].highscore + '</td>' + '</tr>'
        }
        document.getElementById('high-scores-table').innerHTML = highscoretemplate;
    }
    ,
    gameOver: function (player) {

        if (ZOMBIES.hero.live >= 1) {
            ZOMBIES.heartsDiv.removeChild(document.getElementById("heart" + ZOMBIES.hero.live));
            ZOMBIES.hero.live--;
            // if the new number of lifes is zero, remove the hero and finish the game
            // else , perform normal behavior of gameover function
            if (ZOMBIES.hero.live == 0) {
                ZOMBIES.hero.remove();
                ZOMBIES.FINISH = true;
                ZOMBIES.updateHighscores();

                ZOMBIES.gameOverDiv.style.display = 'block';
                document.getElementById('menu-div').style.visibility = 'visible';
                document.getElementById('menu-div').style.left = '5%';
                document.getElementById('menu-div').style.background = ' rgba(255,255,255,0)';
                if (newgameDiv.style.visibility == "visible") {
                    newgameDiv.style.visibility = "hidden";
                    newgameDiv.style.left = "-50%";
                }
                if (highscoresDiv.style.visibility == "visible") {
                    highscoresDiv.style.visibility = "hidden";
                    highscoresDiv.style.left = "-50%";
                }


            } else {
                var element = document.getElementById(hero.id);
                element.style.visibility = 'hidden';

                ZOMBIES.hero.dieable = false;
                setTimeout(function () {
                    ZOMBIES.hero.dieable = true;
                    ZOMBIES.hero.removeClass("animated");
                    ZOMBIES.hero.removeClass("flash");
                    ZOMBIES.hero.removeClass("infinite");

                    ZOMBIES.addToTerminal('protection unlocked, Get ready for the fight !   ', 'red');
                    ZOMBIES.addToTerminal('GO!', 'green');

                }, 7000);
                setTimeout(function () {
                    ZOMBIES.hero.removeDieStyle();
                    var element = document.getElementById(hero.id);
                    element.style.visibility = 'visible';
                    ZOMBIES.hero.addClass("animated");
                    ZOMBIES.hero.addClass("infinite");
                    ZOMBIES.hero.addClass("flash");

                    ZOMBIES.hero.x = window.innerWidth / 2 - 25;
                    ZOMBIES.hero.y = window.innerHeight - 150;
                    ZOMBIES.addToTerminal('sudo resurrect hero', 'green');
                    ZOMBIES.addToTerminal('you are protected', 'green');
                    ZOMBIES.addToTerminal('protection and fire will be unlocked after 5 second ', 'green');
                    ZOMBIES.loop();
                }, 2000);
            }

        }
    }
    ,
    // Function that tests intersection between two objects either true or
    intersects: function (a, b) {
        return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }
    ,
    // Funtion that handles level transition
    checkScore: function (score) {
        if (score % ZOMBIES.SCORELIMIT == 0 && score != 0 && !ZOMBIES.MONSTERAPPEARED) {
            ZOMBIES.addMonster();
            ZOMBIES.LEVEL++;
            ZOMBIES.interval -= 5;
            ZOMBIES.addToTerminal('sudo apt-get update level');
        }
    },
    // Helpers functions to reduce redundency
    helpers: {
        getRandom: function (maxSize) {
            return parseInt(Math.random() * maxSize);
        },
        sortbyScore: function (a, b) {
            if (a.highscore > b.highscore)
                return -1;
            if (a.highscore < b.highscore)
                return 1;
            return 0;
        }

    },
    // Getting the index of the current used weapon
    getCurrentWeaponIndex: function () {
        return ZOMBIES.MY_WEAPONS.indexOf(ZOMBIES.CURRENT_WEAPON);
    },
    // Function handles inserting masseges in the terminal part
    addToTerminal: function (cmd, colorClass) {
        var pElement = document.createElement('p');
        pElement.innerHTML = '<strong>root@linux:~$</strong> ' + '<span class="' + colorClass + '">' + cmd.toLowerCase() + '</span>';
        ZOMBIES.terminalElement.appendChild(pElement);
    },
    refreshWeaponsList: function () {
        var ul = ZOMBIES.weaponsListDiv.children[0];
        ul.innerHTML = '';
        for (var i = 0; i < ZOMBIES.MY_WEAPONS.length; i++) {
            var weapon = ZOMBIES.MY_WEAPONS[i];
            var item = document.createElement('li');
            var itemImg = document.createElement('img');
            itemImg.src = 'assets/images/weapons/' + ZOMBIES.WEAPONS_MAP[weapon].IMAGE;
            item.appendChild(itemImg);
            item.innerHTML += (ZOMBIES.WEAPONS_LIMITS[weapon] > 0) ? ZOMBIES.WEAPONS_LIMITS[weapon] : '&#x221e;';
            if (i == ZOMBIES.getCurrentWeaponIndex()) {
                item.classList.toggle('current')
            }
            ul.appendChild(item);

        }

    },
    addWeapon: function (weapon) {
        //if i do not have this weapon, add it to the list
        if (ZOMBIES.MY_WEAPONS.indexOf(weapon) == -1) {
            ZOMBIES.MY_WEAPONS.push(weapon);
            ZOMBIES.WEAPONS_LIMITS[weapon] = ZOMBIES.WEAPONS_MAP[weapon].LIMIT
        } else {
            //if i have the weapon increase the list by the weapon limit
            ZOMBIES.WEAPONS_LIMITS[weapon] += ZOMBIES.WEAPONS_MAP[weapon].LIMIT
        }

        ZOMBIES.refreshWeaponsList();
    },
    addEnemy: function () {
        if (ZOMBIES.helpers.getRandom(ZOMBIES.interval) == 0) {

            var enemyKey = ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].ENEMIES.random();
            var enemyConfig = ZOMBIES.ENEMIES_MAP[enemyKey];

            var enemyObj = new Enemy('assets/images/enemy/' + enemyConfig.IMAGE.random(), enemyConfig.HEIGHT, enemyConfig.WIDTH, false, null, null, null, enemyConfig.DEATHTYPE);

            if (enemyConfig.ANIMATE) {
                enemyObj.addClass('animated');
                enemyObj.addClass('infinite');
                enemyObj.addClass(enemyConfig.ANIMATE.random());
            }

            ZOMBIES.enemies.push(enemyObj);
        }
    },
    addMonster: function () {
        ZOMBIES.monster = false;
        ZOMBIES.MONSTERAPPEARED = true;
        var monsterKey = ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].MONSTER;
        var monsterConfig = ZOMBIES.MONSTERS_MAP[monsterKey];
        ZOMBIES.monsterObj = new Enemy('assets/images/enemy/' + monsterConfig.IMAGE, monsterConfig.HEIGHT, monsterConfig.WIDTH, true, GAME_WIDTH / 2, 50, null, monsterConfig.DEATHTYPE);
        //ZOMBIES.monsterObj.addClass('animated');
        //ZOMBIES.monsterObj.addClass('fadeInDown');
        ZOMBIES.enemies.push(ZOMBIES.monsterObj);
        ZOMBIES.monsterAction();

    },
    addHeart: function (i) {
        var heart = document.createElement('span');
        heart.classList.add("heart");
        heart.classList.add("animated");
        heart.classList.add("infinite");
        heart.classList.add("pulse");
        heart.innerText = '♥';
        heart.id = "heart" + i;
        ZOMBIES.heartsDiv.appendChild(heart);
    }
    ,
    /*
     add animation to monster
     */
    monsterAction: function () {
        if (ZOMBIES.monsterObj != null && !ZOMBIES.FINISH) {
            ZOMBIES.monsterObj.toggleClass('monster-rotate');
            setTimeout('ZOMBIES.monsterAction(); ZOMBIES.monsterAttak();', 5000);
        }

    },
    playSound: function (path) {
        var effect = new Audio(path);
        effect.play();
    }
    ,
    stopBackgroundMusic: function () {
        ZOMBIES.MUSIC[ZOMBIES.CURRENT_LEVEL - 1].pause();
    },
    playBackgroundMusic: function () {
        ZOMBIES.MUSIC[ZOMBIES.CURRENT_LEVEL].play();
    },
    /*
     function to add rockets to monster
     the same logic of multiple laser rocket
     */
    monsterAttak: function () {
        if (ZOMBIES.monsterObj != null && !ZOMBIES.FINISH) {
            var monsterKey = ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].MONSTER;
            var monsterConfig = ZOMBIES.MONSTERS_MAP[monsterKey];
            // to make the monster shoot more than one rocket
            for (var i = 1; i <= monsterConfig.ROCKETS; i++) {
                //if we he 3 rockets 1 = left , 2 = center, 3 = right and so on
                var enemyDirection = 'straight';

                //if monster has the Multiple option
                if (monsterConfig.ROCKETS > 1) {
                    //if i less than the middle to left
                    if (i < Math.ceil(monsterConfig.ROCKETS / 2)) {
                        enemyDirection = 'left';
                    } else if (i > Math.ceil(monsterConfig.ROCKETS / 2)) {
                        enemyDirection = 'right';
                    }
                }

                var enemyKey = ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].ENEMIES.random();
                var enemyConfig = ZOMBIES.ENEMIES_MAP[enemyKey];


                var monsterRockets = new Enemy('assets/images/enemy/' + enemyConfig.IMAGE.random(), enemyConfig.HEIGHT, enemyConfig.WIDTH, false, ZOMBIES.monsterObj.x + (ZOMBIES.monsterObj.w / 2) - 10, ZOMBIES.monsterObj.y, enemyDirection, enemyConfig.DEATHTYPE);

                if (enemyConfig.ANIMATE) {
                    monsterRockets.addClass('animated');
                    monsterRockets.addClass('infinite');
                    monsterRockets.addClass(enemyConfig.ANIMATE.random());
                }
                ZOMBIES.enemies.push(monsterRockets);
                console.log(monsterRockets);
            }
        }
    },


};
//ZOMBIES.init();
