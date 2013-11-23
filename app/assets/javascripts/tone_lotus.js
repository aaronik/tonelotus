window.ToneLotus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {
    isMouseDown: false
  },

  matrixHash: {},
  matrixArray: [],

  initialize: function() {
  	var $matrixEl = $('#matrix-wrapper');
    var $stageEl = $('#stage-wrapper');

  	ToneLotus.router = new ToneLotus.Routers.AppRouter($matrixEl, $stageEl);
  	Backbone.history.start();

    ToneLotus.Store.delegateDraggable();
  }
};

$(document).ready(function(){
  ToneLotus.initialize();

  console.log("Welcome to Tone Lotus.  ;)");
});
