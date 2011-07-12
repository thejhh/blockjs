Components
==========

Components in blockjs are reusable small blocks of code presented and used 
graphically in the IDE. Users can choose these components from catalogs or 
even write their own and share to the world.

Main Component
--------------

The main component specifies where the application starts and what objects it can use:

![Main component for an application](https://github.com/jheusala/blockjs/raw/master/doc/draft/components/main.png)

This application uses an object named httpd and the programmer can use all 
components defined for that specific object.

Data components
---------------

![Number Component](https://github.com/jheusala/blockjs/raw/master/doc/draft/components/number.png)

![Text Component](https://github.com/jheusala/blockjs/raw/master/doc/draft/components/text.png)

Objects can be created, too:

![Component to create an object](https://github.com/jheusala/blockjs/raw/master/doc/draft/components/create-full-object.png)

This same object as JavaScript code:
 {'foo':123,'bar':'text/plain'}

3rd Party Components
--------------------

Here is a component that calls method listen in the http server object with two arguments:

![Component to call method](https://github.com/jheusala/blockjs/raw/master/doc/draft/components/call-httpd-listen.png)

Event handlers are created with another component:

![Component to handle event](https://github.com/jheusala/blockjs/raw/master/doc/draft/components/httpd-request-event.png)

Event handlers do not need to be connected to other components.

Full Examples
-------------

This is a schema for hello world webserver.

![Hello World webserver using Simplified Model](https://github.com/jheusala/blockjs/raw/master/doc/draft/simplified.png)
