ToneLotus.Views.MatrixView = Backbone.View.extend({
	initialize: function( options ){
		this.gridSize = options.gridSize;
		this.instrument = options.instrument;
		this.staged = false;
		this.currentMatrix = false;

		this.listenTo( Backbone, 'masterRedraw', this.redraw );
		this.listenTo( Backbone, 'spacePress', this.spacePress );
	},

	spacePress: function(){
		this.unstage();
	},

	makeCurrentMatrix: function(){
		this.currentMatrix = true;
	},

	removeCurrentMatrix: function(){
		this.currentMatrix = false;
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
		this.$el.addClass('staged');

		this.$el.html(this.instrument);
		// this.$oldHtml = this.$el;
	},

	unstage: function(){
		this.staged = false;
		this.$el.removeClass('staged');
	},

	redraw: function(){
		this.$el.empty();
		this.render();
	}
})