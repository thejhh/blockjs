blockjs Documentation - Draft Version
=====================================

Components
----------

[Components](https://github.com/jheusala/blockjs/tree/master/doc/draft/components) are reusable small blocks of code presented and used 
graphically in the IDE. Users can choose these components from catalogs or 
even write their own and share to the world.

Schemas
-------

An application made with blockjs will not have a source code in the 
traditional meaning. It will be made of a schema that uses different 
components. These components might be from different vendors and there even 
might be more than one choise for a vendor for a particular component. You 
might even use different versions of the same component at the same time in a 
single schema.

Schemas can be shared and reused from online catalogs in the same way as 
components.

User Interface
--------------

Programming is done by drag'n'droping components from a catalog into your schema.

Diagram Models
--------------

### Simplified Model

Simplified Model presents the code as components more naturally but will need 
more work to build these components.

![Hello World webserver using Simplified Model](https://github.com/jheusala/blockjs/raw/master/doc/draft/simplified.png)

### Generic Model

Generic Model was the first draft I made and presents the JavaScript code as 
components almost 1-to-1.

![Hello World webserver using Generic Model](https://github.com/jheusala/blockjs/raw/master/doc/draft/generic.png)
