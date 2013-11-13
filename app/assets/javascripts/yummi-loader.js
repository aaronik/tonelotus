/*
yummi-loader.js - // v1.0 http://gummibearlab.github.io/Yummi-loader/
Licensed under the MIT license

Copyright (c) 2013 Daniele Tabanella (gummibearlab)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var transitionDelay = 0;

function findMaxYLValue() {

	// select all elements that have anim_n class and choose the one with the higher value, we will need his transition-delay value.

	var max = 0, elArray = [];

	$('*[class*="anim_"]').each(function(){

		var animValue = $(this).attr('class').split(" ");

		var i, value;

		for (i = 0; i < animValue.length; ++i) {

		    value = animValue[i];

		    if (value.substring(0, 5) === "anim_") {

		        elArray.push(value.substring(5));

		        break;

		    }

		}

	});

	// now that we found it, we should select it and retrieve his transition-delay value.

	var maxValue = '.anim_' + Math.max.apply(Math, elArray),
		$maxValueEl = $(maxValue).first();

		// not too fast jQuery! We need to get transition-delay value AFTER animation complete, if not we will get 0 value.

		$maxValueEl.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {

		    var transitionDelayValue = $maxValueEl.css("transition-delay"); // this works on webkit, firefox, ie10. Not tried with older browser yet

		    transitionDelay = Math.ceil(parseFloat(transitionDelayValue.substring(0, transitionDelayValue.length - 1) * 1000) * 1) / 1;

	  });

}

findMaxYLValue(); // fire our silly function. I need to write a plugin I know, this will happen in the future.

$('body').on('click','.trigger', function(e) {

	// on click event we will wait until all animations are done before changing url location
	// our delay is the transition-delay of the last element that disappears

	e.preventDefault();

	$body.toggleClass('on off');

	var link = $(this).attr('href');

	setTimeout(function() {

		location.href = link;

	}, transitionDelay);

});