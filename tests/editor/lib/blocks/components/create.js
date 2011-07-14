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
		drawing = {},
		w, h, topw, toph, bb1, bb2, optbbs = {}, max_opt_keys_w, max_opt_keys_h, opts_amount, max_opt_values_h, max_opt_h;
	
	(function() {
		var i, items = component.opts;
		drawing.values = {};
		drawing.bb_values = {};
		for(i in items) if(items.hasOwnProperty(i)) {
			drawing.values[i] = items[i].draw(args);
			drawing.bb_values[i] = drawing.values[i].outerbox.getBBox();
		}
	})();
	
	component.drawing = drawing;
	
	drawing.pos = {"x":x, "y":y};
	
	// Make text elements
	drawing.label = paper.text(0, 0, "create");
	drawing.label.attr({'font-size':14, 'fill':'#4b5320'});
	bb1 = drawing.label.getBBox();
	
	drawing.title = paper.text(0, 0, component.title);
	drawing.title.attr({'font-size':18});
	bb2 = drawing.title.getBBox();
	
	max_opt_keys_w = 0;
	max_opt_keys_h = 0;
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
			if(drawing.bb_values[i].height > max_opt_values_h) max_opt_values_h = drawing.bb_values[i].height;
			opts_amount++;
		}
	})();
	
	max_opt_h = (max_opt_keys_h > max_opt_values_h) ? max_opt_keys_h : max_opt_values_h;
	
	w = bb1.width + 5 + bb2.width + 5 + max_opt_keys_w;
	toph = bb2.height > bb1.height ? bb2.height : bb1.height;
	h = toph;
	if( (5+max_opt_h) * opts_amount - 5 > h) h = (5+max_opt_h) * opts_amount - 5;
	
	drawing.label.attr({'x': x-15+5+bb1.width/2,             'y':y+h/2 });
	drawing.title.attr( {'x': x-15+5+bb1.width+5+bb2.width/2, 'y':y+h/2 });
	
	drawing.outerbox = paper.rect(x-15, y, 5+w+5, h);
	drawing.outerbox.attr({'fill': "315-#e3d7f4-#b3a7c4"});
	drawing.outerbox.toBack();
	
	/*
	drawing.in_connector = paper.path("M 2.5 0 L 5 5 L 0 5 z");
	drawing.in_connector.attr({'fill': "#4B5320", 'stroke':'#4B5320'});
	drawing.in_connector.translate(x-5, y);
	*/
	
	drawing.connector = paper.path("M 0 0 L 5 0 L 2.5 5 z");
	drawing.connector.attr({'fill': "#000000"});
	drawing.connector.translate(x-2.5, y+h);
	
	(function(){
		var i, opts = drawing.opts, tmp_y = y - ( ((5+max_opt_h)*opts_amount-5) / 2 - max_opt_h/2 );
		tmp_y = y + max_opt_values_h/2;
		for(i in opts) if(opts.hasOwnProperty(i)) {
			opts[i].attr( {'x': x-15+5+bb1.width+5+bb2.width+5+optbbs[i].width/2, 'y':tmp_y });
			tmp_y += max_opt_h + 5;
		}
	})();
	
	var st = paper.set();
	st.push(
		drawing.outerbox,
		drawing.label,
		drawing.title,
		//drawing.in_connector,
		drawing.connector
	);
	(function(){
		var i, opts = drawing.opts;
		for(i in opts) if(opts.hasOwnProperty(i)) {
			st.push(opts[i]);
		}
	})();
	drawing.all = st;
	
	makeDragable(drawing);
	
	return drawing;
}

/* Set option */
CreateComponent.prototype.set = function(name, value) {
	var component = this;
	component.opts[name] = value;
}
	
/* EOF */
