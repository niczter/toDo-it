var titleIn = document.getElementsByName("title")[0];
var descIn = document.getElementsByName("desc")[0];

showList();
function showList(){
	var endPoint= "https://cors-anywhere.herokuapp.com/www.colenico.com/toDo/functions.php?function=showList";
	var xhr = new XMLHttpRequest();
		xhr.open('GET', endPoint, true);
		xhr.onload = function(){
			if (this.status == 200){
				var data = JSON.parse(this.response);
				var info = '';

				for (i=0; i<data.length; i++) {
					info += '<div id="task'+data[i].id+'"><div id="item'+data[i].id+'" class="rowTitle"><div id="itemLogo'+data[i].id+'" class="itemText colorScheme placeLogo" onclick="delTask('+data[i].id+')"><i class="far fa-square"></i></div><div id="itemTitle'+data[i].id+'" class="itemTitle colorScheme"><button type="text" onclick="viewTask('+data[i].id+')" class="itemText">'+data[i].dotitle+'</button></div></div></div>';
     			}
				document.getElementById('itemsQueue').innerHTML = info;
			};
		};
		xhr.send();
}
function showForm(){
	document.getElementById('task').innerHTML = '<div id="addItem" class="rowTitle"><div id="backLogo" class="itemText colorScheme placeLogo" onclick="landing()"><i class="fas fa-arrow-left"></i></div><div id="addItemTitle" class="itemTitle colorScheme"><input type="text" name="title" class="itemText" placeholder="Add a Task"></div></div><div id="addDesc" class="rowDesc addDesc"><div class="columnButt"><div onclick="addTask()" class="itemText colorScheme placeLogo"><i class="fas fa-check"></i></div><div class="placeLogo"></div></div><div id="addItemDesc" class="addItemDesc colorScheme"><input type="text" name="desc" class="descText" placeholder="Add a Description"></div></div>';
}
function landing(){
	document.getElementById('task').innerHTML = '<div id="addItem" class="rowTitle"><div id="addItemLogo" class="itemText colorScheme placeLogo" onclick="showForm()"><i class="fas fa-plus"></i></div></div>';
	showList();
}
function addTask(){
	var endPoint = "https://cors-anywhere.herokuapp.com/www.colenico.com/toDo/functions.php?function=addTask"
	var formData = new FormData();
	formData.append("dotitle", document.getElementsByName('title')[0].value);
	formData.append("dodesc", document.getElementsByName('desc')[0].value);
	var xhr = new XMLHttpRequest();
		xhr.open('POST', endPoint, true);
		xhr.onload = function(){
			if (this.status == 200){
				showForm();
				showList();
			};
		};
		xhr.send(formData);
}
function delTask(id){
	var endPoint = "https://cors-anywhere.herokuapp.com/www.colenico.com/toDo/functions.php?function=delTask&id="+id;
	var xhr = new XMLHttpRequest();
		xhr.open('GET', endPoint, true);
		xhr.onload = function(){
			if (this.status == 200){
				landing();
			};
		};
		xhr.send();
}
function viewTask(id){
	var endPoint = "https://cors-anywhere.herokuapp.com/www.colenico.com/toDo/functions.php?function=viewTask&id="+id;
	var xhr = new XMLHttpRequest();
		xhr.open('GET', endPoint, true);
		xhr.onload = function(){
			if (this.status == 200){
				var data = JSON.parse(this.response);
				var info = '';
				info = '<div id="addItem" class="rowTitle"><div id="backLogo" class="itemText colorScheme placeLogo" onclick="landing()"><i class="fas fa-arrow-left"></i></div><div id="addItemTitle" class="itemTitle colorScheme"><button type="text" name="title" class="itemText" onclick="editTask('+data[0].id+')">'+data[0].dotitle+'</button></div></div><div id="addDesc" class="rowDesc addDesc"><div class="columnButt"><div onclick="editTask('+data[0].id+')" class="itemText colorScheme placeLogo"><i class="far fa-edit"></i></div><div class="placeLogo"></div></div><div id="addItemDesc" class="addItemDesc colorScheme"><p type="text" name="desc" class="descText descTextDisplay">'+data[0].dodesc+'</p></div></div>';
				document.getElementById('task').innerHTML = info;
				document.getElementById('itemsQueue').innerHTML = '';
			};
		};
		xhr.send();
}
function editTask(id){
	var endPoint = "https://cors-anywhere.herokuapp.com/www.colenico.com/toDo/functions.php?function=viewTask&id="+id;
	var xhr = new XMLHttpRequest();
		xhr.open('GET', endPoint, true);
		xhr.onload = function(){
			if (this.status == 200){
				var data = JSON.parse(this.response);
				var titleVal = data[0].dotitle;
				var descVal = data[0].dodesc;
				var info = '<div id="addItem" class="rowTitle"><div id="addItemLogo" class="itemText colorScheme placeLogo" onclick="viewTask('+id+')"><i class="fas fa-times"></i></div><div id="addItemTitle" class="itemTitle colorScheme"><input type="text" name="title" class="itemText" value ="'+titleVal+'"></div></div><div id="addDesc" class="rowDesc addDesc"><div class="columnButt"><div class="itemText colorScheme placeLogo" onclick="delTask('+id+')"><i class="far fa-trash-alt"></i></div><div class="itemText colorScheme placeLogo" onclick="updateTask('+id+')"><i class="fas fa-check"></i></div></div><div id="addItemDesc" class="addItemDesc colorScheme"><input type="text" name="desc" class="descText" value ="'+descVal+'"></div></div>';	
				document.getElementById('task').innerHTML = info;
			};
		};
		xhr.send();
}
function updateTask(id){
	var endPoint = "https://cors-anywhere.herokuapp.com/www.colenico.com/toDo/functions.php?function=updateTask&id="+id;
	var formData = new FormData();
	formData.append("dotitle", document.getElementsByName('title')[0].value);
	formData.append("dodesc", document.getElementsByName('desc')[0].value);
	var xhr = new XMLHttpRequest();
		xhr.open('POST', endPoint, true);
		xhr.onload = function(){
			if (this.status == 200){
				viewTask(id);
			};
		};
		xhr.send(formData);
}
