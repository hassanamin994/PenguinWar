Enemy.prototype = Object.create(Component.prototype);
Enemy.prototype.constructor  = Enemy;

function Enemy(img,height,width) {
	Component.call(this,img, ZOMBIES.helpers.getRandom(GAME_WIDTH),-40,height,width,'enemy' + ZOMBIES.helpers.getRandom(1000000));
	this.element = document.createElement('img');
	this.move =function(){
    this.y += 4;
    this.x += ZOMBIES.helpers.getRandom(7) - 3;
    this.setPosition(this.x , this.y) ;
  };
}

var enemy = new Enemy('img',100,20) ;
console.log(enemy.x,enemy.y) ;
enemy.move();

console.log(enemy.x,enemy.y) ;
enemy.move();
console.log(enemy.x,enemy.y) ;
enemy.move();
console.log(enemy.x,enemy.y) ;
enemy.move();
