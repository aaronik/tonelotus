$(document).ready(function(){
  $(document).keypress(function(eventObject){
    console.log(eventObject.which);
    switch(eventObject.which){
      case 32: //space
        Backbone.trigger('spacePress');
        break;
      case 112: //p
        Backbone.trigger('pause');
        break;
      case 115: //s
        Backbone.trigger('stage');
        break;
      case 99: //c
        Backbone.trigger('clear');
        break;
    }
  })
})
