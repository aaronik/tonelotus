window.ToneLotus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	var $matrixEl = $('#matrix-wrapper');

  	new ToneLotus.Routers.AppRouter($matrixEl);
  	Backbone.history.start();

    // ToneLotus.tonesArray = // if tones are stored in here, maybe they won't need to be downloaded more than once? If they even are?
  }
};

$(document).ready(function(){
  ToneLotus.initialize();

  // listen for space press or others...
  $(document).keypress(function(eventObject){
    Backbone.trigger('spacePress');
  })
});
