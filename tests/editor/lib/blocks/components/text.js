/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/*** TextComponent ***/

/* Create component constructor */
function TextComponent(args) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	var args = args || {};
	this.value = args.value || "";
}

/* Draw component on editor */
TextComponent.prototype.draw = function(args) {
	
	var component = this,
	    args = args || {},
	    editor = args.editor || {},
		paper = editor.paper || {},
	    x = args.x || 0,
	    y = args.y || 0,
		drawing = {},
		w, h, bb1, bb2;
	
	component.drawing = drawing;
	
	drawing.pos = {"x":x, "y":y};
	
	// Make text elements
	drawing.label = paper.text(0, 0, "text");
	drawing.label.attr({'font-size':14, 'fill':'#4b5320'});
	
	drawing.value = paper.text(0, 0, component.value);
	drawing.value.attr({'font-size':18});
	
	bb1 = drawing.label.getBBox();
	bb2 = drawing.value.getBBox();
	w = bb1.width + 5 + bb2.width;
	h = bb2.height > bb1.height ? bb2.height : bb1.height;
	
	drawing.label.attr({'x': x+5+5+bb1.width/2,             'y':y });
	drawing.value.attr({'x': x+5+5+bb1.width+5+bb2.width/2, 'y':y });
	
	drawing.outerbox = paper.rect(x+5, y-5-h/2, 5+w+5, 5+h+5);
	drawing.outerbox.attr({'fill': "315-#d7f4e3-#a7c4b3"});
	drawing.outerbox.toBack();
	
	drawing.connector = paper.path("M 5 0 L 5 5 L 0 2.5 z");
	drawing.connector.attr({'fill': "#000000"});
	drawing.connector.translate(x, y-2.5);
	
	var st = paper.set();
	st.push(
		drawing.outerbox,
		drawing.label,
		drawing.value,
		drawing.connector
	);
	drawing.all = st;
	
	makeDragable(drawing);
	
	return drawing;
}

/* EOF */
