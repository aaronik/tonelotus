$(document).ready(function(){
	  $('#stage-title').click(function(){
    Backbone.trigger('stage');
  });

  //play the tracks
  $('#tracks-play-button').click(function(){
    ToneLotus.Metronome.startMasterTrackLoop();
  });

  //play the matrix
  $('#main-play-button').click(function(){
    ToneLotus.Metronome.startMasterLoop();
  });

  //pause button
  $('#pause-button').click(function(){
    Backbone.trigger('pause');
  });

  //listen for instrument changes
  $('.instrument').click(function( event ){
    Backbone.trigger(event.target.id);
  });

  //temp, send Mainframe Operations events
  // $('.eventControls').click(function( event ){
  //   console.log(event.target.id);
  //   Backbone.trigger(event.target.id);
  // })

  //make the keyboard shortcuts clickable as well as informative
  $('.keyboard-shortcuts').click(function ( event ){
    Backbone.trigger(event.target.id);
  });

  $('#help-button-launch-joyride').click(function(){
    // grab tone 147 for joyride
	  $('.tone').eq(147).attr('id', 'joyride-tone');
	  
    // not sure why two is required, but it is.
    $('#joyride-ol').joyride({});
    $('#joyride-ol').joyride({});
  });

  //when update time is clicked
  $('#update-time-form').submit(function( event ){
    event.preventDefault();
    Backbone.trigger('updateTime');
  });
});