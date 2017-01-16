var characters = document.getElementById('form').getElementsByTagName('img') ;
var username = document.getElementById('username') ;
var errors = document.getElementById('errors').getElementsByTagName('ul')[0] ;
var charactersInput = document.getElementsByName('character');
var form = document.getElementsByTagName('form')[0] ;
var newgameDiv = document.getElementById('new-game');
var newgameButton = document.getElementsByClassName('new-game-button') ;
var highscoresDiv = document.getElementById('high-scores');
var highscoresButton = document.getElementsByClassName('high-scores-button') ;


// setting animation for the new game menu
for( i = 0 ; i < newgameButton.length ; i++ ){
  newgameButton[i].addEventListener('click',function(e){
    if(highscoresDiv.style.visibility == "visible"){
      highscoresDiv.style.visibility = "hidden" ;
      highscoresDiv.style.left = "-50%";
    }
    newgameDiv.style.visibility = "visible" ;
    newgameDiv.style.left = "25%" ;
  });
}

//
for ( i = 0 ; i < highscoresButton.length ; i++ ){
  highscoresButton[i].addEventListener('click',function(e){
    if(newgameDiv.style.visibility == "visible"){
      newgameDiv.style.visibility = "hidden" ;
      newgameDiv.style.left = "-50%";
    }
    highscoresDiv.style.visibility = "visible" ;
    highscoresDiv.style.left = "25%" ;
  });
}

// event listeners for characters in the new game menu
for( i = 0 ; i < characters.length ; i++ ){
  characters[i].addEventListener('click',function(e){
    for( j = 0 ; j < characters.length ; j++  ){
      characters[j].style.border = "none" ;
      console.log(characters[j].style.border);
    }
    e.target.parentElement.getElementsByTagName('input')[0].checked=true;
    e.target.style.border = "5px solid blue";
  });
}
// Form Validation
form.addEventListener('submit',function(e){
  var validform = true;
  errors.innerHTML = "" ;
  if(!username.value)
  {
    errors.innerHTML += "<li>Name field is required!</li>" ;
    validform = false ;
  }
  if(!(charactersInput[0].checked || charactersInput[1].checked)){
    errors.innerHTML += "<li>Please select a character !</li>" ;
    validform = false ;
  }
  if(!validform){
        e.preventDefault() ;
  }else{
    e.preventDefault() ;
    // Hiding the menu if the form is valid
    // and Initializing the game
    document.getElementById('menu-div').style.zindex = "-9999" ;
    document.getElementById('menu-div').style.visibility = 'hidden' ;
    document.getElementById('menu-div').style.left= "-9999px" ;
    document.getElementById('go').blur() ;
    var gender ;
    for (var i = 0; i < charactersInput.length; i++) {
        if (charactersInput[i].checked) {
            gender = charactersInput[i].value;
            break;
        }
    }

    if(!ZOMBIES.started)
      ZOMBIES.init(gender) ;
      else
      {
        // calling restart to reset any previous values so user can start new game when die from the menu
        ZOMBIES.restart(gender) ;
        // hiding the pause screen when user press new game from pause screen
        ZOMBIES.pauseDiv.style.display = 'none';
      }

    ZOMBIES.PLAYERS.push({name:username.value,highscore:0});
    ZOMBIES.CURRENT_PLAYER = {name:username.value,highscore:0} ;
    // setting current player in html
    ZOMBIES.playernameDiv.innerHTML = ZOMBIES.CURRENT_PLAYER.name ;
    setTimeout(document.getElementById('hero').focus() , 2000 )  ;
    // reset the username
        username.value = "" ;


  }

});
