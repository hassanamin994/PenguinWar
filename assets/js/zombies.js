Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
};

var ZOMBIES = {
    lastLoopRun: 0,
    timeInit: 0,
    HEROWIDTH: 80,
    HEROHEIGHT: 80,


    // LEVEL_SPEED_Enemy_Generate: 500,
    // LEVEL_SPEED_Enemy_Move: 2,

    iterations: 0,

    LEFT_KEY: 65,
    UP_KEY: 87,
    RIGHT_KEY: 68,
    DOWN_KEY: 83,
    SPACE_KEY: 32,
    NEXT_WEAPON: 69,
    PREV_WEAPON: 81,


    LAZER_SPEED: 25,
    ENEMYHEIGHT: 60,
    ENEMYWIDTH: 60,
    FINISH: false,
    //to stop generate enemy when become false in add monster function
    monster: false,
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

    WEAPONS_LIMITS: {
        'OS' : 0
    },

    WEAPONS_MAP: {
        OS: {
            IMAGE: 'os.png',
            SPEED: 20,
            LIMIT: 0,
            ANIMATE: 'flip',
            MULTIPLE: 1
        },
        RUBY: {
            IMAGE: 'ruby.png',
            SPEED: 30,
            LIMIT: 10,
            ANIMATE: 'wobble',
            MULTIPLE: 3
        },
        PYTHON: {
            IMAGE: 'python.png',
            SPEED: 40,
            LIMIT: 5,
            ANIMATE: 'wobble',
            MULTIPLE: 5
        }
    },
    ENEMIES_MAP: {
        DUKE : {
            IMAGE: ['duke2.png', 'duke.png'],
            ANIMATE: ['bounce','pulse','rubberBand','shake','headShake','swing','tada'],
            WIDTH : 60,
            HEIGHT : 60,
        }
    },
    MONSTERS_MAP: {
        ORACLE: {
            IMAGE: 'oracle_1.png',
            ANIMATE: ['bounce','pulse','rubberBand','shake','headShake','swing','tada'],
            WIDTH : 150,
            HEIGHT : 100,
            HEALTH : 3,
            ROCKETS : 4,
        }
    },
    EXIRS_MAP: {
        RUBY: {
            NAME: 'RUBY',
            IMAGE: 'ruby.png',
            ACTION: 'CHANGE_WEAPON',
            VALUE: 'RUBY'
        },
        PYTHON: {
            NAME: 'PYTHON',
            IMAGE: 'python.png',
            ACTION: 'CHANGE_WEAPON',
            VALUE: 'PYTHON'
        }
    },

    GAME_MAP: {
        1: {
            NAME: 'Kill Dukes',
            ENEMY_SPEED: 5,
            EXIRS: ['RUBY','PYTHON'],
            ENEMIES: ['DUKE'],
            MONSTER: ['ORACLE']

        },
        2: {
            NAME: 'Kill Microsoft',
            ENEMY_SPEED: 10,
            EXIRS: ['RUBY','PYTHON'],
            ENEMIES: ['DUKE'],
            MONSTER: ['ORACLE']

        },
        3: {
            NAME: 'Kill Microsoft',
            ENEMY_SPEED: 10,
            EXIRS: ['RUBY','PYTHON'],
            ENEMIES: ['DUKE'],
            MONSTER: ['ORACLE']
        }

    },

    terminalElement: document.getElementById('cmds'),

    init: function (options) {

        ZOMBIES.hero = new Hero('assets/images/heros/male-hero.png', ZOMBIES.HEROHEIGHT, ZOMBIES.HEROWIDTH);
        ZOMBIES.hero.addClass('animated');
        ZOMBIES.hero.addClass('fadeInUp');

        for (var i = 1 ; i <= ZOMBIES.hero.live ; i++){
            var lives = document.createElement('div');
            lives.classList.add("heart");
            lives.classList.add("pulse2");
            lives.style.right = (i*3) + '%';
            lives.innerText='♥';
            lives.id="lives"+i;
            document.body.appendChild(lives);
        }

        setTimeout(function () {
            ZOMBIES.hero.removeClass('animated');
            ZOMBIES.hero.removeClass('fadeInUp');
        },800);

        ZOMBIES.scoreDiv = document.getElementById('score');
        ZOMBIES.weaponsListDiv = document.getElementById('weapons_list');

        document.onkeydown = function (evt) {
            ZOMBIES.toggleKey(evt.keyCode, true);
        };

        document.onkeyup = function (evt) {
            ZOMBIES.toggleKey(evt.keyCode, false);
        };

        ZOMBIES.loop();
        ZOMBIES.refreshWeaponsList();
    }
    ,
    loop: function () {
        if (new Date().getTime() - ZOMBIES.lastLoopRun > 40) {
            ZOMBIES.updatePositions();
            ZOMBIES.hero.handelControllers();
            ZOMBIES.checkCollisions();

           // if(!ZOMBIES.monster)
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
            } else if(!ZOMBIES.enemies[i].monster && (ZOMBIES.enemies[i].direction == null )) {
                ZOMBIES.enemies[i].y += ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].ENEMY_SPEED;
                if(ZOMBIES.enemies[i].x < GAME_WIDTH / 10 ){
                  ZOMBIES.enemies[i].direction = "right";
                }else if (ZOMBIES.enemies[i].x > GAME_WIDTH - (GAME_WIDTH / 10)){
                  ZOMBIES.enemies[i].direction = "left";
                }
                if (ZOMBIES.enemies[i].direction == 'left') {
                    ZOMBIES.enemies[i].x -= ZOMBIES.helpers.getRandom(10);
                }
                if (ZOMBIES.enemies[i].direction == 'right') {
                    ZOMBIES.enemies[i].x += ZOMBIES.helpers.getRandom(10);
                }

                //ZOMBIES.enemies[i].x += ZOMBIES.helpers.getRandom(10) - 5;
            }else{
                    if(!ZOMBIES.enemies[i].monster)
                    ZOMBIES.enemies[i].y += 20;

              if(ZOMBIES.enemies[i].direction == null ){
                if(ZOMBIES.helpers.getRandom(2) == 1){
                  ZOMBIES.enemies[i].direction = "left";
                }else{
                  ZOMBIES.enemies[i].direction= "right";
                }
              }else{

                if(ZOMBIES.enemies[i].x < GAME_WIDTH / 10 ){
                  ZOMBIES.enemies[i].direction = "right";
                  console.log("Direction changed to right ") ;
                }else if (ZOMBIES.enemies[i].x > GAME_WIDTH - (GAME_WIDTH / 10)){
                  ZOMBIES.enemies[i].direction = "left";
                  //console.log("Direction changed to left ") ;
                }
              }
              if(ZOMBIES.enemies[i].direction == "right"){
                ZOMBIES.enemies[i].x += 10;

              }
              if(ZOMBIES.enemies[i].direction == "left"){
                ZOMBIES.enemies[i].x -= 10;
              }
              //console.log(ZOMBIES.MONSTERS_MAP[ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].MONSTER].DIRECTION );
              //console.log(ZOMBIES.enemies[i].x);
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

        if (ZOMBIES.MY_WEAPONS.length > 1 && !ZOMBIES.FINISH ) {
            var current_weapon_index = ZOMBIES.getCurrentWeaponIndex();
            if (keyCode == ZOMBIES.NEXT_WEAPON && !isPressed) {
                current_weapon_index++;
                if (current_weapon_index >= ZOMBIES.MY_WEAPONS.length) {
                    current_weapon_index = 0;
                }
                ZOMBIES.CURRENT_WEAPON = ZOMBIES.MY_WEAPONS[current_weapon_index];
                ZOMBIES.refreshWeaponsList();
            }
            if (keyCode == ZOMBIES.PREV_WEAPON  && !isPressed ) {
                current_weapon_index--;
                if (current_weapon_index < 0) {
                    current_weapon_index = ZOMBIES.MY_WEAPONS.length - 1;
                }
                ZOMBIES.CURRENT_WEAPON = ZOMBIES.MY_WEAPONS[current_weapon_index];
                ZOMBIES.refreshWeaponsList();
            }
        }
        if (keyCode == ZOMBIES.SPACE_KEY && !ZOMBIES.FINISH && !isPressed) {
            if (ZOMBIES.laserArray.length < 3) {
                var laserMultiple = ZOMBIES.WEAPONS_MAP[ZOMBIES.CURRENT_WEAPON].MULTIPLE;

                // to make the weapon shoot more than one rocket
                for (var i = 1; i <= laserMultiple; i++) {
                    //if we have 3 rockets 1 = left , 2 = center, 3 = right and so on
                    var laserDirection = 'straight';

                    //if weapon has the Multiple option
                    if (laserMultiple > 1) {
                        //if i less than the middle to left
                        if (i < Math.ceil(laserMultiple/2)) {
                            laserDirection = 'left';
                        }else if (i > Math.ceil(laserMultiple/2)) {
                            laserDirection = 'right';
                        }
                    }

                    var lasser = new Laser('assets/images/weapons/' + ZOMBIES.WEAPONS_MAP[ZOMBIES.CURRENT_WEAPON].IMAGE, 20, 20, ZOMBIES.hero.x + (ZOMBIES.hero.w / 2) - 10, ZOMBIES.hero.y,laserDirection);

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
                    if(typeof ZOMBIES.WEAPONS_LIMITS[ZOMBIES.CURRENT_WEAPON] == 'undefined'){
                        ZOMBIES.WEAPONS_LIMITS[ZOMBIES.CURRENT_WEAPON] = ZOMBIES.WEAPONS_MAP[ZOMBIES.CURRENT_WEAPON].LIMIT;
                    }else{
                        //decrement
                        ZOMBIES.WEAPONS_LIMITS[ZOMBIES.CURRENT_WEAPON] -= 1;
                    }
                    //back to the previous weapon in the list
                    if (ZOMBIES.WEAPONS_LIMITS[ZOMBIES.CURRENT_WEAPON] <= 0) {
                        //exceed the limit, remove the weapon from my weapons by get index first then splice
                        var current_weapon_index = ZOMBIES.getCurrentWeaponIndex();
                        ZOMBIES.MY_WEAPONS.splice(current_weapon_index, 1);
                        ZOMBIES.addToTerminal('sudo apt-get purge ' + ZOMBIES.CURRENT_WEAPON);
                        //set current weapon to the previous weapon (index - 1) , it will never be 0 because os always the first, because its infinite
                        ZOMBIES.CURRENT_WEAPON = ZOMBIES.MY_WEAPONS[current_weapon_index - 1];
                    }
                }

                ZOMBIES.refreshWeaponsList();

            }
        }
    }
    ,
    checkCollisions: function () {
        for (var i = 0; i < ZOMBIES.exirArray.length; i++) {
            if (ZOMBIES.intersects(ZOMBIES.hero, ZOMBIES.exirArray[i])) {
                if (ZOMBIES.exirArray[i].config.ACTION == 'CHANGE_WEAPON') {
                    //if it is a new weapon, if i have the weapon just increase the limit and not change weapon
                    if (ZOMBIES.MY_WEAPONS.indexOf(ZOMBIES.exirArray[i].config.VALUE) == -1) {
                        ZOMBIES.CURRENT_WEAPON = ZOMBIES.exirArray[i].config.VALUE;
                    }
                    ZOMBIES.addToTerminal('sudo apt-get install ' + ZOMBIES.exirArray[i].config.VALUE);
                    // to add the weapon to the list to toggle between them
                    ZOMBIES.addWeapon(ZOMBIES.exirArray[i].config.VALUE);
                }
                ZOMBIES.exirArray[i].remove();
                ZOMBIES.exirArray.splice(i, 1);
            }
        }

        for (var i = 0; i < ZOMBIES.enemies.length; i++) {

            var laser = ZOMBIES.getIntersectingLaser(ZOMBIES.enemies[i]);
            if (laser && !ZOMBIES.enemies[i].monster) {
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

                if(ZOMBIES.hero.live > 1 ){
                  ZOMBIES.addToTerminal('<span style="color:red;">Fetal Error, entering rescue mode... </span>');
                }else{
                  ZOMBIES.addToTerminal('<span style="color:red;">KERNEL ERROR! System require Manual reset</span>');
                }
                ZOMBIES.enemies[i].onDie();
                (function () {
                    var i2 = i;
                    // kazafy >> copy hassan code to remove enemy when intersect whith hero
                    // Hassan Edit, removed the enemy immediatly after it die instead of in timeout because of a BUG !
                    ZOMBIES.enemies[i2].onDie();
                    var temp = ZOMBIES.enemies[i2];
                    ZOMBIES.enemies.splice(i2, 1);
                    setTimeout(function () {

                        temp.remove();
                    }, 500);
                    })();

                ZOMBIES.gameOver();
            }else if (laser && ZOMBIES.enemies[i].monster) {
                var monsterKey = ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].MONSTER ;
                var monsterConfig = ZOMBIES.MONSTERS_MAP[monsterKey];
                laser.remove();
                ZOMBIES.laserArray.splice(ZOMBIES.laserArray.indexOf(laser), 1);
                if (monsterConfig.HEALTH == 1) {
                    (function () {
                        var i2 = i;
                        // Hassan Edit, removed the enemy immediatly after it die instead of in timeout because of a BUG !
                        ZOMBIES.enemies[i2].onDie();
                        ZOMBIES.monsterObj = null;
                        console.log(ZOMBIES.monsterObj);
                        var temp = ZOMBIES.enemies[i2];
                        ZOMBIES.enemies.splice(i2, 1);
                        setTimeout(function () {

                            temp.remove();
                        }, 500);
                    })();
                }else{

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
    }
    ,
    gameOver: function () {

        document.body.removeChild(document.getElementById("lives"+ZOMBIES.hero.live));
        ZOMBIES.hero.live-- ;
        ZOMBIES.FINISH = true;
        var element = document.getElementById(hero.id);
        element.style.visibility = 'hidden';
        if(ZOMBIES.hero.live > 0){
        setTimeout(function () {
            ZOMBIES.FINISH = false;
            var element = document.getElementById(hero.id);
            element.style.visibility = 'visible';
            ZOMBIES.hero.x = window.innerWidth / 2 - 25;
            ZOMBIES.hero.y = window.innerHeight - 150;
            ZOMBIES.addToTerminal("<span style='color:green;'>sudo resurrect hero </span>")
            ZOMBIES.loop();
        },3000);
        }
        else{

        }

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
        if (score % 3000 == 0) {
            ZOMBIES.addMonster();
            ZOMBIES.LEVEL++;
            ZOMBIES.interval -= 5;
            ZOMBIES.addToTerminal('sudo apt-get update level');
        }
    },
    helpers: {
        getRandom: function (maxSize) {
            return parseInt(Math.random() * maxSize);
        }
    },
    getCurrentWeaponIndex: function () {
      return ZOMBIES.MY_WEAPONS.indexOf(ZOMBIES.CURRENT_WEAPON);
    },
    addToTerminal: function (cmd) {
        var cmdElement = document.createElement('p');
        cmdElement.innerHTML = '<strong>root@Zombies:~$</strong> ' + cmd.toLowerCase();
        ZOMBIES.terminalElement.appendChild(cmdElement);
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
    addWeapon : function (weapon) {
        //if i do not have this weapon, add it to the list
        if (ZOMBIES.MY_WEAPONS.indexOf(weapon) == -1) {
            ZOMBIES.MY_WEAPONS.push(weapon);
            ZOMBIES.WEAPONS_LIMITS[weapon] = ZOMBIES.WEAPONS_MAP[weapon].LIMIT
        }else{
            //if i have the weapon increase the list by the weapon limit
            ZOMBIES.WEAPONS_LIMITS[weapon] += ZOMBIES.WEAPONS_MAP[weapon].LIMIT
        }

        ZOMBIES.refreshWeaponsList();
    },
    addEnemy: function () {
        if (ZOMBIES.helpers.getRandom(ZOMBIES.interval) == 0) {

            var enemyKey = ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].ENEMIES.random();
            var enemyConfig = ZOMBIES.ENEMIES_MAP[enemyKey];

            var enemyObj = new Enemy('assets/images/enemy/' + enemyConfig.IMAGE.random(), enemyConfig.HEIGHT, enemyConfig.WIDTH);

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
        var monsterKey = ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].MONSTER;
        var monsterConfig = ZOMBIES.MONSTERS_MAP[monsterKey];
        ZOMBIES.monsterObj = new Enemy('assets/images/enemy/' + monsterConfig.IMAGE, monsterConfig.HEIGHT, monsterConfig.WIDTH,true, GAME_WIDTH/2);
        ZOMBIES.monsterObj.addClass('fadeInDown');
        ZOMBIES.enemies.push(ZOMBIES.monsterObj);
        ZOMBIES.monsterAction();

    },
    /*
      add animation to monster
    */
    monsterAction: function(){
        if(ZOMBIES.monsterObj != null && !ZOMBIES.FINISH)
        {
             ZOMBIES.monsterObj.toggleClass('monster-rotate');
             setTimeout('ZOMBIES.monsterAction(); ZOMBIES.monsterAttak();', 5000);
        }

    },
    /*
    function to add rockets to monster
    the same logic of multiple laser rocket
    */
    monsterAttak: function(){
        if(ZOMBIES.monsterObj != null && !ZOMBIES.FINISH) {
            var monsterKey = ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].MONSTER;
            var monsterConfig = ZOMBIES.MONSTERS_MAP[monsterKey];
            // to make the monster shoot more than one rocket
            for (var i = 1; i <= monsterConfig.ROCKETS; i++) {
                //if we he 3 rockets 1 = left , 2 = center, 3 = right and so on
                var enemyDirection = 'straight';

                //if monster has the Multiple option
                if (monsterConfig.ROCKETS > 1) {
                    //if i less than the middle to left
                    if (i < Math.ceil(monsterConfig.ROCKETS/2)) {
                        enemyDirection = 'left';
                    }else if (i > Math.ceil(monsterConfig.ROCKETS/2)) {
                        enemyDirection = 'right';
                    }
                }

                var enemyKey = ZOMBIES.GAME_MAP[ZOMBIES.CURRENT_LEVEL].ENEMIES.random();
                var enemyConfig = ZOMBIES.ENEMIES_MAP[enemyKey];


                var monsterRockets =  new Enemy('assets/images/enemy/' + enemyConfig.IMAGE.random(), enemyConfig.HEIGHT, enemyConfig.WIDTH, false,  ZOMBIES.monsterObj.x + (ZOMBIES.monsterObj.w / 2) - 10, ZOMBIES.monsterObj.y,enemyDirection);

                if (enemyConfig.ANIMATE) {
                    monsterRockets.addClass('animated');
                    monsterRockets.addClass('infinite');
                    monsterRockets.addClass(enemyConfig.ANIMATE.random());
                }
                ZOMBIES.enemies.push(monsterRockets);
            }
        }
    },
};
ZOMBIES.init();
