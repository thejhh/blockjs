/*
 * BlockJS Editor Test -- Drop Event Library
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* Constructor */
function Drop(x, y, w, h) {
	if(!(this instanceof arguments.callee)) return new (arguments.callee)(args);
	var lib = this;
	lib.next_id = 0;
	lib.events = [];
}

/* Add drop event */
Drop.prototype.add = function(x, y, fun) {
	var lib = this,
	    events = lib.events,
	    id = lib.next_id++,
	    e = {'id':id, 'x':x, 'y':y, 'fun':fun};
	events[id] = e;
	return e;
}

/* Remove drop event */
Drop.prototype.remove = function(event) {
	var lib = this,
	    events = lib.events;
	delete events[event.id];
}

/* Calculate distance of two points */
function distance(x1, y1, x2, y2) {
	var abs = Math.abs,
	    x = abs(x1-x2),
	    y = abs(y1-y2);
	return Math.sqrt(x*x+y*y);
}
	
/* Execute events until first successful near (x,y) */
Drop.prototype.exec = function(x, y) {
	
	var lib = this,
	    events = lib.events,
	    near = [],
		i=0, length = events.length,
	    e, d,
		limit = 5;
	
	for(;i<length; ++i) {
		e = events[i];
		d = distance(x, y, e.x, e.y);
		if(d < limit) near.push({'d':d, 'e':e});
	}
	
	if(near.length === 0) return;
	if(near.length === 1) return events[0].fun();
	
	near.sort(function(a, b) { return (a.d === b.d) ? 0 : ((a.d < b.d) ? -1 : 1); });
	
	return events[0].fun();
}

/* EOF */
