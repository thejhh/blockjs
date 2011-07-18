/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Shortcut to getElementById */
function $(id) {
	return document.getElementById(id);
}

/* Returns current window size */
function getWindowSize() {
	var	body = document.body || {},
	    dElement = ((document.compatMode==='CSS1Compat') && document.dElement) || {},
		w = window.innerWidth || dElement.offsetWidth || body.offsetWidth || 800,
		h = window.innerHeight || dElement.offsetHeight || body.offsetHeight || 600;
	return {'width':w, 'height':h};
}

/* Editor constructor */
function Editor(args) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	
	var editor = this,
	    blocks = $('blocks'),
	    winsize = getWindowSize(),
	    width = winsize.width-1,
	    height = winsize.height-32,
		paper = Raphael(blocks, width, height);

	editor.paper = paper;
}

/* */
Editor.prototype.display = function(schema) {
	var editor = this;
	schema.draw({'editor':editor});
}

/* Extract integer number */
/*
function integer(value) {
	var n = parseInt(value, 10);
	return (n === null || isNaN(n)) ? 0 : n;
}
*/

/* EOF */
