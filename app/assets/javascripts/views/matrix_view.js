ToneLotus.Views.MatrixView = Backbone.View.extend({
	initialize: function( options ){
		this.gridSize = options.gridSize;
		this.instrument = options.instrument;
		this.staged = false;
		this.currentMatrix = false;

		this.listenTo( Backbone, 'masterRedraw', this.redraw );
		this.initializeListeners();
	},

	initializeListeners: function(){
		var that = this;

		if ( this.staged || this.currentMatrix ) {

			_(that.gridSize).times( function( column ) {
				var triggerString = "triggerColumn" + column;
				that.listenTo( Backbone, triggerString, function(){ that.delegateTrigger(column) } )
			})

		}
	},

	delegateTrigger: function(column){
		var that = this;
		// console.log("trigger heard at " + that.cid + " for column " + column);

		var triggerString = this.cid + column;
		console.log("emitting the following:");
		console.log(triggerString);
		Backbone.trigger(triggerString);
	},

	reinitializeListeners: function(){
		this.stopListening();
		this.initializeListeners();
	},

	makeCurrentMatrix: function(){
		this.currentMatrix = true;
		this.reinitializeListeners();
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