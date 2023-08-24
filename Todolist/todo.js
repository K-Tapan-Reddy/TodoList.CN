var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");
var incompleteTasks = document.getElementById("pending");
var completeAll=document.getElementById("complete-all")
var clearCompleted=document.getElementById("clear-completed")

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var div = document.createElement("div");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  checkBox.type = "checkBox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  div.appendChild(editButton);
  div.appendChild(deleteButton);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(div);

  return listItem;
};

var addTask = function () {
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

// edit task
var editTask = function () {
  var listItem = this.parentNode.parentNode;
  var label = listItem.querySelector("label");
  var editInput = listItem.querySelector("input[type=text]");

  var containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
};

//Delete an existing task
var deleteTask = function () {
  var listItem = this.parentNode.parentNode;
  incompleteTasksHolder.removeChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

//complete all pending tasks
var completeAllTask=function(){
  completedTasksHolder.appendChild(incompleteTasksHolder)
}

//clear completed tasks
var clearAllData=function(){
  completedTasksHolder.innerHTML=""
}

//Mark a task as complete
var taskCompleted = function () {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

//Mark a task as incomplete
var taskIncomplete = function () {
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

//add item to Todo list
addButton.addEventListener("click", addTask);

completeAll.onclick=completeAllTask;
clearCompleted.onclick=clearAllData;

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  // select listitems chidlren
  var checkBox = taskListItem.querySelector('input[type="checkbox"]');
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
  incompleteTasks.innerText = incompleteTasksHolder.children.length+" tasks left";
};

for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
