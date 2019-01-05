var express = require('express');
var router = express.Router();

var tasks = []; //TODO: Replace with persistent storage

//Create a new task
router.post('/task', function(req, res, next) {
  console.log("New Task Added: " + req.body)
  var newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask); //TODO: Replace with persistent storage
  res.status(200).json(newTask);
})

//Retrieve a list of all tasks
router.get('/tasks', function(req, res, next){
  console.log("All Tasks: " + tasks);
  res.status(200).json(tasks);
})

//Update a list of tasks
router.put('/tasks', function(req, res, next){
  console.log("Updating Tasks: " + req.body.tasks);
  req.body.tasks.forEach(updateTask => {
    console.log("Updating Task: " + updateTask)
    tasks.forEach(function(task, i) {
      if(updateTask.id == task.id){
        tasks[i] = updateTask;
      }
    })//TODO: O(n^2) FTW.
  });
  res.status(200).json(tasks);
})

module.exports = router;