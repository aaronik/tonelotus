$(document).ready(function(){

	$('#matrix-wrapper').droppable({
    activeClass: 'droppable-active',
    accept: '.staged-matrix',

    drop: function(event){
      var draggedMatrix = ToneLotus.Store.getBackboneMatrixByJqueryEvent(event);

      if( draggedMatrix ){
	      ToneLotus.router.unstageMatrix(draggedMatrix);
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

    $('.track').droppable({
    activeClass: 'droppable-active',

    drop: function(event){
      if( !$(event.toElement).hasClass('tracked') ){
        // if pulled from stage
        var $ref = $(event.toElement).clone();
        $ref.addClass('tracked');
        $ref.removeClass('staged');
        $ref.removeClass('staged-matrix');
      } else {
        // if already a track
        $ref = $(event.toElement);
      }

      // why does this happen sometimes???
      if($ref.is('html')){
        console.log('whoops, looks like droppable had an error.')
        return
      }

      $(event.target).children('ul').append('<li></li>');
      $(event.target).children('ul').children('li').last().append($ref);
      $ref.attr('style', 'position: relative; left: 0; top: 0;');

      var matrix;

      if( $(event.toElement).hasClass('blank-track') ){
        $ref.attr('data-cid', 'blank');
      } else {
        matrix = ToneLotus.Store.getBackboneMatrixByJqueryEvent(event);
        matrix.track();
      }

      ToneLotus.Store.delegateDraggable();
    }
  });

	$('.track-ul').sortable();

});

ToneLotus.Store.delegateDraggable = function(){
  $('.staged, .tracked').draggable({
    revert: true,
    revertDuration: 150,
    disabled: false,
    cancel: '.live-matrix',

    stop: function(event){
      $(event.toElement).attr('style',"position: relative; left: 0; top: 0"); // must check this out
    }
  });
}