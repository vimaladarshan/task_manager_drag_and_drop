const containers = document.querySelectorAll('.listContainer');

draggableFunction();
function draggableFunction(){
  const draggables = document.querySelectorAll('.task');
  draggables.forEach(draggable=>{
    draggable.addEventListener('dragstart',()=>{
      draggable.classList.add('dragging');
    })
    draggable.addEventListener('dragend',()=>{
      draggable.classList.remove('dragging');
    })
  })
}




containers.forEach(container=>{
  container.addEventListener('dragover',e=>{
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

function addTask() {
  const task = createElement('div',{
    "class":["task"]
  });
  task.innerHTML = document.getElementById('taskContent').value;
  console.log(task);
  task.setAttribute('draggable',true);
  const taskList = document.querySelector('#taskList');
  taskList.appendChild(task);
  draggableFunction()
  modal.style.display = "none";
  document.getElementById('taskContent').value = '';
}

function createElement(type, attributes) {
  var element = document.createElement(type);
  for (var key in attributes) {
    if (key == "class") {
        element.classList.add.apply(element.classList, attributes[key]); // add all classes at once
    } else {
      element[key] = attributes[key];
    }
  }
  return element;
}
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function addEditTask() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}