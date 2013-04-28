define(function() {
	
	console.log("datastore.js loaded") ;
	
	return {
		persistObjectWithId: function(id, object) {
			// Note the need to "stringify" to JSON before storing, otherwise it gets 
			// mangled into a string automatically
			localStorage.setItem(id, JSON.stringify(object)) ;
		},
		retrieveObjectById: function(id) {
			var strObj = localStorage.getItem(id) ;
			return JSON.parse(strObj) ;
		}
	}
}) ;
	