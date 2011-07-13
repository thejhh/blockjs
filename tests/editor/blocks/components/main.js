/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

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
	
	var main = this,
	    args = args || {},
	    editor = args.editor || {},
		paper = editor.paper || {},
	    x = args.x || 0,
	    y = args.y || 0,
		drawing = {};
	
	main.drawing = drawing;
	
	(function() {
		var i, items = main.items, length = items.length;
		for(i=0; i<length; ++i) {
			items[i].draw(args);
		}
	})();
	
	drawing.pos = {"x":x, "y":y};
	drawing.outerbox = paper.rect(x, y, 300, 95),
	drawing.title = paper.text(x+300/2, y + 20, this.title),
	drawing.label1 = paper.text(x+25, y + 25, "when"),
	drawing.label2 = paper.text(x+15, y + 40, "do"),
	drawing.innerbox = paper.rect(x+5, y+95-35-5, 290, 35);
	drawing.connector = paper.path("M 0 0 L 5 0 L 2.5 5 z");
	drawing.connector.translate(x+15, y+95-35-5);
	
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
		var i, items = main.items, length = items.length;
		for(i=0; i<length; ++i) {
			items[i].drawing.all.toFront();
		}
	})();
	
	return drawing;
}


/* EOF */
