/*
 * BlockJS Editor Test -- Schema
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Create schema constructor */
function Schema(args) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	this.items = [];
}

/* Add item to schema */
Schema.prototype.push = function(item) {
	this.names = [];
	this.items.push(item);
}

/* Draw all items on schema */
Schema.prototype.draw = function(args) {
	var i,
	    items = this.items,
		length = items.length;
	for(i = 0; i < length; ++i) {
		items[i].draw(args);
	}
}

/* EOF */
