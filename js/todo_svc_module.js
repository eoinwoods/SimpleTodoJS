define(["jquery-1.9.1.min", "datastore"], function(jq, ds) {
	console.log("ToDoService module loaded") ;
		
	var LIST_ID = 1
	
	var ItemType = function(id, description, priority, done) {
			this.id = id ;
			this.description = description ;
			this.priority = priority ;
			this.done = done ;
	} ;
	ItemType.prototype.toString = function() {
		return "ItemType[" + this.id + ", " + this.description + ", " + this.priority + ", " + this.done + "]" ;
	}
	
	function createPersistentListId(id) {
		return "todo:list:" + id
	}
	
	function getTodoList(listId) {
		var list = ds.retrieveObjectById(createPersistentListId(listId)) ;
		return list ;
	}

	function saveTodoList(listId, list) {
		ds.persistObjectWithId(createPersistentListId(listId), list) ;
	}
	
	function setupInitialList(forceReset) {
		console.log("InitList found: " + getTodoList(LIST_ID)) ;
		if (getTodoList(LIST_ID) !== null && !forceReset) {
			return ;
		}
		var ITEM_COUNT = 5
		var newItems = [] ;
		for ( var i = 1; i <= ITEM_COUNT; i++ ) {
			var newItem = new ItemType(i, "To do item number " + i, 0, false) ;
			newItems.push(newItem)
		}
		saveTodoList(LIST_ID, newItems)
		console.log("Created list with ID " + LIST_ID + " and " + ITEM_COUNT + " items into local storage") ;		
	}
	
	setupInitialList(false) ;
	
	return {
		Item: ItemType, 
		
		get_todo_items: function(listId) {
			var items = getTodoList(listId) ;
			return items
		},
		

		new_todo_item: function(listId, todoItem) {
			//TODO - persistence
			var itemList = getTodoList(listId) ;
			itemList.push(todoItem) ;
			saveTodoList(listId, itemList) ;
			return itemList.length ;
		},

		remove_todo_item: function(listId, itemId) {
			//TODO - persistence
			var itemList = getTodoList(listId) ;
			$.each(itemList, function(idx, value) {
				if (value.id === Number(itemId)) {
					itemList.splice(idx,1 ) ;
					saveTodoList(listId, itemList) ;
					return false ; // exit the loop
				}		
			})
		},
		reset: function() {
			setupInitialList(true) ;
		}
	}
}) ;
