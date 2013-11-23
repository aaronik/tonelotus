ToneLotus.Views.MatrixView = Backbone.View.extend({
	initialize: function( options ){
		this.gridSize = options.gridSize;
		this.instrument = options.instrument;
		this.staged = false;
		this.currentMatrix = false;
		this.tracked = false;
		this.toneViewArray = [];
		this.$el.attr('data-cid', this.cid);
		this.$el.addClass('fadein scaleInv anim_4');

		this.initializeListeners();
	},

	initializeListeners: function(){
		this.listenTo( Backbone, 'spacePress', this.spacePress );
		this.listenTo( Backbone, 'delegateEvents', this.delegateEventsForTones );

		this.initializeToneColumnListeners();
		this.initializeTrackedToneColumnListeners();
	},

	initializeToneColumnListeners: function(){
		var that = this;
		var triggerString = '';

		_(this.gridSize).times(function( column ){
			triggerString = 'triggerColumn' + column;

			that.listenTo( Backbone, triggerString, function(){
				that.triggerColumn(column);
			})
		});
	},

	initializeTrackedToneColumnListeners: function(){
		var that = this;
		var triggerString = '';

		_(this.gridSize).times(function( column ){
			triggerString = 'tracked' + that.cid + column;

			that.listenTo( Backbone, triggerString, function(){
				that.triggerTrackedColumn(column);
			})
		});
	},

	triggerTrackedColumn: function( column ){
		var highestNumberedTone = Math.pow(this.gridSize, 2);

		for(i = column; i < highestNumberedTone; i = i + this.gridSize){
			this.toneViewArray[i].potentiallyTrackPlay();
		}
	},

	triggerColumn: function(column){
		var highestNumberedTone = Math.pow(this.gridSize, 2);

		for(i = column; i < highestNumberedTone; i = i + this.gridSize){
			this.toneViewArray[i].potentiallyActivate();
		}
	},

	sendToTones: function(command){
		this.toneViewArray.forEach(function(tone){
			tone[command]();
		});
	},

	track: function(){
		this.tracked = true;
	},

	untrack: function(){
		this.tracked = false;
	},

	spacePress: function(){
		this.unstage();
		this.sendToTones('spacePress');
	},

	makeCurrentMatrix: function(){
		this.currentMatrix = true;
		this.$el.addClass('live-matrix');
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
		this.$el.addClass('staged non-blank staged-matrix');
		this.$el.removeClass('anim_4 scaleInv fadein live-matrix');
		setTimeout(ToneLotus.Store.delegateDraggable, 100);

		var newElString = this.instrument + this.cid.slice(4);
		this.$el.html(newElString);
		// this.$oldHtml = this.$el;
	},

	unstage: function(){
		this.staged = false;
		this.$el.removeClass('staged non-blank staged-matrix');
		this.$el.addClass('live-matrix');
	},

	redraw: function(){
		var that = this;

		this.$el.empty();

		this.toneViewArray.forEach(function(toneView){
			that.$el.append(toneView.$el);
		})
	},

	delegateEventsForTones: function(){
		this.sendToTones('delegateEvents');
	}
})