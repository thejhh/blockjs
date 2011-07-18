/*
 * BlockJS Editor Test -- Schema
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Create schema constructor */
function Schema(args) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	var component = this;
	component.area = new AreaComponent(merge_objects(args, {'x':0, 'y':0, 'parent':component}));
}

/* Draw all items on schema */
Schema.prototype.draw = function(args) {
	var component = this;
	component.area.draw(args);
}

/* EOF */
