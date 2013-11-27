// /#/lt=<loop time>&i=<bit for staged or not><on/off><instrument>&i=...&t1=0b001%t2=bbbbb&t3=11111
// localhost:3000/#/lt=100&i=10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000synth&i=00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000pad&i=00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000pad&t1=0,0&t2=b,b&t3=b,b

(function(root){

	var State = root.State = (root.State || {});

	State.initialize = function(query){
		state = query.split("&");

		var prefix = '';
		state.forEach(function(item){
			prefix = item.slice(0, 2);

			switch(prefix){
				case 'lt':
					State.populateLoopTime(item);
					break;
				case 'i=':
					State.populateInstrument(item);
					break;
				case 't1':
					State.populateTracks(item, 1);
					break;
				case 't2':
					State.populateTracks(item, 2);
					break;
				case 't3':
					State.populateTracks(item, 3);
					break;
			}
		})

		ToneLotus.Metronome.startMasterLoop();
	};

	State.populateLoopTime = function(item){
		var newLoopTime = item.split("=")[1];
		console.log("new loop time is " + newLoopTime)
		$('#update-time-text-input').val(newLoopTime);
		Backbone.trigger('updateTime');
	};

	State.populateInstrument = function(item){
		var staged = item.split("=")[1][0];
		var tones = item.split("=")[1].slice(1, 257);
		var instrument = item.slice(259);

		var staged_note = (staged == 1 ? "staged" : "unstaged");
		console.log("detected " + staged_note + " " + instrument);

		var matrix = ToneLotus.Store.initializeMatrix(instrument);

		for(var i = 0; i < tones.length; i++){
			if(tones[i] == 1){
				matrix.toneViewArray[i].select();
			}
		}

		if(staged == 1){
			ToneLotus.router.stage(matrix);
		}

	};

	State.populateTracks = function(item, trackNumber){
		console.log("**** in State.populateTracks ****");
		var itemArray = item.split('=')[1].split(',');
		console.log(itemArray);

		var matrix;
		itemArray.forEach(function(matrixNumber){
			if(matrixNumber != 'b'){
				matrix = ToneLotus.Store.matrixArray[matrixNumber];
			} else {
				matrix = 'b';
			}
			
			State.trackMatrix(matrix, trackNumber);
		})
		console.log("**** leaving State.populateTracks ****");
	};

  State.trackMatrix = function(matrix, trackNumber){
	  if(matrix != 'b'){
	    matrix.track();
	    var $ref = matrix.$el.clone();
	  } else {
	    var $ref = $('.blank-track').eq(0).clone();
	    $ref.attr('data-cid', 'blank');
	  }

	  $ref.toggleClass('tracked staged staged-matrix');

	  var $track = $('#track' + trackNumber);

	  $track.children('ul').append('<li></li>');
	  $track.children('ul').children('li').last().append($ref);
	  $ref.attr('style', 'position: relative; left: 0; top: 0;');

	  ToneLotus.Store.delegateDraggable();
	};

})(ToneLotus);