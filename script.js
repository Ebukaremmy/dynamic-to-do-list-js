// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
    }

    // Function to add a new task
    // 'save' indicates whether to save to Local Storage
    function addTask(taskText, save = true) {
        taskText = taskText.trim();
        if(taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Remove task when button is clicked
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            // Update Local Storage
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = tasks.filter(t => t !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        });

        // Append button to li and li to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if(save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear input field
        taskInput.value = '';
    }

    // Event listener: add task when button is clicked
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    // Event listener: add task when Enter key is pressed
    taskInput.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
