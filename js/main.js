require(["jquery-1.9.1.min", "todo_ui", "todo_svc_module"], function(jq, todo, todosvc) {
	console.log("in main.js")
// 
	// var items = svc.get_todo_items(1) ;
	// $.each(listItems, function(idx, value) {
		// console.log(value.description)
	// }) ;
	$( document ).ready(function() {
		var items = todosvc.get_todo_items(1) ;
		todo.setupList(items) ;
	});
});
