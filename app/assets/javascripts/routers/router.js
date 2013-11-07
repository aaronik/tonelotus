ToneLotus.Routers.AppRouter = Backbone.Router.extend({
	initialize: function($matrixEl){
		this.$matrixEl = $matrixEl;

		this.listenTo(Backbone, 'drumkit_1', function(){ this.drawMatrix('drumkit_1') });
		this.listenTo(Backbone, 'fm_synth', function(){ this.drawMatrix('fm_synth') });
	},

	routes: {
		'':'initializePage',
		':gridSize':'initializePage',
		':gridSize/:totalLoopTime':'initializePage'
	},

	initializePage: function(gridSize, totalLoopTime){
		this.broadcastRedraw();

		this.gridSize = (gridSize || 16);
		this.totalLoopTime = (totalLoopTime || 2000);
		this.startMasterLoop();

		this.drawMatrix('fm_synth');
	},

	drawMatrix: function(instrument){
		var matrixView;
		Backbone.trigger('delegateEvents'); // otherwise toneViews' events are decoupled

		if(ToneLotus.existingMatrixHash[instrument]){
			// if a matrix with this instrument has already been created
			matrixView = ToneLotus.existingMatrixHash[instrument];

			this.$matrixEl.html(matrixView.$el)
		} else {
			// otherwise create new matrixView, assign to global hash, render it up.
			matrixView = new ToneLotus.Views.MatrixView({
				gridSize: this.gridSize,
				totalLoopTime: this.totalLoopTime,
				instrument: instrument
			});

			ToneLotus.existingMatrixHash[instrument] = matrixView;

			this.$matrixEl.html(matrixView.render().$el);
		}
	},

	startMasterLoop: function(){
		var that = this;
		var columnLoopTime = this.totalLoopTime / this.gridSize;
		var column = 0;

		setInterval(function(){
			column = (column + 1) % that.gridSize;

			Backbone.trigger(column);

		}, columnLoopTime)
	},

	broadcastRedraw: function(){
		// broadcast a universal redraw event, errbody listens, errbody decouples themselves from listenTos and the dom.  This is important for when the gridSize is redrawn and the whole page is redone.  This will be implemented, along with multiple sizings, way later.  16 is a good number for now.

		Backbone.trigger('masterRedraw');
	}

})