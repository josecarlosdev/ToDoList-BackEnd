module.exports = app => {
  const todoslist = require("../controllers/ToDoList.controller.js");

  var router = require("express").Router();

  // Create a new ToDo-List
  router.post("/", todoslist.create);

  // Retrieve all ToDo-List
  router.get("/", todoslist.findAll);

  // Retrieve all published ToDo-List
  router.get("/published", todoslist.findAllPublished);

  // Retrieve a single ToDo-List with id
  router.get("/:id", todoslist.findOne);

  // Update a ToDo-List with id
  router.put("/:id", todoslist.update);

  // Delete a ToDo-List with id
  router.delete("/:id", todoslist.delete);

  // Delete all ToDo-List
  router.delete("/", todoslist.deleteAll);

  app.use('/api/todolist', router);
};
