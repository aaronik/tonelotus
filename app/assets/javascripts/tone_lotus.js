window.ToneLotus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  matrixHash: {},

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
    // if(eventObject.which == 32){
    //   Backbone.trigger('spacePress');
    // }

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
    animate: 150,
    active: false,
    heightStyle: 'content'
  });

  //listen for instrument changes
  $('.instrument').click(function(event){
    $('.instrument').removeClass('selectedInstrument');
    $(event.target).addClass('selectedInstrument');

    Backbone.trigger(event.target.id);
  })

  $('.eventControls').click(function(event){
    console.log(event.target.id);
    Backbone.trigger(event.target.id);
  })

  $('#update-time-button').click(function(){
    Backbone.trigger('updateTime');
  })
});
