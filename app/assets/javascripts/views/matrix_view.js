ToneLotus.Views.MatrixView = Backbone.View.extend({
	initialize: function( options ){
		this.gridSize = options.gridSize;
		this.instrument = options.instrument;
		this.staged = false;
		this.currentMatrix = false;

		this.listenTo( Backbone, 'masterRedraw', this.redraw );
	},

	makeCurrentMatrix: function(){
		this.currentMatrix = true;
	},

	render: function(){
		var that = this;

		_( that.gridSize * that.gridSize ).times( function( counter ) {

			var toneView = new ToneLotus.Views.ToneView({
				toneViewNumber: counter,
				gridSize: that.gridSize,
				instrument: that.instrument,
				matrix: that
			});

			that.$el.append(toneView.render().$el);
		});

		return this;
	},

	stage: function(){
		this.staged = true;
		this.reinitializeListeners();
	},

	unstage: function(){
		this.staged = false;
		this.reinitializeListeners();
	},

	redraw: function(){
		this.$el.empty();
		this.render();
	}
})