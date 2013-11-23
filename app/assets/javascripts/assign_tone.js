ToneLotus.Store.assignTone = function(view){
	var row = Math.floor(view.toneViewNumber / view.gridSize);

	switch(view.instrument){
		case 'synth':
			fm_synth(row, view);
			break;
		case 'kit':
			drumkit_1(row, view);
			break;
		case 'pad':
			sine_pad(row, view);
			break;
	}
}

ToneLotus.Store.prefetchTones = function(){
	var audioFileNames = ["c3", "d3", "e3", "g3", "a3", "c4", "d4", "e4", "g4", "a4", "c5", "d5", "e5", "g5", "a5", "c6"];

	audioFileNames.forEach(function( fileName ){
		new Howl({ urls: ['audios/fm_synth/' + fileName + '.mp3', 'audios/fm_synth/' + fileName + '.ogg']});
		new Howl({ urls: ['audios/sine_pad/' + fileName + '.mp3', 'audios/sine_pad/' + fileName + '.ogg']});
	});	

	audioFileNames = ["bass", "bass_snare", "kick", "floor", "block_snare", "snare", "hh_closed", "hh_loose", "hh_open", "tom1", "tom2", "tom3", "tom4", "tom5", "tom6", "woodblock"];

	audioFileNames.forEach(function( fileName ){
		new Howl({ urls: ['audios/drumkit_1/' + fileName + '.mp3', 'audios/drumkit_1/' + fileName + '.ogg']});
	});
}

var fm_synth = function(row, view){
	// var audioFileNames = ["c6", "a5", "g5", "e5", "d5", "c5", "a4", "g4", "e4", "d4", "c4", "a3", "g3", "e3", "d3", "c3"];

	// switch(row){
	// 	for( var i = 0; i < 16; i++ ){
	// 		case i;
	// 			view.toneSound = new Howl({ urls: ['audios/fm_synth/' + audioFileNames[i] + '.mp3', 'audios/fm_synth/' + audioFileNames[i] + '.ogg'] });

	// 			break;
	// 	}
	// }

	switch(row){
		case 0:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/c6.mp3', 'audios/fm_synth/c6.ogg'] });
			break;
		case 1:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/a5.mp3', 'audios/fm_synth/a5.ogg'] });
			break;
		case 2:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/g5.mp3', 'audios/fm_synth/g5.ogg'] });
			break;
		case 3:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/e5.mp3', 'audios/fm_synth/e5.ogg'] });
			break;
		case 4:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/d5.mp3', 'audios/fm_synth/d5.ogg'] });
			break;
		case 5:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/c5.mp3', 'audios/fm_synth/c5.ogg'] });
			break;
		case 6:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/a4.mp3', 'audios/fm_synth/a4.ogg'] });
			break;
		case 7:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/g4.mp3', 'audios/fm_synth/g4.ogg'] });
			break;
		case 8:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/e4.mp3', 'audios/fm_synth/e4.ogg'] });
			break;
		case 9:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/d4.mp3', 'audios/fm_synth/d4.ogg'] });
			break;
		case 10:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/c4.mp3', 'audios/fm_synth/c4.ogg'] });
			break;
		case 11:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/a3.mp3', 'audios/fm_synth/a3.ogg'] });
			break;
		case 12:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/g3.mp3', 'audios/fm_synth/g3.ogg'] });
			break;
		case 13:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/e3.mp3', 'audios/fm_synth/e3.ogg'] });
			break;
		case 14:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/d3.mp3', 'audios/fm_synth/d3.ogg'] });
			break;
		case 15:
			view.toneSound = new Howl({ urls: ['audios/fm_synth/c3.mp3', 'audios/fm_synth/c3.ogg'] });
			break;
	}
}

var drumkit_1 = function(row, view){
		switch(row){
		case 0:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/woodblock.mp3', 'audios/drumkit_1/woodblock.ogg'] });
			break;
		case 1:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/tom6.mp3', 'audios/drumkit_1/tom6.ogg'] });
			break;
		case 2:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/tom5.mp3', 'audios/drumkit_1/tom5.ogg'] });
			break;
		case 3:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/tom4.mp3', 'audios/drumkit_1/tom4.ogg'] });
			break;
		case 4:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/tom3.mp3', 'audios/drumkit_1/tom3.ogg'] });
			break;
		case 5:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/tom2.mp3', 'audios/drumkit_1/tom2.ogg'] });
			break;
		case 6:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/tom1.mp3', 'audios/drumkit_1/tom1.ogg'] });
			break;
		case 7:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/hh_open.mp3', 'audios/drumkit_1/hh_open.ogg'] });
			break;
		case 8:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/hh_loose.mp3', 'audios/drumkit_1/hh_loose.ogg'] });
			break;
		case 9:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/hh_closed.mp3', 'audios/drumkit_1/hh_closed.ogg'] });
			break;
		case 10:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/snare.mp3', 'audios/drumkit_1/snare.ogg'] });
			break;
		case 11:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/block_snare.mp3', 'audios/drumkit_1/block_snare.ogg'] });
			break;
		case 12:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/floor.mp3', 'audios/drumkit_1/floor.ogg'] });
			break;
		case 13:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/kick.mp3', 'audios/drumkit_1/kick.ogg'] });
			break;
		case 14:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/bass_snare.mp3', 'audios/drumkit_1/bass_snare.ogg'] });
			break;
		case 15:
			view.toneSound = new Howl({ urls: ['audios/drumkit_1/bass.mp3', 'audios/drumkit_1/bass.ogg'] });
			break;
	}
}

var sine_pad = function(row, view){
	switch(row){
		case 0:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/c6.mp3', 'audios/sine_pad/c6.mp3'] });
			break;
		case 1:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/a5.mp3', 'audios/sine_pad/a5.mp3'] });
			break;
		case 2:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/g5.mp3', 'audios/sine_pad/g5.mp3'] });
			break;
		case 3:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/e5.mp3', 'audios/sine_pad/e5.mp3'] });
			break;
		case 4:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/d5.mp3', 'audios/sine_pad/d5.mp3'] });
			break;
		case 5:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/c5.mp3', 'audios/sine_pad/c5.mp3'] });
			break;
		case 6:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/a4.mp3', 'audios/sine_pad/a4.mp3'] });
			break;
		case 7:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/g4.mp3', 'audios/sine_pad/g4.mp3'] });
			break;
		case 8:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/e4.mp3', 'audios/sine_pad/e4.mp3'] });
			break;
		case 9:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/d4.mp3', 'audios/sine_pad/d4.mp3'] });
			break;
		case 10:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/c4.mp3', 'audios/sine_pad/c4.mp3'] });
			break;
		case 11:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/a3.mp3', 'audios/sine_pad/a3.mp3'] });
			break;
		case 12:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/g3.mp3', 'audios/sine_pad/g3.mp3'] });
			break;
		case 13:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/e3.mp3', 'audios/sine_pad/e3.mp3'] });
			break;
		case 14:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/d3.mp3', 'audios/sine_pad/d3.mp3'] });
			break;
		case 15:
			view.toneSound = new Howl({ urls: ['audios/sine_pad/c3.mp3', 'audios/sine_pad/c3.mp3'] });
			break;
	}
}