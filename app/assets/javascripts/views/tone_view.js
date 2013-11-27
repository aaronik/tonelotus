ToneLotus.Views.ToneView = Backbone.View.extend({
	initialize: function(options){
		this.toneViewNumber = options.toneViewNumber;
		this.gridSize = options.gridSize;
		this.instrument = options.instrument;
		this.matrix = options.matrix;
		this.column = this.toneViewNumber % this.gridSize;
		this.isSelected = false;

		ToneLotus.Store.assignTone(this);
	},

	events: {
		'click':'toggleSelected',
		'mouseover':'mouseoverHandler'
	},

	triggerColumn: function(column_in_array){
		if(column_in_array == this.column){
			this.potentiallyActivate();
		}
	},

	mouseoverHandler: function(){
		if(ToneLotus.Store.isMouseDown){
			this.toggleSelected();
		}
	},

	spacePress: function(){
		this.unselect();
	},

	potentiallyTrackPlay: function(){
		if( this.selected() ){
			this.activateWithoutAnimation();
		}
	},

	potentiallyActivate: function(){
		if( this.selected() && !this.matrix.staged ){
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
		this.isSelected = true;
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
	}
});