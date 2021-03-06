var express = require('express');
var router = express.Router();

var priorities = []; //TODO: Replace with persistent storage

//Create a new task
router.post('/priority', function(req, res, next) {
  console.log("New priority Added: " + req.body)
  var newPriority = req.body;
  newPriority.id = priorities.length + 1;
  newPriority.order = priorities.length + 1;
  priorities.push(newPriority); //TODO: Replace with persistent storage
  res.status(200).json(priorities);
})

//Retrieve a list of all tasks
router.get('/priorities', function(req, res, next){
  console.log("All priorities: " + JSON.stringify(priorities));
  priorities.sort(sortByOrder);
  res.status(200).json(priorities);
})

//Update a list of tasks
router.put('/priorities', function(req, res, next){
  console.log("Updating priorities: " + JSON.stringify(req.body.priorities));
  req.body.tasks.forEach(updateTask => {
    console.log("Updating Task: " + JSON.stringify(updateTask))
    tasks.forEach(function(task, i) {
      if(updateTask.id == task.id){
        tasks[i] = updateTask;
      }
    })//TODO: O(n^2) FTW.
  });
  tasks.sort(sortByOrder);
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
  res.status(200).json(tasks);
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

var sortByOrder = function(a,b) {
  return a.order - b.order;
}

module.exports = router;