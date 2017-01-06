var GAME_WIDTH = 480 ;

var Component = function(img,h,w){
    this.img = img ;
    this.h = h ;
    this.w = w ;
}
Component.prototype.setX = function(x){
  this.x = x ;
  if(x < 20 ){
    this.x = 20
  }
  if(this.x + this.w > GAME_WIDTH ){
    this.x = GAME_WIDTH - this.w ;
  }
}
Component.prototype.setY = function(y){
  this.y = y
  if( this.y < 20 ){
    this.y = 20 ;
  }
  if(this.y + this.h > GAME_WIDTH ){
    this.y = GAME_WIDTH - this.h ;
  }
}
Component.prototype.getX = function(){
  return this.x ;
}
Component.prototype.getY = function(){
  return this.y ;
}
Component.prototype.move = function(){}
Component.prototype.setPosition = function(x,y){
  if(x){
    this.setX(x) ;
  }
  if(y){
    this.setY(y) ;
  }
}


var component = new Component('/images/penguin.png',100,50);
// component.setX(10);
// component.setY(10) ;
// console.log(component.getX()) ;
//
// console.log(component.getY()) ;
// console.log(component.img) ;
// component.setPosition(200) ;
// console.log(component.getX()) ;
//
// console.log(component.getY()) ;
