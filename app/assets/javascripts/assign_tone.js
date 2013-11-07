ToneLotus.assignTone = function(view){
	var row = Math.floor(view.toneViewNumber / view.gridSize);

	switch(view.instrument){
		case 'fm_synth':
			fm_synth(row, view);
			break;
		case 'drumkit_1':
			drumkit_1(row, view);
			break;
	}
}

var fm_synth = function(row, view){
	switch(row){
		case 0:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/c6.mp3'] });
			break;
		case 1:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/a5.mp3'] });
			break;
		case 2:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/g5.mp3'] });
			break;
		case 3:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/e5.mp3'] });
			break;
		case 4:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/d5.mp3'] });
			break;
		case 5:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/c5.mp3'] });
			break;
		case 6:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/a4.mp3'] });
			break;
		case 7:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/g4.mp3'] });
			break;
		case 8:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/e4.mp3'] });
			break;
		case 9:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/d4.mp3'] });
			break;
		case 10:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/c4.mp3'] });
			break;
		case 11:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/a3.mp3'] });
			break;
		case 12:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/g3.mp3'] });
			break;
		case 13:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/e3.mp3'] });
			break;
		case 14:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/d3.mp3'] });
			break;
		case 15:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/c3.mp3'] });
			break;
	}
}

var drumkit_1 = function(row, view){
		switch(row){
		case 0:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/woodblock.mp3'] });
			break;
		case 1:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/tom6.mp3'] });
			break;
		case 2:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/tom5.mp3'] });
			break;
		case 3:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/tom4.mp3'] });
			break;
		case 4:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/tom3.mp3'] });
			break;
		case 5:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/tom2.mp3'] });
			break;
		case 6:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/tom1.mp3'] });
			break;
		case 7:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/hh_open.mp3'] });
			break;
		case 8:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/hh_loose.mp3'] });
			break;
		case 9:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/hh_closed.mp3'] });
			break;
		case 10:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/snare.mp3'] });
			break;
		case 11:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/block_snare.mp3'] });
			break;
		case 12:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/floor.mp3'] });
			break;
		case 13:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/kick.mp3'] });
			break;
		case 14:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/bass_snare.mp3'] });
			break;
		case 15:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/bass.mp3'] });
			break;
	}
}