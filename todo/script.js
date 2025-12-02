// Simple To-Do List logic with localStorage
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function saveData() {
  localStorage.setItem("todo-data", listContainer.innerHTML);
}

function showTasks() {
  const data = localStorage.getItem("todo-data");
  if (data) {
    listContainer.innerHTML = data;
  }
}
showTasks();

function addTask() {
  const text = inputBox.value.trim();
  if (!text) {
    alert("Please write something");
    return;
  }
  const li = document.createElement("li");
  li.textContent = text;
  listContainer.appendChild(li);

  const span = document.createElement("span");
  span.textContent = "\u00d7";
  li.appendChild(span);

  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});
