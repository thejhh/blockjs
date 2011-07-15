/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Create component constructor */
function CallComponent(args) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	var args = args || {};
	this.title = args.title || "";
	this.opts = {};
}

/* Draw component on editor */
CallComponent.prototype.draw = function(args) {
	
	var component = this,
	    args = args || {},
	    editor = args.editor || {},
		paper = editor.paper || {},
	    x = args.x || 0,
	    y = args.y || 0,
		drawing = new Drawing(x, y, 1, 1),
		w, h, topw, toph, bb1, bb2, optbbs = {}, max_opt_keys_w, max_opt_keys_h, opts_amount, max_opt_values_h, max_opt_values_w, max_opt_h;
	
	component.drawing = drawing;
	
	// Draw input circle
	drawing.input = paper.circle(x, y, 2);
	drawing.input.attr({'fill':'#ff0000', 'stroke':'none'});
	
	// Draw label
	drawing.label = paper.text(0, 0, "call");
	drawing.label.attr({'font-size':14, 'fill':'#4b5320'});
	bb1 = drawing.label.getBBox();
	
	// Draw title
	drawing.title = paper.text(0, 0, component.title);
	drawing.title.attr({'font-size':18});
	bb2 = drawing.title.getBBox();
	
	// Draw items
	(function() {
		var i, items = component.opts;
		drawing.values = {};
		drawing.bb_values = {};
		for(i in items) if(items.hasOwnProperty(i)) {
			drawing.values[i] = items[i].draw(merge_objects(args, {'x':0, 'y':0}));
			drawing.bb_values[i] = drawing.values[i].outerbox.getBBox();
		}
	})();
	
	// Draw option keywords
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
			if(drawing.bb_values[i].width > max_opt_values_w) max_opt_values_w = drawing.bb_values[i].width;
			if(drawing.bb_values[i].height > max_opt_values_h) max_opt_values_h = drawing.bb_values[i].height;
			opts_amount++;
		}
	})();
	
	max_opt_h = (max_opt_keys_h > max_opt_values_h) ? max_opt_keys_h : max_opt_values_h;
	
	w = bb1.width + 5 + bb2.width + 5 + max_opt_keys_w;
	toph = bb2.height > bb1.height ? bb2.height : bb1.height;
	h = toph;
	if( (5+max_opt_h) * opts_amount - 5 > h) h = (5+max_opt_h) * opts_amount - 5;
	
	drawing.resize(5+w+5 + 5 + max_opt_values_w, h);
	
	drawing.label.attr({'x': x-15+5+bb1.width/2,             'y':y+h/2 });
	drawing.title.attr( {'x': x-15+5+bb1.width+5+bb2.width/2, 'y':y+h/2 });
	
	// Draw outer box in correct size
	drawing.outerbox = paper.rect(x-15, y, 5+w+5, h);
	drawing.outerbox.attr({'fill': "315-#d7e3f4-#d7e3f4"});
	drawing.outerbox.insertBefore(drawing.label);
	
	// Draw connector
	/*
	drawing.connector = paper.path("M 0 0 L 5 0 L 2.5 5 z");
	drawing.connector.attr({'fill': "#000000"});
	drawing.connector.translate(x-2.5, y+h);
	*/
	
	// Move items to correct place
	(function() {
		var i, items = component.opts, cury=y+max_opt_h/2;
		for(i in items) if(items.hasOwnProperty(i)) {
			items[i].move(x+drawing.width-max_opt_values_w-5-15, cury);
			cury += 5 + items[i].height();
			items[i].drawing.all.insertAfter(drawing.title);
		}
	})();
	
	// 
	(function(){
		var i, opts = drawing.opts, tmp_y = y - ( ((5+max_opt_h)*opts_amount-5) / 2 - max_opt_h/2 );
		tmp_y = y + max_opt_values_h/2;
		for(i in opts) if(opts.hasOwnProperty(i)) {
			opts[i].attr( {'x': x-15+5+bb1.width+5+bb2.width+5+optbbs[i].width/2, 'y':tmp_y });
			tmp_y += max_opt_h + 5;
		}
	})();
	
	drawing.init(paper, ['input', 'outerbox', 'label', 'name']);
	(function(){
		var i, opts = drawing.opts;
		for(i in opts) if(opts.hasOwnProperty(i)) {
			drawing.all.push(opts[i]);
		}
	})();

	drawing.makeDragable();
	
	return drawing;
}

/* Set option */
CallComponent.prototype.set = function(name, value) {
	var component = this;
	component.opts[name] = value;
}

/* Move element and all connected components */
CallComponent.prototype.move = function(x, y) {
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
CallComponent.prototype.width = function() {
	var component = this,
	    drawing = component.drawing;
	return drawing.width;
}

/* Returns total height of element */
CallComponent.prototype.height = function() {
	var component = this,
	    drawing = component.drawing;
	return drawing.height;
}

/* EOF */
