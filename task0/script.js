document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Task 0 addTask function (pure DOM, no Local Storage)
    function addTask() {
        const taskText = taskInput.value.trim(); // must be exactly like this
        if(taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Remove task on click
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';
    }

    // Event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') addTask();
    });
});
