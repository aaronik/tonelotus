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
  }
};

ToneLotus.delegateDraggable = function(){
  $('.staged').draggable({
    revert: true
  });
},

$(document).ready(function(){

  // fire up the backbone
  ToneLotus.initialize();

  // listen for space press or others...
  $(document).keypress(function(eventObject){
    console.log(eventObject.which)
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
      case 107: //k
        Backbone.trigger('seppuku');
        break;
    }
  })

  //listen for instrument changes
  $('.instrument').click(function( event ){
    $('.instrument').removeClass('selectedInstrument');
    $(event.target).addClass('selectedInstrument');

    Backbone.trigger(event.target.id);
  })

  //temp, send Mainframe Operations events
  $('.eventControls').click(function( event ){
    console.log(event.target.id);
    Backbone.trigger(event.target.id);
  })

  //when update time is clicked
  $('#update-time-form').submit(function( event ){
    event.preventDefault();
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
  });

  //make the menu on the side an accordion
  $('#menu-accordion').accordion({
    collapsible: true,
    animate: 200,
    // animated: 'bounceslide',
    active: false,
    heightStyle: 'content',
    // event: 'mouseover click'
    event: 'click'
  });

  $('#matrix-wrapper').droppable({
    drop: function(event){
      console.log('dropped');
      // $(event.toElement).attr('style', '');

      var draggedMatrix = _.find(ToneLotus.matrixArray, function( matrix ){
        return matrix.cid == $(event.toElement).attr('data-cid');
      })

      draggedMatrix.$el.detach();

      draggedMatrix.unstage();
      draggedMatrix.redraw();
      $('#matrix-wrapper').html(draggedMatrix.$el);
      
      Backbone.trigger('delegateEvents');
    }
  });

});
