/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Create component constructor */
function CreateComponent(args) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	var args = args || {};
	this.title = args.title;
	this.opts = {};
}

/* Draw component on editor */
CreateComponent.prototype.draw = function(args) {
	
	var component = this,
	    args = args || {},
	    editor = args.editor || {},
		paper = editor.paper || {},
	    x = args.x || 0,
	    y = args.y || 0,
		drawing = new Drawing(x, y, 1, 1),
		w, h, topw, toph, bb1, bb2, optbbs = {}, max_opt_keys_w, max_opt_keys_h, opts_amount, max_opt_values_w, max_opt_values_h, max_opt_h;
	
	component.drawing = drawing;
	
	// Draw input connector
	drawing.input = paper.circle(x, y, 2);
	drawing.input.attr({'fill':'#ff0000', 'stroke':'none'});
	
	// Draw label
	drawing.label = paper.text(0, 0, "create");
	drawing.label.attr({'font-size':14, 'fill':'#4b5320'});
	bb1 = drawing.label.getBBox();
	
	// Draw title
	drawing.title = paper.text(0, 0, component.title);
	drawing.title.attr({'font-size':18});
	bb2 = drawing.title.getBBox();
	
	// Draw keyword values (we don't know correct place yet)
	(function() {
		var i, items = component.opts;
		drawing.values = {};
		drawing.bb_values = {};
		for(i in items) if(items.hasOwnProperty(i)) {
			drawing.values[i] = items[i].draw(merge_objects(args, {'x':0, 'y':0}));
			drawing.bb_values[i] = drawing.values[i].outerbox.getBBox();
		}
	})();
	
	// Draw keywords
	max_opt_keys_w = 0;
	max_opt_keys_h = 0;
	max_opt_values_w = 0;
	max_opt_values_h = 0;
	opts_amount = 0;
	drawing.opts = {};
	(function(){
		var i, opts = component.opts, o;
		for(i in opts) if(opts.hasOwnProperty(i)) {
			o = paper.text(0, 0, i);
			o.attr({'font-size':14, 'fill':'#4b5320'});
			drawing.opts[i] = o;
			optbbs[i] = o.getBBox();
			if(optbbs[i].width > max_opt_keys_w) max_opt_keys_w = optbbs[i].width;
			if(optbbs[i].height > max_opt_keys_h) max_opt_keys_h = optbbs[i].height;
			if(opts[i].width() > max_opt_values_w) max_opt_values_w = opts[i].width();
			if(drawing.bb_values[i].height > max_opt_values_h) max_opt_values_h = drawing.bb_values[i].height;
			opts_amount++;
		}
	})();
	
	max_opt_h = (max_opt_keys_h > max_opt_values_h) ? max_opt_keys_h : max_opt_values_h;
	
	w = bb1.width + 5 + bb2.width + 5 + max_opt_keys_w;
	toph = bb2.height > bb1.height ? bb2.height : bb1.height;
	h = toph;
	if( (5+max_opt_h) * opts_amount - 5 > h) h = (5+max_opt_h) * opts_amount - 5;
	
	drawing.resize(5+w+5 + 5+max_opt_values_w, h);
	
	// Move label and title
	drawing.label.attr({'x': x+5+5+bb1.width/2,             'y':y });
	drawing.title.attr( {'x': x+5+5+bb1.width+5+bb2.width/2, 'y':y });
	
	// Draw outerbox
	drawing.outerbox = paper.rect(x+5, y-h/2, 5+w+5, h);
	drawing.outerbox.attr({'fill': "315-#e3d7f4-#b3a7c4"});
	drawing.outerbox.insertBefore(drawing.label);
	
	// Draw connector
	drawing.connector = paper.path("M 5 0 L 5 5 L 0 2.5 z");
	drawing.connector.attr({'fill': "#000000"});
	drawing.connector.translate(x, y-2.5);
	
	// Move options keywords to right place
	(function(){
		var i, opts = drawing.opts, tmp_y = y;
		for(i in opts) if(opts.hasOwnProperty(i)) {
			opts[i].attr( {'x': x+5+5+bb1.width+5+bb2.width+5+optbbs[i].width/2, 'y':tmp_y });
			tmp_y += max_opt_h + 5;
		}
	})();
	
	// Move option values to correct place
	(function() {
		var i, items = drawing.values, cury=y;
		for(i in items) if(items.hasOwnProperty(i)) {
			items[i].all.translate(x+5+drawing.width - 5 - max_opt_values_w, cury);
			cury += 5 + items[i].height;
		}
	})();
	
	// Group elements as a set
	drawing.init(paper, ['input', 'outerbox', 'label', 'title', 'connector']);
	(function(){
		var i, opts = drawing.opts;
		for(i in opts) if(opts.hasOwnProperty(i)) {
			drawing.all.push(opts[i]);
		}
	})();

	drawing.makeDragable(component);
	
	return drawing;
}

/* Set option */
CreateComponent.prototype.set = function(name, value) {
	var component = this;
	component.opts[name] = value;
}
	
/* Move element and all connected components */
CreateComponent.prototype.move = function(x, y) {
	var component = this,
	    drawing = component.drawing,
	    all = drawing.all;
	
	// Move self
	all.translate(x, y);
	
	// Move components
	(function() {
		var i, items = component.opts;
		for(i in items) if(items.hasOwnProperty(i)) {
			items[i].move(x, y);
		}
	})();
	
}
	
/* Returns total width of element */
CreateComponent.prototype.width = function() {
	var component = this,
	    drawing = component.drawing;
	return drawing.width;
}

/* Returns total height of element */
CreateComponent.prototype.height = function() {
	var component = this,
	    drawing = component.drawing;
	return drawing.height;
}

/* EOF */
