const db = require("../models");
const ToDoList = db.todolist;
const Op = db.Sequelize.Op;

// Create and Save a new ToDoList
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a ToDoList
  const todoslist = {
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save ToDoList in the database
  ToDoList.create(todoslist)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ToDoList."
      });
    });
};

// Retrieve all ToDoList from the database.

exports.findAll = (req, res) => {
  const published = req.query.published;
  var condition = published ? { published: `${published}`} : null;

  ToDoList.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ToDoList."
      });
    });
};

// Find a single ToDoList with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ToDoList.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving ToDoList with id=" + id
      });
    });
};

// Update a ToDoList by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ToDoList.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ToDoList was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ToDoList with id=${id}. Maybe ToDoList was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ToDoList with id=" + id
      });
    });
};

// Delete a ToDo with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ToDoList.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ToDoList was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ToDoList with id=${id}. Maybe ToDoList was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ToDoList with id=" + id
      });
    });
};

// Delete all ToDoList from the database.
exports.deleteAll = (req, res) => {
  ToDoList.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} ToDoList were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all ToDoList."
      });
    });
};

// find all published ToDoList
exports.findAllPublished = (req, res) => {
  ToDoList.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ToDoList."
      });
    });
};
