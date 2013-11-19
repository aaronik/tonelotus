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

ToneLotus.delegateDraggable = function(){
  $('.staged, .tracked').draggable({
    revert: true,
    revertDuration: 150,
    disabled: false,
    stop: function(event){
      $(event.toElement).attr('style',"position: relative; left: 0; top: 0");
    }
  });
}

ToneLotus.findMaxLength = function(){
  var maxLength = 0;

  for( i = 0; i < arguments.length; i++ ){
    if( arguments[i].length > maxLength ){
      maxLength = arguments[i].length;
    } 
  }

  return maxLength;
}

$(document).ready(function(){

  // fire up the backbone
  ToneLotus.initialize();

  // grab tone 147 for joyride
  $('.tone').eq(147).attr('id', 'joyride-tone');

  // listen for space press or others...
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
      case 107: //k
        Backbone.trigger('seppuku');
        break;
    }
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
    active: false,
    heightStyle: 'content',
    // event: 'mouseover click'
    event: 'click'
  });

  var getBackboneMatrixByJqueryEvent = function(event){
    return _.find(ToneLotus.matrixArray, function( matrix ){
      return matrix.cid == $(event.toElement).attr('data-cid');
    })
  }

  $('.track').droppable({
    activeClass: 'droppable-active',

    drop: function(event){
      if( !$(event.toElement).hasClass('tracked') ){
        var $ref = $(event.toElement).clone();
      } else {
        $ref = $(event.toElement);
      }

      $ref.addClass('tracked');
      $ref.removeClass('staged');
      $ref.removeClass('staged-matrix');

      $(event.target).children('ul').append('<li></li>');
      $(event.target).children('ul').children('li').last().append($ref);
      $ref.attr('style', 'position: relative; left: 0; top: 0;');

      var matrix;

      if( $(event.toElement).hasClass('blank-track') ){
        $ref.attr('data-cid', 'blank');
      } else {
        matrix = getBackboneMatrixByJqueryEvent(event);
        matrix.track();
      }

      ToneLotus.delegateDraggable();
    }
  });

  $('#matrix-wrapper').droppable({
    activeClass: 'droppable-active',
    accept: '.staged-matrix',

    drop: function(event){
      console.log(event);
      if( !($(event.toElement).hasClass('blank-track')) ){
        $(event.toElement).draggable("disable");

        var draggedMatrix = getBackboneMatrixByJqueryEvent(event);

        draggedMatrix.$el.detach();
        draggedMatrix.unstage();
        draggedMatrix.redraw();

        ToneLotus.matrixHash[draggedMatrix.instrument] = draggedMatrix;
        Backbone.trigger(draggedMatrix.instrument);
      }
    }
  });

  $('#stage-wrapper').droppable({
    activeClass: 'droppable-active',
    accept: '.tracked',

    drop: function(event){
      $(event.toElement).remove();
    }
  });

  $('.track-ul').sortable();

  $('#stage-title').click(function(){
    Backbone.trigger('stage');
  });

  //play the tracks
  $('#tracks-play-button').click(function(){
    ToneLotus.router.startMasterTrackLoop();
  });

  //play the matrix
  $('#main-play-button').click(function(){
    ToneLotus.router.startMasterLoop();
  });

  //pause button
  $('#pause-button').click(function(){
    Backbone.trigger('pause');
  });

  //listen for instrument changes
  $('.instrument').click(function( event ){
    Backbone.trigger(event.target.id);
  });

  //temp, send Mainframe Operations events
  // $('.eventControls').click(function( event ){
  //   console.log(event.target.id);
  //   Backbone.trigger(event.target.id);
  // })

  $('#help-button-launch-joyride').click(function(){
    // not sure why two is required, but it is.
    $('#joyride-ol').joyride({});
    $('#joyride-ol').joyride({});
  });

  //when update time is clicked
  $('#update-time-form').submit(function( event ){
    event.preventDefault();
    Backbone.trigger('updateTime');
  });

});
