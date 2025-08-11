# Tasks++

### Task manager app using:
    + Backend in NestJS (using v11.0.10).
    + Frontend in Angular (newest version, v20.1.5)

### Features:
    + Task Creation: Users can create new tasks by providing a task title and a description.

    + View and list tasks: The user will be able to see a list of tasks and details of a task when clicking on a list item.

    + Task Modification: Users can edit existing tasks to update their description, category, priority and due date.

    + Task Deletion: Users can remove tasks from the list when they are no longer relevant.

    + Mark as Completed: Users can mark tasks as completed to indicate their status.

    + Task Priority
        Users can assign priority levels to tasks for better organization, such as:
        + Low
        + Normal
        + High
        + Critical

    + Task Categorization
        Users can categorize tasks into different groups or categories. We will allow a task to be part of more than one category or none. Categories include:
        + Home
        + Work
        + Personal
        + Shopping

    + Sorting and Filtering
        Users can filter and sort tasks in the listview based on the following criteria:
        + Due date
        + Priority
        + Categories
        + Completion status

### About development choices made in Angular app:
    + Use of zoneless app whitout zone.js (pre-release feature included in v20),
    + Enabled SSR (server-side rendering),
    + Use of oklch notation for colors, added in the [CSS Color 4 specification](https://www.w3.org/TR/css-color-4/), which has better consistency for the human eyes,
    + Use of font-optical-sizing property to improve readability and aesthetics.