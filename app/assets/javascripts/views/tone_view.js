ToneLotus.Views.ToneView = Backbone.View.extend({
	initialize: function(options){
		this.toneViewNumber = options.toneViewNumber;
		this.gridSize = options.gridSize;

		this.generateTone();

		this.listenTo(Backbone, 'spacePress', this.unselect);

		var column = this.toneViewNumber % this.gridSize;
		this.listenTo(Backbone, column, this.potentiallyActivate);
	},

	events: {
		'click':'toggleSelected'
	},

	activate: function(){
		var that = this;

		that.$el.addClass('explode');
		setTimeout(function(){
			that.$el.removeClass('explode');
		}, 350);

		this.toneSound.play();
	},

	potentiallyActivate: function(){
		if(this.selected()){
			this.activate();
		}
	},

	selected: function(){
		return this.$el.hasClass('selected');
	},

	unselect: function(){
		this.$el.removeClass('selected');
	},

	toggleSelected: function(){
		this.$el.toggleClass('selected');
	},

	render: function(){
		var that = this;

		this.$el.attr('class', 'tone');

		return this;
	},

	generateTone: function(){
		var row = Math.floor(this.toneViewNumber / this.gridSize);

		switch(row){
			case 0:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/c6.mp3'] });
				break;
			case 1:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/a5.mp3'] });
				break;
			case 2:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/g5.mp3'] });
				break;
			case 3:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/e5.mp3'] });
				break;
			case 4:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/d5.mp3'] });
				break;
			case 5:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/c5.mp3'] });
				break;
			case 6:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/a4.mp3'] });
				break;
			case 7:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/g4.mp3'] });
				break;
			case 8:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/e4.mp3'] });
				break;
			case 9:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/d4.mp3'] });
				break;
			case 10:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/c4.mp3'] });
				break;
			case 11:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/a3.mp3'] });
				break;
			case 12:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/g3.mp3'] });
				break;
			case 13:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/e3.mp3'] });
				break;
			case 14:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/d3.mp3'] });
				break;
			case 15:
				this.toneSound = new Howl({ urls: ['audios/fm_synth/c3.mp3'] });
				break;
		}	
	}
});