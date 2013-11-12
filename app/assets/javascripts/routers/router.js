ToneLotus.Routers.AppRouter = Backbone.Router.extend({
	initialize: function($matrixEl, $stageEl){
		this.$matrixEl = $matrixEl;
		this.$stageEl = $stageEl;
		this.instruments = ['fm_synth', 'drumkit_1', 'sine_pad'];

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
		// var newMatrix = this.initializeMatrix(that.currentMatrix.instrument);
		// this.assignCurrentMatrix(newMatrix);
		this.stageRedraw();
		this.$matrixEl.html('<p>Select new instrument ಠ益ಠ</p>');
		this.$matrixEl.css('text-align', 'center');

		// this.drawMatrix(newMatrix);
	},

	stageCurrent: function(){
		this.currentMatrix.stage();
		delete ToneLotus.matrixHash[this.currentMatrix.instrument];
	},

	stageRedraw: function(){
		this.$stageEl.html($('.staged'));
	},

	spacePressHandler: function(){
		this.stageRedraw();
	},

	updateTime: function(){
		var bpm = parseInt($('#update-time-text-input').val())
		var newTime = (240 / bpm) * 1000;

		console.log(newTime);

		this.totalLoopTime = newTime;
		this.removeMasterLoop();
		this.startMasterLoop();
	},

	removeMasterLoop: function(){
		window.clearInterval(this.masterLoop);
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
		if(this.masterLoop){
			this.removeMasterLoop();
			delete this.masterLoop;
		} else {
			this.startMasterLoop();
		}
	},

	startMasterLoop: function(){
		var that = this;
		var columnLoopTime = this.totalLoopTime / this.gridSize;
		var column = 0;

		this.masterLoop = setInterval(function(){
			var triggerString = "triggerColumn" + column;
			Backbone.trigger(triggerString);

			column = (column + 1) % that.gridSize;

		}, columnLoopTime)
	},

	broadcastRedraw: function(){
		// broadcast a universal redraw event, errbody listens, errbody decouples themselves from listenTos and the dom.  This is important for when the gridSize is redrawn and the whole page is redone.  This will be implemented, along with multiple sizings, way later.  16 is a good number for now.

		Backbone.trigger('masterRedraw');
	}

})