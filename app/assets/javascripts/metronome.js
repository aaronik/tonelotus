(function(root){

	var Metronome = (root.Metronome || {});

	Metronome.pause = function(){
		if( this.masterLoop ){
			this.killMasterLoop();
			this.lastLoopStartFunction = 'startMasterLoop';
			console.log('paused masterloop');
		} else if ( this.masterTrackLoop ){
			this.killMasterTrackLoop();
			this.lastLoopStartFunction = 'startMasterTrackLoop';
			console.log('paused track loop');
		} else {
			var funk = this.lastLoopStartFunction;
			var functionString = (funk ? funk : "startMasterLoop");
			this[functionString]();
		}
	};

	Metronome.killAllLoops = function(){
		this.masterLoop && this.killMasterLoop();
		this.masterTrackLoop && this.killMasterTrackLoop();
	};

	Metronome.killMasterLoop = function(){
		window.clearInterval(this.masterLoop);
		delete this.masterLoop;
	};

	Metronome.killMasterTrackLoop = function(){
		window.clearInterval(this.masterTrackLoop);
		delete this.masterTrackLoop;
	};

	Metronome.startMasterLoop = function(){
		this.killAllLoops();

		var that = this;
		var columnLoopTime = ToneLotus.Store.totalLoopTime / ToneLotus.Store.gridSize;
		var column = 0;

		this.masterLoop = setInterval(function(){
			var triggerString = "triggerColumn" + column;
			Backbone.trigger(triggerString);

			column = (column + 1) % ToneLotus.Store.gridSize;
		}, columnLoopTime)
	};

	Metronome.startMasterTrackLoop = function(){
		this.killAllLoops();

		var that = this;
		var columnLoopTime = ToneLotus.Store.totalLoopTime / ToneLotus.Store.gridSize;
		var matrixCidArrayHash = ToneLotus.Store.getMatrixCidArrayHash();
		var column = 0;
		var matrixIndex = 0;
		var matrixCidHelperString = '';
		var triggerString = '';
		var matrixCounterHelper = 0;
		var trackInstrumentIndex = 0;
		var sizeBiggestMatrix = ToneLotus.Store.findMaxLength(matrixCidArrayHash[0], 
			matrixCidArrayHash[1], matrixCidArrayHash[2]);

		this.masterTrackLoop = setInterval(function(){
			_(3).times(function(trackNumber){

				if( !(matrixCidArrayHash[trackNumber][trackInstrumentIndex]) ){
					matrixCidHelperString = 'blank';
				} else {
					matrixCidHelperString = matrixCidArrayHash[trackNumber][trackInstrumentIndex];
				}

				triggerString = 'tracked' + matrixCidHelperString + column;
				Backbone.trigger(triggerString);
			})

			column = (column + 1) % ToneLotus.Store.gridSize;

			if (column == 0) {
				trackInstrumentIndex = (trackInstrumentIndex + 1) % sizeBiggestMatrix;
			}
		}, columnLoopTime)
	};

	Metronome.updateTime = function(){
		var $updateTimeInput = $('#update-time-text-input');
		var bpm = parseInt($updateTimeInput.val());

		$updateTimeInput.attr('placeholder', bpm + ' bpm');
		$updateTimeInput.val('');

		var newTime = (240 / bpm) * 1000;

		ToneLotus.Store.totalLoopTime = newTime;
		this.pause();
		this.pause();
	};

})(ToneLotus);