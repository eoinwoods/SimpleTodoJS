SimpleTodoJS
============

A simple monolithic ToDo list manager in Javascript.  This application implements a simple ToDo list manager completely in the browser, with LocalStorage being used for persistence.

The application is structured into:

* The HTML index file
* A `main.js` file used to bootstrap the app, using Require.js
* A todo_ui.js module that manipulates the UI and provides behaviour
* A `todo_svc_module.js` module that implements a simple service to create and manipulate ToDo lists
* A `datastore.js` module that abstracts the storage mechanism from the service module (and uses LocalStorage)

While structured into modules, this application is still rather poorly structured, with the concepts of module, view and controller being mixed together.  As such, it illustrates a how a very simple approach can be taken to creating a Javascript app and shows how confused the structure gets without a better approach (such as MVC or MVP).  Follow on projects will restructure it using more sophisticated patterns.