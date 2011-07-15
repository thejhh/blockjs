/*
 * BlockJS Editor Test
 * Copyright 2011 Jaakko-Heikki Heusala <jheusala@iki.fi>
 * $Id: $
 */

/* */
function merge_objects(obj1, obj2) {
	var i, o = {};
	for(i in obj1) if(obj1.hasOwnProperty(i)) o[i] = obj1[i];
	for(i in obj2) if(obj2.hasOwnProperty(i)) o[i] = obj2[i];
	return o;
}

/* EOF */
