ToneLotus.Views.ToneView = Backbone.View.extend({
	initialize: function(options){
		this.toneViewNumber = options.toneViewNumber;
		this.gridSize = options.gridSize;
		this.instrument = options.instrument;
		this.matrix = options.matrix;
		this.column = this.toneViewNumber % this.gridSize;

		ToneLotus.assignTone(this);

		this.initializeListeners();
	},

	events: {
		'click':'toggleSelected',
		'mouseover':'mouseoverHandler'
	},

	mouseoverHandler: function(){
		if(ToneLotus.isMouseDown){
			this.toggleSelected();
		}
	},

	initializeListeners: function(){
		// difference b/t spacePress and masterRedraw is spacePress unselects all elements,
		//  masterRedraw removes them entirely.
		this.isSelected = false;

		this.listenTo(Backbone, 'spacePress', this.spacePress);
		this.listenTo(Backbone, 'masterRedraw', this.stopListening);
		this.listenTo(Backbone, 'delegateEvents', this.delegateEvents);

		var that = this;

		var listenString = "triggerColumn" + this.column;
		this.listenTo(Backbone, listenString, this.potentiallyActivate);
	},

	spacePress: function(){
		this.unselect();
	},

	potentiallyActivate: function(){
		if(this.selected() && ( this.matrix.staged || this.matrix.currentMatrix )){
			this.activate();
		}
	},

	activate: function(){
		if( this.matrix.currentMatrix ){
			this.activateWithAnimation();
		} else {
			this.activateWithoutAnimation();
		}
	},

	activateWithoutAnimation: function(){
		this.toneSound.play();
	},

	activateWithAnimation: function(){
		var that = this;

		that.$el.addClass('explode');
		setTimeout(function(){
			that.$el.removeClass('explode');
		}, 300);

		this.toneSound.play();
	},

	selected: function(){
		return this.isSelected == true;
	},

	select: function(){
		this.isSelected = false;
		this.$el.addClass('selectedTone');
	},

	unselect: function(){
		this.isSelected = false;

		this.$el.removeClass('selectedTone');
	},

	toggleSelected: function(){
		this.isSelected = (this.isSelected == false ? true : false);

		this.$el.toggleClass('selectedTone');
	},

	render: function(){
		var that = this;

		this.$el.attr('class', 'tone');

		return this;
	},
});