ToneLotus.Views.MatrixView = Backbone.View.extend({
	initialize: function(options){
		this.gridSize = options.gridSize;
		this.totalLoopTime = options.totalLoopTime;
		this.startMasterLoop();
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

	render: function(){
		var that = this;

		_(that.gridSize * that.gridSize).times(function(counter){

			var toneView = new ToneLotus.Views.ToneView({
				toneViewNumber: counter,
				gridSize: that.gridSize
			});

			that.$el.append(toneView.render().$el);
		});

		return this;
	}
})