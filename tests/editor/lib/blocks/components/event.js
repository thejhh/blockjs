/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Create event component constructor */
function EventComponent(args) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	this.title = "httpd.request";
	this.names = args.names || [];
	this.items = [];
}

/* Add item to schema */
EventComponent.prototype.push = function(item) {
	this.items.push(item);
}

/* Draw EventComponent on editor */
EventComponent.prototype.draw = function(args) {
	
	var event = this,
	    args = args || {},
	    editor = args.editor || {},
		paper = editor.paper || {},
	    x = args.x || 0,
	    y = args.y || 0,
		drawing = {};
	
	event.drawing = drawing;
	
	(function() {
		var i, items = event.items, length = items.length;
		for(i=0; i<length; ++i) {
			items[i].draw(args);
		}
	})();
	
	drawing.pos = {"x":x, "y":y};
	drawing.outerbox = paper.rect(x, y, 300, 95),
	drawing.title = paper.text(x+300/2, y + 20, event.title),
	drawing.label1 = paper.text(x+25, y + 25, "when"),
	drawing.label2 = paper.text(x+15, y + 40, "do"),
	drawing.innerbox = paper.rect(x+5, y+95-35-5, 290, 35);
	drawing.connector = paper.path("M 0 0 L 5 0 L 2.5 5 z");
	drawing.connector.translate(x+5+5+15, y+95-35-5);
	
	drawing.innerbox.toBack();
	drawing.outerbox.toBack();
	
	var st = paper.set();
	st.push(
		drawing.outerbox,
		drawing.title,
		drawing.label1,
		drawing.label2,
		drawing.innerbox,
		drawing.connector
	);
	drawing.all = st;
	
	drawing.connector.attr({'fill': "#000000"});
	drawing.outerbox.attr({'fill': "315-#e3d7f4-#b3a7c4"});
	drawing.innerbox.attr({'fill': "315-#ffffff-#cfcfcf"});
	drawing.label1.attr({'font-size':14, 'fill':'#4b5320'});
	drawing.label2.attr({'font-size':14, 'fill':'#4b5320'});
	drawing.title.attr({'font-size':18});
	
	makeDragable(drawing);
	
	(function() {
		var i, items = event.items, length = items.length;
		for(i=0; i<length; ++i) {
			items[i].drawing.all.toFront();
		}
	})();
	
	return drawing;
}


/* EOF */
