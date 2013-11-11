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
		this.listenTo(Backbone, 'masterRedraw', this.stopListening); // WARNING< THIS DOESN"T EXIST
		this.listenTo(Backbone, 'delegateEvents', this.delegateEvents);

		var that = this;
		// this.$el.hover(that.toggleSelected);

		var listenString = this.matrix.cid + this.column;
		alert(listenString);
		this.listenTo(Backbone, listenString, this.potentiallyActivate);
	},

	spacePress: function(){
		this.unselect();
	},

	activate: function(){
		var that = this;

		that.$el.addClass('explode');
		setTimeout(function(){
			that.$el.removeClass('explode');
		}, 300);

		this.toneSound.play();
	},

	potentiallyActivate: function(){
		if(this.selected() && this.matrix.staged){
			this.activate();
		}
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
		console.log('in toggleselected, tone_view.js');

		this.isSelected = (this.isSelected == false ? true : false);

		this.$el.toggleClass('selectedTone');
	},

	render: function(){
		var that = this;

		this.$el.attr('class', 'tone');

		return this;
	},
});