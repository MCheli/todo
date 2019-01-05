var express = require('express');
var router = express.Router();

var tasks = []; //TODO: Replace with persistent storage

//Create a new task
router.post('/task', function(req, res, next) {
  console.log("New Task Added: " + req.body)
  var newTask = req.body;
  newTask.id = tasks.length + 1;
  newTask.order = tasks.length + 1;
  tasks.push(newTask); //TODO: Replace with persistent storage
  res.status(200).json(tasks);
})

//Retrieve a list of all tasks
router.get('/tasks', function(req, res, next){
  console.log("All Tasks: " + JSON.stringify(tasks));
  res.status(200).json(tasks);
})

//Update a list of tasks
router.put('/tasks', function(req, res, next){
  console.log("Updating Tasks: " + JSON.stringify(req.body.tasks));
  req.body.tasks.forEach(updateTask => {
    console.log("Updating Task: " + JSON.stringify(updateTask))
    tasks.forEach(function(task, i) {
      if(updateTask.id == task.id){
        tasks[i] = updateTask;
      }
    })//TODO: O(n^2) FTW.
  });
  res.status(200).json(tasks);
})

//Retrieve individual task
router.get('/task/:id', function(req, res, next){
  var id = req.params.id;
  console.log("Task Requested: " + id);
  res.status(200).json(tasks.find(task => task.id == id));
})

//Update individual task
//TODO: Update task while preserving text and order if not supplied
router.put('/task/:id', function(req, res, next){
  var id = req.params.id;
  var updateTask = req.body;
  console.log("Updating Task: " + JSON.stringify(updateTask))
  tasks.forEach(function(task, i) {
    if(updateTask.id == task.id){
      tasks[i] = updateTask;
    }
  })//TODO: O(n^2) FTW.
  res.status(200).json(updateTask);
})

//Delete individual task
router.delete('/task/:id', function(req, res, next){
  var id = req.params.id;
  var filtered = tasks.filter(function(value, index, arr){
    if(value.id == id) { console.log("Deleting Task: " + JSON.stringify(value))}
    return value.id != id;
  });
  tasks = filtered;
  res.status(200).json(tasks);
})

module.exports = router;