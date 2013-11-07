ToneLotus.Views.ToneView = Backbone.View.extend({
	initialize: function(options){
		this.toneViewNumber = options.toneViewNumber;
		this.gridSize = options.gridSize;
		this.totalLoopTime = 2000; // OBSOLETE
		this.waitTime = (this.toneViewNumber % 16) * (this.totalLoopTime / 16); //OBSOLETE

		// this.startTimingLoop(); //OBSOLETE
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
		// this.$el.removeClass('explode').addClass('explode');
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
		// this.$el.text(that.toneViewNumber.toString());
		// this.$el.text('a');

		return this;
	},

	generateTone: function(){
		var row = Math.floor(this.toneViewNumber / this.gridSize);

		switch(row){
			case 0:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/c6.mp3'] });
				break;
			case 1:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/a5.mp3'] });
				break;
			case 2:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/g5.mp3'] });
				break;
			case 3:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/e5.mp3'] });
				break;
			case 4:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/d5.mp3'] });
				break;
			case 5:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/c5.mp3'] });
				break;
			case 6:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/a4.mp3'] });
				break;
			case 7:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/g4.mp3'] });
				break;
			case 8:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/e4.mp3'] });
				break;
			case 9:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/d4.mp3'] });
				break;
			case 10:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/c4.mp3'] });
				break;
			case 11:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/a3.mp3'] });
				break;
			case 12:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/g3.mp3'] });
				break;
			case 13:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/e3.mp3'] });
				break;
			case 14:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/d3.mp3'] });
				break;
			case 15:
				this.toneSound = new Howl({ urls: ['audios/binary_piano/c3.mp3'] });
				break;
		}	
	}
});