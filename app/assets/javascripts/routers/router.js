ToneLotus.Routers.AppRouter = Backbone.Router.extend({
	initialize: function($matrixEl, $stageEl){
		this.$matrixEl = $matrixEl;
		this.$stageEl = $stageEl;
		this.instruments = ['synth', 'kit', 'pad'];

		this.initializeListeners();
	},

	initializeListeners: function(){
		this.listenTo( Backbone, 'updateTime', this.updateTime );
		this.listenTo( Backbone, 'pause', this.pause );
		this.listenTo( Backbone, 'stage', this.stageHandler );
		this.listenTo( Backbone, 'spacePress', this.spacePressHandler );

		var that = this;
		// set up a listener for each instrument
		this.instruments.forEach(function(instrument){

			that.listenTo(Backbone, instrument, function(){

				// make a new instrument if one doesn't already exist
				var matrix = ToneLotus.matrixHash[instrument];
				if(!matrix){
					matrix = that.initializeMatrix(instrument);
				}

				// do the things i need to do
				that.assignCurrentMatrix(matrix);
				that.drawMatrix(that.currentMatrix);
				that.changeMenuInstrumentSelector(instrument);

			});
		});
	},

	routes: {
		'':'initializePage',
		':gridSize':'initializePage',
		':gridSize/:totalLoopTime':'initializePage'
	},

	changeMenuInstrumentSelector: function(instrument){
		$('.instrument').removeClass('selectedInstrument');
    $('#' + instrument).addClass('selectedInstrument');
	},

	stageHandler: function(){
		var that = this;

		this.stageCurrent();
		this.stageRedraw(); // removing staged class from elements
		this.$matrixEl.html('<p>Select new instrument</p><p>Or drag from the stage</p><h2>ಠ益ಠ</h2>');
		this.$matrixEl.css('text-align', 'center');
	},

	stageCurrent: function(){
		this.currentMatrix.stage();
		delete ToneLotus.matrixHash[this.currentMatrix.instrument];
	},

	stageRedraw: function(){
		this.$stageEl.append($('.staged')); //honestly don't know why this works.
		// i predict this will cause problems in the future.
	},

	spacePressHandler: function(){
		$('.staged-matrix').off().remove();
		$('.tracked').off().remove();
		this.stageRedraw();
	},

	updateTime: function(){
		var $updateTimeInput = $('#update-time-text-input');
		var bpm = parseInt($updateTimeInput.val());

		$updateTimeInput.attr('placeholder', bpm + ' bpm');
		$updateTimeInput.val('');

		var newTime = (240 / bpm) * 1000;

		this.totalLoopTime = newTime;
		this.killMasterLoop();
		this.startMasterLoop();
	},

	initializePage: function(gridSize, totalLoopTime){
		this.broadcastRedraw(); // for diff grid sizes

		this.gridSize = (gridSize || 16);
		this.totalLoopTime = (totalLoopTime || 2000);
		this.startMasterLoop();

		// initialize and draw the instrument the user will see first.
		var matrixView = this.initializeMatrix(this.instruments[0]);
		this.assignCurrentMatrix(matrixView);
		this.drawMatrix(matrixView);

		ToneLotus.prefetchTones();

		// initialize but DON"T draw the rest of the instruments
		// var that = this;
		// this.instruments.slice(1).forEach(function(instrument){
		// 	that.initializeMatrix(instrument);
		// })
	},

	assignCurrentMatrix: function(matrix){
		this.currentMatrix && this.currentMatrix.removeCurrentMatrix();
		matrix.makeCurrentMatrix();
		this.currentMatrix = matrix;
	},

	initializeMatrix: function(instrument){
		// creates the matrix View, AND renders it.  

		var matrixView = new ToneLotus.Views.MatrixView({
			gridSize: this.gridSize,
			totalLoopTime: this.totalLoopTime,
			instrument: instrument
		});

		matrixView.render();

		ToneLotus.matrixHash[instrument] = matrixView;
		ToneLotus.matrixArray.push(matrixView);
		return matrixView;
	},

	drawMatrix: function(matrix){
		Backbone.trigger('delegateEvents');

		var that = this;
		console.log("from router / drawMatrix - given matrix then currentMatrix ");
		console.log(matrix);
		console.log(that.currentMatrix);
		
		this.$matrixEl.html(matrix.$el);
	},

	pause: function(){
		// must modify this to encompass mastertrackloop as well
		if( this.masterLoop ){
			this.killMasterLoop();
			this.lastLoopStartFunction = 'startMasterLoop';
			console.log('paused masterloop');
		} else if ( this.masterTrackLoop ){
			this.killMasterTrackLoop();
			this.lastLoopStartFunction = 'startMasterTrackLoop';
			console.log('paused track loop');
		} else {
			console.log(this.lastLoopStartFunction);
			this[this.lastLoopStartFunction]();
		}
	},

	removeMasterLoop: function(){
		window.clearInterval(this.masterLoop);
	},

	killMasterLoop: function(){
		window.clearInterval(this.masterLoop);
		delete this.masterLoop;
	},

	killMasterTrackLoop: function(){
		window.clearInterval(this.masterTrackLoop);
		delete this.masterTrackLoop;
	},

	startMasterLoop: function(){
		if(this.masterTrackLoop){
			this.killMasterTrackLoop();
		}

		var that = this;
		var columnLoopTime = this.totalLoopTime / this.gridSize;
		var column = 0;

		this.masterLoop = setInterval(function(){
			var triggerString = "triggerColumn" + column;
			Backbone.trigger(triggerString);

			column = (column + 1) % that.gridSize;
		}, columnLoopTime)
	},

	startMasterTrackLoop: function(){
		if(this.masterLoop){
			this.killMasterLoop();
		}

		var that = this;
		var columnLoopTime = this.totalLoopTime / this.gridSize;
		var matrixCidArrayHash = this.getMatrixCidArrayHash();
		var column = 0;
		var matrixIndex = 0;
		var matrixCidHelperString = '';
		var triggerString = '';
		var matrixCounterHelper = 0;
		var trackInstrumentIndex = 0;
		var sizeBiggestMatrix = ToneLotus.findMaxLength(matrixCidArrayHash[0], 
																									matrixCidArrayHash[1], 
																									matrixCidArrayHash[2]); //works

		this.masterTrackLoop = setInterval(function(){
			_(3).times(function(trackNumber){

				if( !(matrixCidArrayHash[trackNumber][trackInstrumentIndex]) ){
					matrixCidHelperString = 'blank';
				} else {
					matrixCidHelperString = matrixCidArrayHash[trackNumber][trackInstrumentIndex];
				}

				triggerString = 'tracked' + matrixCidHelperString + column;
				console.log(triggerString);
				Backbone.trigger(triggerString);
			})

			column = (column + 1) % that.gridSize;

			if (column == 0) {
				trackInstrumentIndex = (trackInstrumentIndex + 1) % sizeBiggestMatrix;
			}
		}, columnLoopTime)

	},

	// this is BAD FORM.  Must do things behind the curtain, and not rely on the curtain.
	// maybe not.  check out notes for comparrison / contrastisson
	getMatrixCidArrayHash: function(){
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
		console.log(matrixCidArrayHash);
		return matrixCidArrayHash;
	},



	broadcastRedraw: function(){
		// broadcast a universal redraw event, errbody listens, errbody decouples themselves from listenTos and the dom.  This is important for when the gridSize is redrawn and the whole page is redone.  This will be implemented, along with multiple sizings, way later.  16 is a good number for now.

		Backbone.trigger('masterRedraw');
	}

})