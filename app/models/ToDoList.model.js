module.exports = (sequelize, Sequelize) => {
  const ToDoList = sequelize.define("ToDoList", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return ToDoList;
};
