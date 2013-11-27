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
      ToneLotus.Store.trackMatrixFromEvent(event);  
    }
  });

	$('.track-ul').sortable();

});