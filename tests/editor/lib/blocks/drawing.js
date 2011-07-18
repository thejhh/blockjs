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
Drawing.prototype.resize = function(w, h) {
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

/* Make a drawing dragable */
Drawing.prototype.makeDragable = function(block) {
	var drawing = this,
	    start, move, up;
	
	// storing original coordinates
	start = function () {
		var svg = this,
		    tmp = {};
		svg.dragtmp = tmp;
		tmp.ox = svg.attr("x");
		tmp.oy = svg.attr("y");
		//svg.attr({opacity: 1});
		block.toFront();
	};
	
	// move will be called with dx and dy
	move = function (dx, dy) {
		var svg = this,
		    tmp = svg.dragtmp,
		    nx = tmp.ox + dx,
		    ny = tmp.oy + dy;
		    px = tmp.px || dx,
		    py = tmp.py || dy;
		block.move(nx - (tmp.ox+px), ny - (tmp.oy+py) );
		tmp.px = dx;
		tmp.py = dy;
	};
	
	// restoring state
	up = function () {
		var svg = this,
		    tmp = svg.dragtmp,
		    cx = svg.attr("x"),
		    cy = svg.attr("y"),
		    ox = tmp.ox,
		    oy = tmp.oy;
		
		block.move( ox-cx, oy-cy ); // Move back to original place
		
		delete svg.dragtmp;
		//svg.attr({opacity: .5});
	};
	
	drawing.all.drag(move, start, up);
	
	/*
	drawing.all.mouseup(function (event) {
		this.attr({fill: "red"});
	});
	*/
}		

/* EOF */
