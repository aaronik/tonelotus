ToneLotus.Routers.AppRouter = Backbone.Router.extend({
	initialize: function($matrixEl){
		this.$matrixEl = $matrixEl;
	},

	routes: {
		'':'home',
		':gridSize':'home',
		':gridSize/:totalLoopTime':'home'
	},

	home: function(gridSize, totalLoopTime){
		var gridSize = (gridSize || 16);
		var totalLoopTime = (totalLoopTime || 2000);

		
		var matrixView = new ToneLotus.Views.MatrixView({
			gridSize: gridSize,
			totalLoopTime: totalLoopTime
		});
		this.$matrixEl.html(matrixView.render().$el);
	}

})