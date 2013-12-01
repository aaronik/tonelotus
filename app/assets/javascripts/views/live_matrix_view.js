ToneLotus.Views.Live = Backbone.View.extend({
	initialize: function (options) {
		this.matrix = options.matrix;
		this.$el.addClass('anim_4 scaleInv fadein live-matrix');
		this.$el.attr('data-cid', this.matrix.cid);
	},

	events: {

	},

	render: function(){
		var that = this;

		_( that.matrix.gridSize * that.matrix.gridSize ).times( function( counter ) {

			var toneView = new ToneLotus.Views.ToneView({
				toneViewNumber: counter,
				gridSize: that.matrix.gridSize,
				instrument: that.matrix.instrument,
				matrix: that.matrix
			});

			that.$el.append(toneView.render().$el);
			that.matrix.toneViewArray.push(toneView);
		});

		return this;
	},

	hide: function(){
		this.$el.detach();
	}
});