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
		drawing = new Drawing(x, y, 300, 95};
	component.drawing = drawing;
	
	drawing.input = paper.circle(x, y, 2);
	drawing.input.attr({'fill':'#ff0000', 'stroke':'none'});
	
	drawing.outerbox = paper.rect(x, y, drawing.width, drawing.height);
	drawing.title = paper.text(x+300/2, y + 20, component.title);
	drawing.label1 = paper.text(x+25, y + 25, "when");
	drawing.label2 = paper.text(x+15, y + 40, "do");
	drawing.innerbox = paper.rect(x+5, y+95-35-5, 290, 35);
	
	// Draw execution objects
	(function() {
		var i, items = component.items, length = items.length, last, cury = y+drawing.height-35;
		for(i=0; i<length; ++i) {
			last = items[i].draw(merge_objects(args, {'x':x+5+25-2.5, 'y':cury}));
			cury += last.height;

		}
	})();
	
	drawing.connector = paper.path("M 0 0 L 5 0 L 2.5 5 z");
	drawing.connector.translate(x+5+5+15, y+95-35-5);
	
	drawing.init(paper, ['input', 'outerbox', 'title', 'label1', 'label2', 'innerbox', 'connector']);
	
	drawing.connector.attr({'fill': "#000000"});
	drawing.outerbox.attr({'fill': "315-#e3d7f4-#b3a7c4"});
	drawing.innerbox.attr({'fill': "315-#ffffff-#cfcfcf"});
	drawing.label1.attr({'font-size':14, 'fill':'#4b5320'});
	drawing.label2.attr({'font-size':14, 'fill':'#4b5320'});
	drawing.title.attr({'font-size':18});
	
	makeDragable(drawing);
	
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
