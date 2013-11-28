// localhost:3000/#/lt=100&i=00001000000000000000001000000000000000001000000001000000000100100000000000000000000100000000000000000000000000000000000000000100000000000001000000000000000000000010000000000000000000000000000000000000000000000000000000001001000000000100000001001000100000000synth&i=00000000000000000000000000000000000000001100000000000000000110000010000000000000000010000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000100001001001pad&i=00000000010000000000000000000000000100000000000000000000000000000000000000000000000001000000000000000001000000000000000000000010010010001001001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000010001000000kit&t1=&t2=&t3=

// http://localhost:3000/#/lt=100&i=10001000000000000000001000000000000000001000000001000000000100100000000000000000000100000000000000000000000000000000000000000100000000000001000000000000000000000010000000000000000000000000000000000000000000000000000000001001000000000100000001001000100000000synth&i=10000000000000000000000000000000000000001100000000000000000110000010000000000000000010000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000100001001001pad&i=10000000010000000000000000000000000100000000000000000000000000000000000000000000000001000000000000000001000000000000000000000010010010001001001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000010001000000kit&t1=b,b,2,2,2&t2=b,b,1,1,1&t3=2,2,0,0,0

(function(root){

	var State = root.State = (root.State || {});

	//****** Begin Load functionality *******//
	State.load = function(query){
		ToneLotus.Store.prefetchTones();
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
		var itemArray = item.split('=')[1].split(',');

		if ( itemArray[0] == '' ){ return }

		var matrix;
		itemArray.forEach(function(matrixNumber){
			if(matrixNumber != 'b'){
				matrix = ToneLotus.Store.matrixArray[matrixNumber];
			} else {
				matrix = 'b';
			}

			State.trackMatrix(matrix, trackNumber);
		})
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
	//****** End Load functionality *******//

	//****** Begin Save functionality *******//
	State.save = function(){
		var url = 'localhost:3000/#/';
		url += State.generateLoopTime();
		url += State.generateInstruments();
		url += State.generateTracks();

		return url;
	};

	State.generateLoopTime = function(){
		var urlString = 'lt=' + (240 / ToneLotus.Store.totalLoopTime) * 1000; // that's bpm
		return urlString;
	};

	State.generateInstruments = function(){
		var urlString = '';
		ToneLotus.Store.matrixArray.forEach(function(matrix){
			urlString += '&';
			urlString += 'i=';

			var staged = (matrix.staged ? 1 : 0);
			urlString += staged;

			matrix.toneViewArray.forEach(function(tone){
				urlString += (tone.isSelected ? 1 : 0);
			})

			urlString += matrix.instrument;
		})

		return urlString;
	};

	State.generateTracks = function(){
		var urlString = '';
		var current_matrix;
		var index;

		for(var trackNumber = 1; trackNumber <= 3; trackNumber++){
			urlString += "&t" + trackNumber + "=";

			$('#track' + trackNumber).children('ul').children('li').children().each(function(i, matrix){
				current_matrix = ToneLotus.Store.getMatrixByCID($(matrix).attr('data-cid'));
				index = ToneLotus.Store.matrixArray.indexOf(current_matrix);
				if( !current_matrix ){ index = 'b' }
				urlString += index + ',';
			})
			console.log('in generateTracks, urlString = ' + urlString)
			if(urlString.slice(-1) == ','){ urlString = urlString.slice(0, -1) }
		}

		return urlString;
	};
	//****** End Save functionality *******//

})(ToneLotus);