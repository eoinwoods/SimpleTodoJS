module("ToDoService tests") ;

require(["jquery-1.9.1.min", "todo_svc_module"], function(jq, todosvc) {

test("test initialisation results in 5 items", function() {
	todosvc.reset() ;
	var items = todosvc.get_todo_items(1) ;
	deepEqual(items.length, todosvc.get_init_length(), "Expected " + todosvc.get_init_length() + " items in initial TODO list")
}) ;

test("test adding an item increases the list by that item", function() {
	todosvc.reset() ;
	var origLength = todosvc.get_todo_items(1).length ;
	ok(origLength, todosvc.get_init_length)
	todosvc.new_todo_item(1, new todosvc.Item(999, "TESTITEM1", 0, false))
	var items = todosvc.get_todo_items(1) ;
	deepEqual(items.length, origLength+1, "Expected " + (origLength+1) + " items in augmented TODO list")
	var newItem
	for(var i=0; i < items.length; i++) {
		if (items[i].id === 999) {
			newItem = items[i] ;
			break ;
		}
	}
	ok(newItem, "Added item not found") ;
	deepEqual(newItem.id, 999, "Unexpected ID for new item") ;
	deepEqual(newItem.description, "TESTITEM1", "Unexpected desc for new item")
}) ;

test("test removing an item reduces the list by that item", function() {
	todosvc.reset() ;
	var items = todosvc.get_todo_items(1) ;
	var origLength = items.length ;
	var itemToRemove = items[items.length - 2] ;
	todosvc.remove_todo_item(1, itemToRemove.id) ;
	var changedItems = todosvc.get_todo_items(1) ;
	deepEqual(changedItems.length, origLength-1, "Expected " + (origLength-1) + " items in changed list") ;
	var removedItem
	for(var i=0; i < changedItems.length; i++) {
		if (changedItems[i].id === itemToRemove.id) {
			removedItem = items[i] ;
			break ;
		}
	}
	ok(!removedItem, "Found item " +  removedItem + " that should have been removed") ;
	
}) ;

test("test resetting resets the list to its inital state", function() {
	todosvc.reset() ;
	var origLength = todosvc.get_todo_items(1).length ;
	ok(origLength, todosvc.get_init_length, "Wrong initial length") ;
	todosvc.new_todo_item(1, new todosvc.Item(999, "TESTITEM1", 0, false))
	var newLength = todosvc.get_todo_items(1).length ;
	ok(newLength, origLength+1, "Wrong length of list after new item")
	todosvc.reset() ;
	ok(todosvc.get_todo_items(1).length, origLength, "Wrong length of list after reset")
	
}) ;

});
