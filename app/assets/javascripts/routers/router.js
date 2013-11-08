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
	},

	routes: {
		'':'initializePage',
		':gridSize':'initializePage',
		':gridSize/:totalLoopTime':'initializePage'
	},

	updateTime: function(){
		newTime = parseInt($('#update-time-text-input').val())

		this.totalLoopTime = newTime;
		window.clearInterval(this.masterLoop);
		this.startMasterLoop();
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

	// drawMatrix: function(instrument){
	// 	var matrixView;
	// 	Backbone.trigger('delegateEvents'); // otherwise toneViews' events are decoupled

	// 	if(ToneLotus.existingMatrixHash[instrument]){
	// 		// if a matrix with this instrument has already been created
	// 		matrixView = ToneLotus.existingMatrixHash[instrument];

	// 		this.$matrixEl.html(matrixView.$el)
	// 	} else {
	// 		// otherwise create new matrixView, assign to global hash, render it up.
	// 		matrixView = new ToneLotus.Views.MatrixView({
	// 			gridSize: this.gridSize,
	// 			totalLoopTime: this.totalLoopTime,
	// 			instrument: instrument
	// 		});

	// 		ToneLotus.existingMatrixHash[instrument] = matrixView;

	// 		this.$matrixEl.html(matrixView.render().$el);
	// 	}
	// },

	startMasterLoop: function(){
		var that = this;
		var columnLoopTime = this.totalLoopTime / this.gridSize;
		var column = 0;

		this.masterLoop = setInterval(function(){
			column = (column + 1) % that.gridSize;

			Backbone.trigger(column);

		}, columnLoopTime)
	},

	broadcastRedraw: function(){
		// broadcast a universal redraw event, errbody listens, errbody decouples themselves from listenTos and the dom.  This is important for when the gridSize is redrawn and the whole page is redone.  This will be implemented, along with multiple sizings, way later.  16 is a good number for now.

		Backbone.trigger('masterRedraw');
	}

})