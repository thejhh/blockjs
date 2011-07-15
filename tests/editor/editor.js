/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Init everything at onLoad event */
window.onload = function(){
	var schema = new Schema(),
	    editor = new Editor(),
	    main = new MainComponent({'title':'Main'}),
	    call_listen = new CallComponent({'title':'httpd.listen'}),
	    event = new EventComponent({'title':'httpd.request', 'names':['request', 'response']}),
	    call_writehead = new CallComponent({'title':'response.writeHead'}),
	    call_end = new CallComponent({'title':'response.end'}),
		create_object = new CreateComponent({'title':'object'});
	
	// Create main
	call_listen.set("port", new NumberComponent({'value':1337}));
	call_listen.set("host", new TextComponent({'value':'127.0.0.1'}));
	main.block.push(call_listen);
	
/*
	// Create event
	create_object.set("Content-Type", new TextComponent({'value':'text/plain'}));
	
	call_writehead.set("status", new NumberComponent({'value':200}));
	call_writehead.set("host", create_object);
	event.push(call_writehead);
	
	call_end.set("output", new TextComponent({'value':'Hello World\n'}));
	event.push(call_end);
	
	main.push(event);
	
*/
	
	schema.push(main);
	
	// Display schema
	editor.display(schema);
	
}

/* EOF */
