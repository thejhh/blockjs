/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Init everything at onLoad event */
window.onload = function(){
	var schema = new Schema(),
	    editor = new Editor(),
	    main = new MainComponent(),
	    call_listen = new CallComponent({'obj':'httpd', 'name':'listen'});
	
	schema.push(main);
	main.push(call_listen);
	call_listen.set("port", new NumberComponent({'value':1337}));
	call_listen.set("host", new TextComponent({'value':'127.0.0.1'}));
	editor.display(schema);
}

/* EOF */
