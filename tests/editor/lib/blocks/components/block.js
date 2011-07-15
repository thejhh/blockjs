/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Component constructor */
function BlockComponent(args) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	this.items = [];
}

/* Add item to schema */
BlockComponent.prototype.push = function(item) {
	this.items.push(item);
}

/* Draw component to editor */
BlockComponent.prototype.draw = function(args) {
	
	var component = this,
	    args = args || {},
	    editor = args.editor || {},
		paper = editor.paper || {},
	    x = args.x || 0,
	    y = args.y || 0,
		drawing = new Drawing(x, y, 300, 95);
	component.drawing = drawing;
	
	drawing.outerbox = paper.rect(x, y, drawing.width, drawing.height);
	drawing.outerbox.attr({'fill': "315-#ffffff-#cfcfcf"});
	
	// Draw execution objects
	(function() {
		var i, items = component.items, length = items.length, last, cury = y+5;
		for(i=0; i<length; ++i) {
			last = items[i].draw(merge_objects(args, {'x':x+5+15, 'y':cury}));
			cury += last.height;
		}
	})();
	
	drawing.connector = paper.path("M 0 0 L 5 0 L 2.5 5 z");
	drawing.connector.attr({'fill': "#000000"});
	drawing.connector.translate(x+5+15-2.5, y);
	
	drawing.init(paper, ['outerbox', 'connector']);
	
	drawing.makeDragable();
	
	return drawing;
}


/* Move element and all connected components */
BlockComponent.prototype.move = function(x, y) {
	var component = this,
	    drawing = component.drawing,
	    all = drawing.all;
	
	// Move self
	all.translate(x, y);
	
	// Move components
	(function() {
		var i, items = component.items, length = items.length;
		for(i=0; i<length; ++i) items[i].move(x, y);
	})();
	
}
	
/* Returns total width of element */
BlockComponent.prototype.width = function() {
	var component = this,
	    drawing = component.drawing;
	return drawing.width;
}

/* Returns total height of element */
BlockComponent.prototype.height = function() {
	var component = this,
	    drawing = component.drawing;
	return drawing.height;
}

/* EOF */
