/*
 * BlockJS Editor Test -- Drawing
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Constructor */
function Drawing(x, y, w, h) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	var drawing = this;
	drawing.pos = {"x":x, "y":y};
	drawing.width = w;
	drawing.height = h;
}

/* Set size of drawing */
Drawing.prototype.setSize = function(w, h) {
	var drawing = this;
	drawing.width = w;
	drawing.height = h;
}

/* */
Drawing.prototype.init = function(paper, keys) {
	var drawing = this,
	    st = paper.set(),
	    i, length=keys.length;
	drawing.paper = paper;
	for(i=0; i<length; ++i) st.push( drawing[keys[i]] );
	drawing.all = st;
}

/* EOF */
