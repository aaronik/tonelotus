$(document).ready(function(){
	 //For click and drag tones on
  //Plays in harmony with .hover() listeners in tone views
  $(document).mousedown(function(){
    ToneLotus.Store.isMouseDown = true;    
  }).mouseup(function(){
    ToneLotus.Store.isMouseDown = false;
  });
})