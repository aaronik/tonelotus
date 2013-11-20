window.ToneLotus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  matrixHash: {},
  matrixArray: [],
  isMouseDown: false,

  initialize: function() {
  	var $matrixEl = $('#matrix-wrapper');
    var $stageEl = $('#stage-wrapper');

  	ToneLotus.router = new ToneLotus.Routers.AppRouter($matrixEl, $stageEl);
  	Backbone.history.start();

    ToneLotus.delegateDraggable();
  }
};

$(document).ready(function(){
  ToneLotus.initialize();
});
