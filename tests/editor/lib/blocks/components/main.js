/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Component constructor */
function MainComponent(args) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	this.title = args.title || "Unknown";
	this.names = args.names || [];
	this.block = new BlockComponent(merge_objects(args, {'x':0, 'y':0}));
	this.area = new AreaComponent(merge_objects(args, {'x':0, 'y':0}));
}

/* Draw component to editor */
MainComponent.prototype.draw = function(args) {
	
	var component = this,
	    args = args || {},
	    editor = args.editor || {},
		paper = editor.paper || {},
	    x = args.x || 0,
	    y = args.y || 0,
		drawing = new Drawing(x, y, 1, 1);
	
	component.drawing = drawing;
	
	drawing.bb = {};
	
	// Draw input connector
	drawing.input = paper.circle(x, y, 2);
	drawing.input.attr({'fill':'#ff0000', 'stroke':'none'});
	
	// Draw title
	drawing.title = paper.text(x, y, component.title);
	drawing.title.attr({'font-size':18});
	drawing.bb.title = drawing.title.getBBox();
	
	// Draw label1
	drawing.label1 = paper.text(x, y, "when");
	drawing.label1.attr({'font-size':14, 'fill':'#4b5320'});
	drawing.bb.label1 = drawing.label1.getBBox();
	
	// Draw label2
	drawing.label2 = paper.text(x, y, "do");
	drawing.label2.attr({'font-size':14, 'fill':'#4b5320'});
	drawing.bb.label2 = drawing.label2.getBBox();
	
	// Draw execution objects
	component.block.draw(merge_objects(args, {'x':x+5, 'y':y+5+drawing.bb.title.height+5}));
	
	// Draw other objects
	component.area.draw(merge_objects(args, {'x':x+5, 'y':y+5+drawing.bb.title.height+5 + component.block.height() + 5}));
	
	// Resize drawing
	drawing.resize(5+component.block.width()+5, y+5+drawing.bb.title.height+5+component.block.height()+5 + component.area.height() + 5);
	
	// Draw outerbox
	drawing.outerbox = paper.rect(x, y, drawing.width, drawing.height);
	drawing.outerbox.attr({'fill': "315-#e3d7f4-#b3a7c4"});
	drawing.outerbox.insertBefore(drawing.title);
	
	// Move objects
	drawing.title.translate(drawing.width/2, 5+drawing.bb.title.height/2);
	drawing.label1.translate(5+drawing.bb.label1.width/2, (5+drawing.bb.title.height+5) - drawing.bb.label2.height - drawing.bb.label1.height/2);
	drawing.label2.translate(5+drawing.bb.label2.width/2, (5+drawing.bb.title.height+5) - drawing.bb.label2.height/2);
	
	drawing.init(paper, ['input', 'outerbox', 'title', 'label1', 'label2']);
	
	drawing.makeDragable();
	
	return drawing;
}

/* Move element and all connected components */
MainComponent.prototype.move = function(x, y) {
	var component = this,
	    drawing = component.drawing,
	    all = drawing.all;
	
	// Move self
	all.translate(x, y);
	
	// Move components
	component.block.move(x, y);
	component.area.move(x, y);
	
}
	
/* Returns total width of element */
MainComponent.prototype.width = function() {
	var component = this,
	    drawing = component.drawing;
	return drawing.width;
}

/* Returns total height of element */
MainComponent.prototype.height = function() {
	var component = this,
	    drawing = component.drawing;
	return drawing.height;
}

/* EOF */
