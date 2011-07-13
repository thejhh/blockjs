/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Shortcut to getElementById */
function $(id) {
	return document.getElementById(id);
}

/* Make a drawing dragable */
function makeDragable(drawing) {
	var start, move, up;
	
	// storing original coordinates
	start = function () {
		var svg = this,
		    tmp = {};
		svg.dragtmp = tmp;
		tmp.ox = svg.attr("x");
		tmp.oy = svg.attr("y");
		//svg.attr({opacity: 1});
	};
	
	// move will be called with dx and dy
	move = function (dx, dy) {
		var svg = this,
		    tmp = svg.dragtmp,
		    nx = tmp.ox + dx,
		    ny = tmp.oy + dy;
		    px = tmp.px || dx,
		    py = tmp.py || dy;
		drawing.all.translate(nx - (tmp.ox+px), ny - (tmp.oy+py) );
		tmp.px = dx;
		tmp.py = dy;
	};
	
	// restoring state
	up = function () {
		var svg = this;
		delete svg.dragtmp;
		//svg.attr({opacity: .5});
	};
	
	drawing.all.drag(move, start, up);
}		

/* Editor constructor */
function Editor(args) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	
	var editor = this,
	    blocks = $('blocks');
	
	editor.paper = Raphael(blocks, 800, 600);
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
