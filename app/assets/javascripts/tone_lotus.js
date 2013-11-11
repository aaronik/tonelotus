window.ToneLotus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  matrixHash: {},
  isMouseDown: false,

  initialize: function() {
  	var $matrixEl = $('#matrix-wrapper');

  	new ToneLotus.Routers.AppRouter($matrixEl);
  	Backbone.history.start();
  }
};

$(document).ready(function(){

  // fire up the backbone
  ToneLotus.initialize();

  // listen for space press or others...
  $(document).keypress(function(eventObject){
    console.log(eventObject.which)
    switch(eventObject.which){
      case 32: 
        Backbone.trigger('spacePress');
        break;
      case 112:
        Backbone.trigger('pause');
        break;
    }
  })

  //make the menu on the side an accordion
  $('#menu-accordion').accordion({
    collapsible: true,
    animate: 200,
    // animated: 'bounceslide',
    active: false,
    heightStyle: 'content',
    event: 'mouseover click'
  });

  //listen for instrument changes
  $('.instrument').click(function(event){
    $('.instrument').removeClass('selectedInstrument');
    $(event.target).addClass('selectedInstrument');

    Backbone.trigger(event.target.id);
  })

  //temp, send Mainframe Operations events
  $('.eventControls').click(function(event){
    console.log(event.target.id);
    Backbone.trigger(event.target.id);
  })

  //when update time is clicked
  $('#update-time-button').click(function(){
    Backbone.trigger('updateTime');
  })

  //when tab is switched.  BROKEN - happens when terminal is brought up...
  // window.onblur = function(){
  //   Backbone.trigger('pause');
  // }

  //For click and drag tones on
  //Plays in harmony with .hover() listeners in tone views
  $(document).mousedown(function(){
    ToneLotus.isMouseDown = true;    
  }).mouseup(function(){
    ToneLotus.isMouseDown = false;
    console.log('mouse up')
  });

});
