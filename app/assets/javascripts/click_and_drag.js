$(document).ready(function(){
	 //For click and drag tones on
  //Plays in harmony with .hover() listeners in tone views
  $(document).mousedown(function(){
    ToneLotus.isMouseDown = true;    
  }).mouseup(function(){
    ToneLotus.isMouseDown = false;
  });
})