window.ToneLotus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  existingMatrixHash: {},

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
    Backbone.trigger('spacePress');
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
    // console.log(event.target.id)
    Backbone.trigger(event.target.id);
  })

  $('.eventControls').click(function(event){
    Backbone.trigger(event.target.id);
  })
});
