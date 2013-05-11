define(["jquery-1.9.1.min", "todo_svc_module"], function(jq, todo) { 
	console.log("TODO UI loaded") ;
	
	function getTodoListLength() {
		return $(".todo_list").children().length ;
	}
	
	function getTodoListId() {
		return $(".todo_list").attr("list_id") ;
	}
	
	function setTodoListId(id) {
		$(".todo_list").attr("list_id", id) ;
	}
	
	function createListItemHtml(desc, id) {
		item =
		    "<div class=\"todo_item\" id=\"todo_item_" + id + "\">" +
		    	"<div>" +
				"<input type=\"checkbox\" class=\"todo_check\" id=\"todo_check_" + id + "\"/>" +
		    	"</div>" +
				"<div class=\"todo_desc\" id=\"todo_desc_" + id + "\">" + desc + "</div>" +
			"</div>";
		return item
	}
	
	function printObjectContent(obj) {
		var str = "{"
		for (n in obj) {
			if (typeof obj[n] !== 'function') {
				str = str + n + "=" + obj[n] + " " ;
			}
		}
		str = str + "}";
		return str ;
	}
	
	function createTodoItemObject(htmlDiv) {
		var newId = htmlDiv.attr("id").replace("todo_item_", "") ;
		var newDesc = $(htmlDiv.children(".todo_desc")[0]).text() ; 
		return new todo.Item(newId, newDesc, 0, false) ;
	}
	
	function addItemCallback(event, id) {
		addNewItem(event.currentTarget.value, getTodoListLength()+1) ;
		event.currentTarget.value = ""
	}
	
	function addNewItem(newValue, newId) {
		resetListColours() ;
		if (newValue) {
			var htmlItem = $(createListItemHtml(newValue, newId)) ;
			var objItem = createTodoItemObject(htmlItem) ;
			console.log("Adding new list item: " + htmlItem + " -- " + objItem) ;
			$(".todo_list").append(htmlItem) ;
			todo.new_todo_item(getTodoListId(), objItem) ;
		}
		addListColours() ;
	}
	
	function removeItem(id) {
		var items = $("#" + id) ;
		if (items.length !== 1) {
			throw new Exception("Internal error, found " + items.length + " items to remove for id " + id) ;
		}
		var htmlItem = $(items[0])
		var todoItem = createTodoItemObject(htmlItem) ;
		todo.remove_todo_item(getTodoListId(), todoItem.id) ;
		resetListColours() ;
		htmlItem.remove() ;
		addListColours() ;
	}
	
	function removeItemsCallback(event) {
		var checkedItems = $(".todo_check:checked").parent().parent() ;
		$.each(checkedItems, function(idx, value) {
			console.log("remove: value=" + value + " id=" + value.id) ;
			removeItem(value.id) ;
 		}) ;
	}
	
	function resetListCallback(event) {
		todo.reset() ;
		populateList(todo.get_todo_items(1)) ;
	}
	
	function itemSelectCallback(event) {
		//$($(event.currentTarget).parent().parent()).toggleClass("selected") ;
		$(this).parent().parent().toggleClass("selected") ;
	}
	
	function addListColours() {
		$(".todo_list div:first").css("color", "red") ;
		$(".todo_list div:last").css("color", "green") ;
	}
	function resetListColours() {
		$(".todo_list div:first").css("color", "") ;
		$(".todo_list div:last").css("color", "") ;
	}
	
	function populateList(listItems) {
			var uiItems = []
			$.each(listItems, function(idx, value) {
				uiItems.push(createListItemHtml(value.description, value.id)) ;
			}) ;
			
			$(".todo_list").html(uiItems.join("\n")) ;
			setTodoListId(1)
			addListColours() ;		
	}
	
	function handleKeypress(event) {
		if (event.which === 7) { // ^g
			$("#reset").toggle(); 		
		}
	}
	
	function displayHelp(event) {
		console.log("show help") ;
		$(event.target).html("<p>Add new item by entering the description above and hitting 'Return' or select items and click the 'Delete' button<br/>Remember - ^G will reveal or hide the 'Reset' button</p>") ;
	}

	function hideHelp(event) {
		$(event.target).text("(Help)") ;
		console.log("hide help") ;
	}
	
	return {
		setupList: function(listItems) {
			populateList(listItems) ;
			$("#newItem").change(addItemCallback) ;
			$("#delItems").click(removeItemsCallback) ;
			$("#reset").click(resetListCallback) ;
			$(".todo_check").click(itemSelectCallback) ;
			$("body").keypress(handleKeypress) ;
			$("#helptext").hover(displayHelp, hideHelp) ;
		}
	}
})
