/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Component constructor */
function EventComponent(args) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	this.title = args.title || "Unknown";
	this.names = args.names || [];
	this.items = [];
}

/* Add item to schema */
EventComponent.prototype.push = function(item) {
	this.items.push(item);
}

/* Draw component to editor */
EventComponent.prototype.draw = function(args) {
	
	var component = this,
	    args = args || {},
	    zindex = args.zindex || 0,
	    editor = args.editor || {},
		paper = editor.paper || {},
	    x = args.x || 0,
	    y = args.y || 0,
		drawing = {},
		max_item_w, item_h;
	
	component.drawing = drawing;
	
	drawing.pos = {"x":x, "y":y};
	
	// Draw items (to incorrect place)
	max_item_w = 0;
	item_h = 0;
	(function() {
		var i, items = component.items, length = items.length, last, w;
		for(i=0; i<length; ++i) {
			last = items[i].draw(merge_objects(args, {'zindex':zindex+100, 'x':0, 'y':0}));
			w = items[i].width();
			if(w > max_item_w) max_item_w = w;
			item_h += items[i].height();
		}
	})();
	
	drawing.width = 10+5+max_item_w+5+10;
	drawing.height = 60+item_h;
	
	// Draw input connector
	drawing.input = paper.circle(x, y, 2);
	drawing.input.attr({'fill':'#ff0000', 'stroke':'none'});
	
	// Draw outerbox
	drawing.outerbox = paper.rect(x, y, drawing.width, drawing.height);
	
	// Draw title
	drawing.title = paper.text(x+300/2, y + 20, component.title);
	
	// Draw label1
	drawing.label1 = paper.text(x+25, y + 25, "when");
	
	// Draw labe2
	drawing.label2 = paper.text(x+15, y + 40, "do");
	
	// Draw innerbox
	drawing.innerbox = paper.rect(x+5, y+drawing.height-item_h-5, 5+max_item_w+5, 5+item_h+5);
	drawing.innerbox.insertAfter(drawing.title);
	
	// Move items to correct place
	(function() {
		var i, items = component.items, length = items.length, last, cury = y+drawing.height-item_h;
		for(i=0; i<length; ++i) {
			items[i].move(x+5+25-2.5, cury);
			cury += items[i].height();
			items[i].drawing.all.insertAfter(drawing.innerbox);
		}
	})();
	
	// Draw connector
	drawing.connector = paper.path("M 0 0 L 5 0 L 2.5 5 z");
	drawing.connector.translate(x+5+5+15, y+95-35-5);
	
	var st = paper.set();
	st.push(
		drawing.input,
		drawing.outerbox,
		drawing.title,
		drawing.label1,
		drawing.label2,
		drawing.innerbox,
		drawing.connector
	);
	drawing.all = st;
	
	drawing.connector.attr({'fill': "#000000", 'z-index':zindex});
	drawing.outerbox.attr({'fill': "315-#e3d7f4-#b3a7c4", 'z-index':zindex});
	//drawing.outerbox.insertBefore(drawing.label1);
	drawing.innerbox.attr({'fill': "315-#ffffff-#cfcfcf", 'z-index':zindex+1});
	//drawing.innerbox.insertAfter(drawing.outerbox);
	drawing.label1.attr({'font-size':14, 'fill':'#4b5320', 'z-index':zindex+2});
	drawing.label2.attr({'font-size':14, 'fill':'#4b5320', 'z-index':zindex+2});
	drawing.title.attr({'font-size':18, 'z-index':zindex+3});
	
	makeDragable(drawing);
	
	return drawing;
}

/* Move element and all connected components */
EventComponent.prototype.move = function(x, y) {
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
EventComponent.prototype.width = function() {
	var component = this,
	    drawing = component.drawing;
	return drawing.width;
}

/* Returns total height of element */
EventComponent.prototype.height = function() {
	var component = this,
	    drawing = component.drawing;
	return drawing.height;
}

/* EOF */
