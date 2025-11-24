document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage (Task 1 requirement)
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => createTaskElement(taskText, false)); // false = don't save again
    }

    // Core function to create a task element
    // 'save' determines if it should be saved to Local Storage
    function createTaskElement(taskText, save = true) {
        taskText = taskText.trim();
        if(taskText === "") {
            if(save) alert("Please enter a task."); // Only alert for user input
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Remove task from DOM and Local Storage
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = tasks.filter(t => t !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if(save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = ''; // Clear input for user input
        }
    }

    // Task 0 & 1 addTask function
    function addTask() {
        createTaskElement(taskInput.value, true);
    }

    // Event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') addTask();
    });

    // Load existing tasks (Task 1)
    loadTasks();
});
