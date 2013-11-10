ToneLotus.Routers.AppRouter = Backbone.Router.extend({
	initialize: function($matrixEl){
		this.$matrixEl = $matrixEl;
		this.instruments = ['fm_synth', 'drumkit_1', 'sine_pad'];

		var that = this;
		this.instruments.forEach(function(instrument){
			that.listenTo(Backbone, instrument, function(){
				that.drawMatrix(instrument);
			});
		});

		this.listenTo(Backbone, 'updateTime', this.updateTime);
		this.listenTo(Backbone, 'pause', this.pause);
	},

	routes: {
		'':'initializePage',
		':gridSize':'initializePage',
		':gridSize/:totalLoopTime':'initializePage'
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
		this.broadcastRedraw();

		this.gridSize = (gridSize || 16);
		this.totalLoopTime = (totalLoopTime || 2000);
		this.startMasterLoop();

		// initialize and draw the instrument the user will see first.
		var matrixView = this.initializeMatrix(this.instruments[0]);
		this.drawMatrix(this.instruments[0]);

		// initialize and DON"T draw the rest of the instruments
		var that = this;
		this.instruments.slice(1).forEach(function(instrument){
			that.initializeMatrix(instrument);
		})
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
		return matrixView;
	},

	drawMatrix: function(instrument){
		Backbone.trigger('delegateEvents');

		var matrixView = ToneLotus.matrixHash[instrument];
		this.$matrixEl.html(matrixView.$el);
	},

	pause: function(){
		if(this.masterLoop){
			this.removeMasterLoop();
			delete this.masterLoop;
			console.log('i detected a master loop')
		} else {
			this.startMasterLoop();
		}
	},

	startMasterLoop: function(){
		var that = this;
		var columnLoopTime = this.totalLoopTime / this.gridSize;
		var column = 0;

		this.masterLoop = setInterval(function(){
			Backbone.trigger(column);

			column = (column + 1) % that.gridSize;

		}, columnLoopTime)
	},

	broadcastRedraw: function(){
		// broadcast a universal redraw event, errbody listens, errbody decouples themselves from listenTos and the dom.  This is important for when the gridSize is redrawn and the whole page is redone.  This will be implemented, along with multiple sizings, way later.  16 is a good number for now.

		Backbone.trigger('masterRedraw');
	}

})