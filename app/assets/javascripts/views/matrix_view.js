ToneLotus.Views.MatrixView = Backbone.View.extend({
	initialize: function( options ){
		this.gridSize = options.gridSize;
		this.instrument = options.instrument;
		this.staged = false;
		this.currentMatrix = false;
		this.toneViewArray = [];
		this.$el.attr('data-cid', this.cid);

		this.listenTo( Backbone, 'masterRedraw', this.masterRedraw );
		this.listenTo( Backbone, 'spacePress', this.spacePress );
		this.listenTo( Backbone, 'masterDestroy', this.seppuku );
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
			that.toneViewArray.push(toneView);
		});

		return this;
	},

	stage: function(){
		this.staged = true;
		this.$el.addClass('staged');
		setTimeout(ToneLotus.delegateDraggable, 100);

		this.$el.html(this.instrument);
		// this.$oldHtml = this.$el;
	},

	unstage: function(){
		this.staged = false;
		this.$el.removeClass('staged');
	},

	redraw: function(){
		var that = this;

		this.$el.empty();

		this.toneViewArray.forEach(function(toneView){
			that.$el.append(toneView.$el);
		})
	},

	masterRedraw: function(){
		this.$el.empty();
		this.render();
	},



	seppuku: function(){
		this.$el.empty();
		this.stopListening();
		delete this;
	}
})