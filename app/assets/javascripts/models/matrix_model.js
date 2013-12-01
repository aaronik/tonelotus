ToneLotus.Models.Matrix = Backbone.Model.extend({
	initialize: function( attributes, options ){
		this.gridSize = options.gridSize;
		this.instrument = options.instrument;
		this.label = this.instrument + this.cid.slice(1);
		this.staged = false;
		this.currentMatrix = false;
		this.tracked = false;
		this.toneViewArray = [];
		this.viewArray = [];
		this.initializeViews();
		this.$liveEl = this.liveView.render().$el;
		this.$trackEl = this.trackView.render().$el;
		this.$stageEl = this.stageView.render().$el;
		// this.$el = $('<div></div>');
		// this.$el.attr('data-cid', this.cid);
		// this.$el.addClass('fadein scaleInv anim_4');

		this.initializeListeners();
	},

	initializeViews: function(){
		var universalOptions = {
			matrix: this,
		}
		var liveView = this.liveView = new ToneLotus.Views.Live(_.extend({

		}, universalOptions));
		var trackView = this.trackView = new ToneLotus.Views.Tracked(_.extend({

		}, universalOptions));
		var stageView = this.stageView = new ToneLotus.Views.Staged(_.extend({

		}, universalOptions));

		this.viewArray.push(liveView);
		this.viewArray.push(trackView);
		this.viewArray.push(stageView);
	},

	initializeListeners: function(){
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

	makeCurrentMatrix: function(){
		this.currentMatrix = true;
		// this.$el.addClass('live-matrix');
	},

	removeCurrentMatrix: function(){
		this.currentMatrix = false;
	},

	stage: function(){
		this.staged = true;
		// this.$el.addClass('staged non-blank staged-matrix');
		// this.$el.removeClass('anim_4 scaleInv fadein live-matrix');
		setTimeout(ToneLotus.Store.delegateDraggable, 100);

		// var newElString = this.instrument + this.cid.slice(4);
		// this.$el.html(newElString);
		delete ToneLotus.Store.matrixHash[this.instrument];
	},

	unstage: function(){
		var that = this;
		this.staged = false;
		this.stageView.hide();
		// this.$el.removeClass('staged non-blank staged-matrix');
		// this.$el.addClass('live-matrix');
		// this.$el.empty();
		// this.toneViewArray.forEach(function(toneView){
		// 	that.$el.append(toneView.$el);
		// })
	},

	delegateEventsForTones: function(){
		this.sendToTones('delegateEvents');
	}
})