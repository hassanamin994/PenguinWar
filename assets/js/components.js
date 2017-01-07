var GAME_WIDTH = window.innerWidth-90;
var GAME_HEIGHT = window.innerHeight-50;

var Component = function(img,h,w){
    this.img = img ;
    this.h = h ;
    this.w = w ;
    this.id = "" ;
    Object.defineProperty(this,'x',{
      get : function(){
        return x ;
      },
      set : function(xinput){
          x = xinput ;
        if(x < 20 ){
          x = 20
        }
        if(x + w > GAME_WIDTH ){
          
          x = GAME_WIDTH - w ;
        }
         
      }
    });
    Object.defineProperty(this,'y',{
      get : function() {
        return y ;
      },
      set : function(yinput){
        y = yinput
        console.log(yinput);
        console.log(GAME_HEIGHT);
        console.log(h);
        if( y < 20 ){
          y = 20 ;
        }
        if(y + h > GAME_HEIGHT ){
          y = GAME_HEIGHT - h ;
        }
      }
    });
}
Component.prototype.move = function(){}
Component.prototype.setPosition = function(x,y){
  if(x){
    var e = document.getElementById(this.id);
    console.log(this)
    this.x= x  ;
    e.style.left = x + 'px';
  }
  if(y){
    var e = document.getElementById(this.id);
    this.y = y  ;
    e.style.top = y + 'px';
  }
}


var component = new Component('/images/penguin.png',100,50);
// component.x = 10 ;
// component.y = 10 ;
// console.log(component.x) ;
//
// console.log(component.y) ;
// console.log(component.img) ;
// component.setPosition(200) ;
// console.log(component.x) ;
//
// console.log(component.y) ;
