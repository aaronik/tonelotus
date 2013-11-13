#Hello Yummi!

Hey! What's this? The Yummi-loader is nothing more than a simple LESS file with some CSS3 animations for a fancy page load effect. Use them just adding `off` class on your body element and changing it with `on` on `$(window).load()` or `$(document).ready()` events.

**Browser compatibility IE10+ // Webkit // Firefox**

	<body class="off">
	  <div class="fadein scaleInv anim_1">
	    <p class="fadein scaleInv anim_2">
	      <a class="fadein scale anim_n"></a>
	    </p>
	  </div>
	</body>

A little example where we toggle on/off class on `$(window).load()` event.

	$(window).load(function() {
	  $('body').toggleClass('on off');
	});

You can also use an optional handy little jQuery plugin that waits for animation to end before opening a link.

Usage is straightforward just add `.trigger` class to any link you wish to apply this effect to.

	<a class="trigger" href="example.html">I'm a fancy link</a>

Configuring the LESS file is easy too, just choose the number of elements you are working with, the delay between each other and your are good to go.

	@iterations:	15;	// number of elements to apply effects on
	@delay:			0.15; // delay between elements transitions

There are some other options you can set too, it's up to you.

	@opacity_start: 		0;
	@opacity_finish:		1;
	@opacity_speed_in:		0.5s; 	// seconds
	@opacity_speed_out:		0.5s; 	// seconds
	@opacity_delay_in:		0.5s; 	// seconds
	@opacity_delay_out:		0.5s; 	// seconds
	@opacity_easing_in: 		cubic-bezier(0,0,1,1);
	@opacity_easing_out:		cubic-bezier(0,0,1,1);

Don't forget that Yummi-loader uses lesshat mixing, you can download it here: <http://lesshat.com/> and then put it in the less folder before compiling.

You can compile LESS files using one of these compilers.
<https://github.com/less/less.js/wiki/GUI-compilers-that-use-LESS.js>

Support or Contact
Having trouble or suggestions? Tweet me @gummibear_lab.
Github page: <http://gummibearlab.github.io/Yummi-loader/>
