//Create a db connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lister');

//Create a todoList schema
var todoList = mongoose.model('todolist', { text: String, done: Boolean });

module.exports = {

  //Lists all todo lists
  list: function(){
    return function(req, res){
      //Find all todo lists and return them
      todoList.find(function(err, list){
        if(err) console.log(err);
        res.send(list);
      });
    }
  },

  //Add a new list
  add: function(){
    return function(req, res){
      //Get the values from query
      var text = req.query.text;
      var done = req.query.done;

      //Validate the queries and proceed
      if(text === '' || done === '' || text == undefined || done == undefined){
        res.send("Invalid Parameters");
      }else{
        //If values are valid, create a new task on the db
        var newTask = new todoList({text: text,done: done});
        newTask.save(function(err){
          if(err) console.log(err);
          res.send(200);
        });
      }

    }
  },

  //Updates the current model
  update: function(){
    return function(req, res){
      var done = req.query.done;
      var id = req.param('id');

      if(done === '' || done == undefined || !(done === 'true' || done === 'false')){
        res.send("Invalid Parameters");
      }else{
          todoList.update({_id: id}, {done: done}, function(err, numeffected, raw){
            if(err){
              console.log(err);
              res.send("Could Not Update");
            }else{
              res.send(200);
            }
          });
      }
    }
  },

  //Removes the todo list
  remove: function(){
    return function(req, res){
      var id = req.param('id');

      todoList.remove({_id: id}, function(err){
        if(err) res.send('Could Not Remove!');
        res.send(200);
      });
    }
  }
}
