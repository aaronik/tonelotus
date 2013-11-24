ToneLotus.Routers.AppRouter = Backbone.Router.extend({
	initialize: function($matrixEl, $stageEl){
		this.$matrixEl = $matrixEl;
		this.$stageEl = $stageEl;
		this.instruments = ['synth', 'kit', 'pad'];

		this.initializeListeners();
	},

	initializeListeners: function(){
		this.listenTo( Backbone, 'updateTime', this.updateTime );
		this.listenTo( Backbone, 'pause', this.pause );
		this.listenTo( Backbone, 'stage', this.stageHandler );
		this.listenTo( Backbone, 'spacePress', this.spacePressHandler );

		var that = this;

		// set up a listener for each instrument
		// this will be triggered when a new instrument is created or one is dragged from the stage
		this.instruments.forEach(function(instrument){
			that.listenTo(Backbone, instrument, function(){
				that.instrumentEventHandler(instrument);
			});
		});
	},

	routes: {
		''				: 	'initializePage',
		'/:state'	: 	'constructState'
	},

	initializePage: function(){
		ToneLotus.Metronome.startMasterLoop();

		// initialize and draw the instrument the user will see first.
		var matrixView = ToneLotus.Store.initializeMatrix(this.instruments[0]);
		this.assignCurrentMatrix(matrixView);
		this.drawMatrix(matrixView);

		ToneLotus.Store.prefetchTones();

		// initialize but DON"T draw the rest of the instruments
		// var that = this;
		// this.instruments.slice(1).forEach(function(instrument){
		// 	ToneLotus.Store.initializeMatrix(instrument);
		// })
	},

	constructState: function(state){
		this.initializePage();
		console.log(state)
	},

	instrumentEventHandler: function(instrument) {
		// make a new instrument if one doesn't already exist
		var matrix = ToneLotus.Store.findMatrix(instrument);

		// finish setting up specific instrument
		this.assignCurrentMatrix(matrix);
		this.drawMatrix(this.currentMatrix);
		this.changeMenuInstrumentSelector(instrument);
	},

	unstageMatrix: function(matrix){
    ToneLotus.Store.matrixHash[matrix.instrument] = matrix;

		matrix.$el.detach();
    matrix.unstage();
    matrix.redraw();

    Backbone.trigger(matrix.instrument);
	},

	changeMenuInstrumentSelector: function(instrument){
		$('.instrument').removeClass('selectedInstrument');
    $('#' + instrument).addClass('selectedInstrument');
	},

	stageHandler: function(){
		var that = this;

		this.stageCurrent();
		this.stageRedraw(); // removing staged class from elements
		this.$matrixEl.html('<p>Select new instrument</p><p>or drag from the stage</p><h2>ಠ益ಠ</h2>');
		this.$matrixEl.css('text-align', 'center');
	},

	stageCurrent: function(){
		this.currentMatrix.stage();
		delete ToneLotus.Store.matrixHash[this.currentMatrix.instrument];
	},

	stageRedraw: function(){
		this.$stageEl.append($('.staged'));
	},

	spacePressHandler: function(){
		$('.staged-matrix').off().remove();
		$('.tracked').off().remove();
		this.stageRedraw();
	},

	updateTime: function(){
		var $updateTimeInput = $('#update-time-text-input');
		var bpm = parseInt($updateTimeInput.val());

		$updateTimeInput.attr('placeholder', bpm + ' bpm');
		$updateTimeInput.val('');

		var newTime = (240 / bpm) * 1000;

		ToneLotus.Store.totalLoopTime = newTime;
		this.pause();
		this.pause();
	},

	assignCurrentMatrix: function(matrix){
		this.currentMatrix && this.currentMatrix.removeCurrentMatrix();
		matrix.makeCurrentMatrix();
		this.currentMatrix = matrix;
	},

	drawMatrix: function(matrix){
		var that = this;
		console.log("redrawing:");
		console.log(matrix);

		this.$matrixEl.html(matrix.$el);
		
		Backbone.trigger('delegateEvents');
	},

	pause: function(){
		ToneLotus.Metronome.pause();
	}

})