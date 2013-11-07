ToneLotus.Views.MatrixView = Backbone.View.extend({
	initialize: function(options){
		this.gridSize = options.gridSize;
		this.instrument = options.instrument;

		this.listenTo(Backbone, 'masterRedraw', this.redraw);
	},

	render: function(){
		var that = this;

		_(that.gridSize * that.gridSize).times(function(counter){

			var toneView = new ToneLotus.Views.ToneView({
				toneViewNumber: counter,
				gridSize: that.gridSize,
				instrument: that.instrument
			});

			that.$el.append(toneView.render().$el);
		});

		return this;
	},

	redraw: function(){
		this.$el.empty();
		this.render();
	}
})