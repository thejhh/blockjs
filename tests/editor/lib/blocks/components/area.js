/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Component constructor */
function AreaComponent(args) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	this.items = [];
}

/* Add item */
AreaComponent.prototype.push = function(item) {
	this.items.push(item);
}

/* Draw component to editor */
AreaComponent.prototype.draw = function(args) {
	
	var component = this,
	    args = args || {},
	    editor = args.editor || {},
		paper = editor.paper || {},
	    x = args.x || 0,
	    y = args.y || 0,
		drawing = new Drawing(x, y, 1, 1),
		max_items_width = 0,
		items_height = 0;
	component.drawing = drawing;
	
	// Draw execution objects
	drawing.items = [];
	items_height = 0;
	(function() {
		var i, items = component.items, length = items.length, last, cury = y+5;
		for(i=0; i<length; ++i) {
			last = items[i].draw(merge_objects(args, {'x':x+5, 'y':cury}));
			cury += last.height+5;
			if(last.width > max_items_width) max_items_width = last.width;
			items_height += 5 + last.height;
			drawing.items.push(last);
		}
	})();
	
	drawing.resize(5+max_items_width+5, items_height + 5);
	
	drawing.outerbox = paper.rect(x, y, drawing.width, drawing.height);
	drawing.outerbox.attr({'fill': "315-#ffffff-#cfcfcf"});
	
	(function() {
		var i, items = component.items, length = items.length;
		if( (length !== 0) && items[0].drawing && items[0].drawing.outerbox ) drawing.outerbox.insertBefore(items[0].drawing.outerbox);
	})();
	
	drawing.init(paper, ['outerbox']);
	
	drawing.makeDragable();
	
	return drawing;
}


/* Move element and all connected components */
AreaComponent.prototype.move = function(x, y) {
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
AreaComponent.prototype.width = function() {
	var component = this,
	    drawing = component.drawing;
	return drawing.width;
}

/* Returns total height of element */
AreaComponent.prototype.height = function() {
	var component = this,
	    drawing = component.drawing;
	return drawing.height;
}

/* EOF */
