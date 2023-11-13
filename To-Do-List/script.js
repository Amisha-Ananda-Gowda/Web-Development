const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");

function addTask() {
    if (inputBox.value === '') {
        alert("Enter Some Data");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

       let editButton = document.createElement("button");
       editButton.textContent =" ";
       editButton.classList.add("edit-button"); 
       li.appendChild(editButton);
    }

    inputBox.value = "";
    saveTask();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTask();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveTask();
    } else if (e.target.tagName === "BUTTON" && e.target.textContent === " ") {
        editTask(e.target.parentElement);
    }
});

function editTask(liElement) {
    const originalText = liElement.firstChild.textContent;
    const newText = prompt("Edit task:", originalText);

    if (newText !== null) { // Check if the user didn't cancel the edit
        liElement.firstChild.textContent = newText;
        saveTask();
    }
}

function saveTask() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
