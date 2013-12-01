(function(root){
  var Store = root.Store = (root.Store || {});

  Store.columnLoopTime = ToneLotus.Metronome.totalLoopTime / ToneLotus.Store.gridSize;

  Store.findMaxLength = function(){
    var maxLength = 0;

    for( i = 0; i < arguments.length; i++ ){
      if( arguments[i].length > maxLength ){
        maxLength = arguments[i].length;
      } 
    }

    return maxLength;
  };

  Store.getBackboneMatrixByJqueryEvent = function(event){
    return _.find(ToneLotus.Store.matrixArray, function( matrix ){
      return matrix.cid == $(event.toElement).attr('data-cid');
    })
  };

  Store.stagedMatrices = function(){

  };

  Store.trackedMatrices = function(){

  };

  Store.findMatrix = function(instrument){
    // find a matrix from the hash, an unstaged one from the array, or make a new one
    if( ToneLotus.Store.matrixHash[instrument] ){
      var matrix = ToneLotus.Store.matrixHash[instrument];
    } else if( Store.getUnstagedMatrixFromArray(instrument) ){
      var matrix = Store.getUnstagedMatrixFromArray(instrument)
    } else {
      var matrix = ToneLotus.Store.initializeMatrix(instrument);
    }

    return matrix;
  };

  Store.getUnstagedMatrixFromArray = function(instrument){
    var final_matrix;

    ToneLotus.Store.matrixArray.forEach(function(matrix){
      if( !matrix.staged && matrix.instrument == instrument ){
        final_matrix = matrix;
      }
    })

    return final_matrix;
  };

  Store.getMatrixCidArrayHash = function(){
    var matrixCidArrayHash = {};
    var matrixCidArray0 = [];
    var matrixCidArray1 = [];
    var matrixCidArray2 = [];

    $('#track1')
      .children('ul')
        .children('li')
          .children('div')
            .each(function(i,div){

      matrixCidArray0.push($(div).attr('data-cid'));
    });
    matrixCidArrayHash[0] = matrixCidArray0;

    $('#track2')
      .children('ul')
        .children('li')
          .children('div')
            .each(function(i,div){

      matrixCidArray1.push($(div).attr('data-cid'));
    });
    matrixCidArrayHash[1] = matrixCidArray1;

    $('#track3')
      .children('ul')
        .children('li')
          .children('div')
            .each(function(i,div){

      matrixCidArray2.push($(div).attr('data-cid'));
    });
    matrixCidArrayHash[2] = matrixCidArray2;

    // matrixCidArrayHash is a hash with keys 1,2,3, each representing a track.
    // the values to each key is an array of the cids of the matrices in that track.
    return matrixCidArrayHash;
  };

  Store.initializeMatrix = function(instrument){
    // creates the matrix Model.

    var matrix = new ToneLotus.Models.Matrix({},{
      gridSize: ToneLotus.Store.gridSize,
      totalLoopTime: ToneLotus.Metronome.totalLoopTime,
      instrument: instrument
    });

    ToneLotus.Store.matrixHash[instrument] = matrix;
    ToneLotus.Store.matrixArray.push(matrix);
    return matrix;
  };

  Store.delegateDraggable = function(){
    $('.staged, .tracked').draggable({
      revert: true,
      revertDuration: 150,
      disabled: false,
      cancel: '.live-matrix',

      stop: function(event){
        $(event.toElement).attr('style',"position: relative; left: 0; top: 0"); // must check this out
      }
    });
  };

  Store.trackMatrixFromEvent = function(event){
    // why does this happen sometimes???
    if($(event.toElement).is('html')){
      console.log('whoops, looks like droppable had an error.')
      return
    }

    if( !$(event.toElement).hasClass('tracked') ){
      // if pulled from stage
      var $ref = $(event.toElement).clone();
      $ref.addClass('tracked');
      $ref.removeClass('staged');
      $ref.removeClass('staged-matrix');
    } else {
      // if already a track
      var $ref = $(event.toElement);
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
  };

  Store.getMatrixByCID = function(cid){
    var final_matrix;

    ToneLotus.Store.matrixArray.forEach(function(matrix){
     if(matrix.cid == cid){
      final_matrix = matrix;
     }
    })

    return final_matrix;
  };

})(ToneLotus);
