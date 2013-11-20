$(document).ready(function(){
	 //make the menu on the side an accordion
  $('#menu-accordion').accordion({
    collapsible: true,
    animate: 200,
    active: false,
    heightStyle: 'content',
    // event: 'mouseover click'
    event: 'click'
  });
})