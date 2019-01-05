# todo - Marks task management app

## API Endpoints

Documentation:  https://documenter.getpostman.com/view/478773/RznCsfqV

/api/task
- POST - Create a new task

/api/tasks
- GET - Retrieve a list of all tasks
- PUT - Update all tasks in given list

/api/task/[TaskID]
- GET - Retrieve individual task
- PUT - Update an individual tasks
- DELETE - Deletes an individual task

## Entities

### Task

- id - unique id associated associated with the task
- text - the task information
- order - Position in which task is displayed in list