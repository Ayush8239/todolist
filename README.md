# To-Do List Application

## Description
A React-based To-Do List application that allows users to add, remove, and mark tasks as completed. The application supports task filtering and persists data using localStorage.

## Features
- Add new tasks
- Mark tasks as completed/incomplete
- Edit tasks
- Delete tasks
- Filter tasks (All, Completed, Incomplete)
- Persistent storage using localStorage
- Validate task input
- Display tasks dynamically

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Ayush8239/todolist.git
    cd todolist
    ```

2. Install dependencies:
    ```bash
    npm i
    ```

3. Start the application:
    ```bash
    npm run dev
    ```
4. Go to http://localhost:5173/
   
## Testing Guidance

1. **Add a Todo**: Enter a task and click "Save or Press Enter".
2. **Mark as Completed**: Click the checkbox or task to mark as completed.
3. **Edit a Todo**: Click the edit button next to a task to edit the task , it will show in the input of add task then the task can be saved again.
4. **Delete a Todo**: Click the delete button next to a task to delete a task (deletes directly!).
5. **Filter Tasks**: Use the filter checkboxes to view tasks based on their status i.e Show either All or Completed or Incomplete.
6. **LocalStorage**: Refresh the page to ensure tasks persist between sessions.
7. **Validate the input** : The Save button will not be in action if the input text has less than or equal to 3 characters.

## Notes
- Ensure that the input task length is greater than 3 characters to enable the "Save" button.
