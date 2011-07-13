/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Init everything at onLoad event */
window.onload = function(){
	var schema = new Schema(),
	    editor = new Editor();
	
	var main = new MainComponent();
	schema.push(main);
	main.push(new TextComponent({'value':'127.0.0.1'}));
	main.push(new NumberComponent({'value':123}));
	editor.display(schema);
}

/* EOF */
