// Get the reference to the list container and input box
const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");

// Function to add a new task
function addTask() {
    // Check if the input box is empty
    if (inputBox.value === '') {
        alert("Enter Some Data");
    } else {
        // Create a new list item and set its content
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        // Append the list item to the list container
        listContainer.appendChild(li);

        // Create a span element for the delete (x) button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        // Append the span to the list item
        li.appendChild(span);

        // Create an edit button
        let editButton = document.createElement("button");
        editButton.textContent = " ";
        editButton.classList.add("edit-button");
        // Append the edit button to the list item
        li.appendChild(editButton);
    }

    // Clear the input box
    inputBox.value = "";
    // Save the updated task list
    saveTask();
}

// Event listener for clicks on the list container
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        // Toggle the 'checked' class for list items
        e.target.classList.toggle("checked");
        // Save the updated task list
        saveTask();
    } else if (e.target.tagName === "SPAN") {
        // Remove the parent list item when the delete button is clicked
        e.target.parentElement.remove();
        // Save the updated task list
        saveTask();
    } else if (e.target.tagName === "BUTTON" && e.target.textContent === " ") {
        // Call the editTask function when the edit button is clicked
        editTask(e.target.parentElement);
    }
});

// Function to edit a task
function editTask(liElement) {
    // Get the original text content of the list item
    const originalText = liElement.firstChild.textContent;
    // Prompt the user to enter a new text
    const newText = prompt("Edit task:", originalText);

    // Check if the user didn't cancel the edit
    if (newText !== null) {
        // Set the new text content for the list item
        liElement.firstChild.textContent = newText;
        // Save the updated task list
        saveTask();
    }
}

// Function to save the task list to local storage
function saveTask() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show the tasks from local storage on page load
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// Call the showTask function to display tasks on page load
showTask();
