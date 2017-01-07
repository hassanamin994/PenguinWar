var Laser = function  (img,height,width,laserX,laserY){

	var laserId = "laser"+new Date().getTime();
	var classCss = 'laser';

	Component.call(this, img,laserX,laserY,height, width,laserId,classCss);

}

Laser.prototype = Object.create(Component.prototype);
Laser.prototype.constractor = Laser;
