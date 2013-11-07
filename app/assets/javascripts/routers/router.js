ToneLotus.Routers.AppRouter = Backbone.Router.extend({
	initialize: function($matrixEl){
		this.$matrixEl = $matrixEl;
	},

	routes: {
		'':'initializePage',
		':gridSize':'initializePage',
		':gridSize/:totalLoopTime':'initializePage'
	},

	initializePage: function(gridSize, totalLoopTime){
		this.broadcastRedraw();

		var gridSize = (gridSize || 16);
		var totalLoopTime = (totalLoopTime || 2000);
		this.startMasterLoop(gridSize, totalLoopTime);

		this.drawMatrix(gridSize, totalLoopTime);
	},

	drawMatrix: function(gridSize, totalLoopTime){
		var matrixView = new ToneLotus.Views.MatrixView({
			gridSize: gridSize,
			totalLoopTime: totalLoopTime,
			instrument: 'drumkit_1'
		});

		this.$matrixEl.html(matrixView.render().$el);
	},

	startMasterLoop: function(gridSize, totalLoopTime){
		var that = this;
		var columnLoopTime = totalLoopTime / gridSize;
		var column = 0;

		setInterval(function(){
			column = (column + 1) % gridSize;

			Backbone.trigger(column);

		}, columnLoopTime)
	},

	broadcastRedraw: function(){
		// broadcast a universal redraw event, errbody listens, errbody decouples themselves from listenTos and the dom.  This is important for when the gridSize is redrawn and the whole page is redone.  This will be implemented, along with multiple sizings, way later.  16 is a good number for now.

		Backbone.trigger('masterRedraw');
	}

})