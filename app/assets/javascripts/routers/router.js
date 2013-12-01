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
		this.listenTo( Backbone, 'stage', this.stage );
		this.listenTo( Backbone, 'spacePress', this.spacePressHandler );
		this.listenTo( Backbone, 'clear', this.clearHandler );

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
		':state'	: 	'constructState'
	},

	initializePage: function(){
		ToneLotus.Metronome.startMasterLoop();

		// initialize and draw the instrument the user will see first.
		var matrixView = ToneLotus.Store.initializeMatrix(this.instruments[0]);
		this.assignCurrentMatrix(matrixView);

		ToneLotus.Store.prefetchTones();

		// initialize but DON"T draw the rest of the instruments
		// var that = this;
		// this.instruments.slice(1).forEach(function(instrument){
		// 	ToneLotus.Store.initializeMatrix(instrument);
		// })
	},

	constructState: function(state){
		ToneLotus.State.load(state);
	},

	pause: function(){
		ToneLotus.Metronome.pause();
	},

	instrumentEventHandler: function(instrument) {
		// make a new instrument if one doesn't already exist
		var matrix = ToneLotus.Store.findMatrix(instrument);

		// finish setting up specific instrument
		this.assignCurrentMatrix(matrix);
		this.changeMenuInstrumentSelector(instrument);
	},

	unstageMatrix: function(matrix){
    ToneLotus.Store.matrixHash[matrix.instrument] = matrix;
    matrix.unstage();
    Backbone.trigger(matrix.instrument);
	},

	spacePressHandler: function(){
		// $('.staged-matrix').off().remove();
		$('.tracked').remove();
		// ToneLotus.Store.matrixHash = {};
		ToneLotus.Store.matrixArray.forEach(function(matrix){
			matrix.sendToTones('unselect');
			matrix.unstage();
		})
		this.stageRedraw();
		Backbone.trigger('delegateEvents');
	},

	stage: function(matrix){
		if(matrix){
			matrix.stage();
		} else {
			this.stageCurrent();
		}

		this.stageRedraw();
		this.$matrixEl.html('<p>Select new instrument</p><p>or drag from the stage</p><h2>ಠ益ಠ</h2>');
	},

	stageCurrent: function(){
		this.currentMatrix.stage();
		delete ToneLotus.Store.matrixHash[this.currentMatrix.instrument];
	},

	stageRedraw: function(){
		var that = this;
		this.$stageEl.empty();
		ToneLotus.Store.matrixArray.forEach(function(matrix){
			if(matrix.staged){
				matrix.$stageEl.attr('style', 'position: relative; left: 0; top: 0;');
				that.$stageEl.append(matrix.$stageEl);
			}
		})

		ToneLotus.Store.delegateDraggable();
	},

	updateTime: function(){
		ToneLotus.Metronome.updateTime();
	},

	clearHandler: function(){
		this.currentMatrix.sendToTones('unselect');
	},

	changeMenuInstrumentSelector: function(instrument){
		$('.instrument').removeClass('selectedInstrument');
    $('#' + instrument).addClass('selectedInstrument');
	},

	assignCurrentMatrix: function(matrix){
		this.currentMatrix && this.currentMatrix.removeCurrentMatrix();
		matrix.makeCurrentMatrix();
		this.currentMatrix = matrix;
		this.drawMatrix(matrix);
	},

	drawMatrix: function(matrix){
		var that = this;
		console.log("redrawing:");
		console.log(matrix);

		this.$matrixEl.html(matrix.$liveEl);
		
		Backbone.trigger('delegateEvents');
	},

})