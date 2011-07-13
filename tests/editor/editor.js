/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

var _debug;
var editor;

/* Extract integer number */
function integer(value) {
	var n = parseInt(value, 10);
	return (n === null || isNaN(n)) ? 0 : n;
}

/* Shortcut to getElementById */
function $(id) {
	return document.getElementById(id);
}

/* Create schema constructor */
function Schema(args) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	this.items = [];
}

/* Add item to schema */
Schema.prototype.push = function(item) {
	this.names = [];
	this.items.push(item);
}

/* Draw all items on schema */
Schema.prototype.draw = function(args) {
	var i,
	    items = this.items,
		length = items.length;
	for(i = 0; i < length; ++i) {
		items[i].draw(args);
	}
}

/* Create main component constructor */
function MainComponent(args) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	this.title = "Main";
	this.names = [];
	this.items = [];
}

/* Add item to schema */
MainComponent.prototype.push = function(item) {
	this.items.push(item);
}

/* Draw MainComponent on editor */
MainComponent.prototype.draw = function(args) {
	
	var args = args || {},
	    editor = args.editor || {},
		paper = editor.paper || {},
	    x = args.x || 100,
	    y = args.y || 100,
		drawing = {};
	
	drawing.outerbox = paper.rect(x, y, 300, 95),
	drawing.title = paper.text(x+300/2, y + 20, this.title),
	drawing.label1 = paper.text(x+25, y + 25, "when"),
	drawing.label2 = paper.text(x+15, y + 40, "do"),
	drawing.innerbox = paper.rect(x+5, y+95-35-5, 290, 35);
	
	var st = paper.set();
	st.push(
		drawing.outerbox,
		drawing.title,
		drawing.label1,
		drawing.label2,
		drawing.innerbox
	);
	drawing.all = st;
	
	drawing.outerbox.attr({fill: "315-#e3d7f4-#9c70d8"});
	drawing.innerbox.attr({fill: "315-#ffffff-#eeeeee"});
	drawing.label1.attr({'font-size':14, 'fill':'#4b5320'});
	drawing.label2.attr({'font-size':14, 'fill':'#4b5320'});
	drawing.title.attr({'font-size':18});
	
	return drawing;
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

/*
	// Create main element
	editor.createMainElement = function(args) {
		var args = args || {},
		    x = args.x || 100,
		    y = args.y || 100,
		    r = editor.paper.rect(x, y, 300, 95),
		    title = editor.paper.text(x+300/2, y + 20, "main"),
		    condition = editor.paper.text(x+25, y + 25, "when"),
		    action = editor.paper.text(x+15, y + 40, "do"),
		    r2 = editor.paper.rect(x+5, y+95-35-5, 290, 35),
			start, move, up,
			st = paper.set();
		
		st.push(
			r,
			condition,
			action,
			title,
			r2
		);
		
		r.attr({fill: "315-#e3d7f4-#9c70d8"});
		r2.attr({fill: "315-#ffffff-#eeeeee"});
		
		condition.attr({'font-size':14, 'fill':'#4b5320'});
		action.attr({'font-size':14, 'fill':'#4b5320'});
		
		title.attr({'font-size':18});
		
		// storing original coordinates
		start = function () {
			this.ox = this.attr("x");
			this.oy = this.attr("y");
			//this.attr({opacity: 1});
		};
		
		// move will be called with dx and dy
		move = function (dx, dy) {
			//this.attr({"x": this.ox + dx, "y": this.oy + dy});
			
			var nx = this.ox + dx,
			    ny = this.oy + dy;
			    px = this.px || this.ox,
			    py = this.py || this.oy;
			st.translate(nx - px, ny - py);
			this.px = nx;
			this.py = ny;
		};
		
		// restoring state
		up = function () {
			//this.attr({opacity: .5});
		};
		
		st.drag(move, start, up);
		
		return r;
	}
	
*/

/* Init drag&drop at onLoad event */
window.onload = function(){
	/* Initialize editor */
	var schema = new Schema(),
	    editor = new Editor();
	
	schema.push(new MainComponent());
	editor.display(schema);
	
	_debug = $('debug');
	
}

/* EOF */
