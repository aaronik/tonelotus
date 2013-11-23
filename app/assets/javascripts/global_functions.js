ToneLotus.Store.findMaxLength = function(){
  var maxLength = 0;

  for( i = 0; i < arguments.length; i++ ){
    if( arguments[i].length > maxLength ){
      maxLength = arguments[i].length;
    } 
  }

  return maxLength;
};

ToneLotus.Store.getBackboneMatrixByJqueryEvent = function(event){
  return _.find(ToneLotus.matrixArray, function( matrix ){
    return matrix.cid == $(event.toElement).attr('data-cid');
  })
};

// ToneLotus.delegateDraggable() is in draggable_droppables.js.