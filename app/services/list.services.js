const db = require("../models");
const List = db.list;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
  // Create a List
  const list = {
    name: req.body.name,
    status: req.body.status,
    create_data: req.body.create_data,
    updata_data: req.body.updata_data,
  };

  // Save List in the database
    List.create(list)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the List."
            });
        });
}

exports.get = (req, res) => {
    List.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Lists."
      });
    });
}

exports.getById = (req, res, id) => {
    List.findAll({
        where: {id: id}
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Lists."
      });
    });
}

exports.updata = (req, res, id) => {
    List.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "List was updated successfully.",
                    id: id
                });
            } else {
                res.send({
                    message: `Cannot update List with id=${id}. Maybe List was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating List with id=" + id
            });
        });
}

exports.delete = (req, res, id) => {
    List.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "List was deleted successfully!",
                    id: id
                });
            } else {
                res.send({
                    message: `Cannot delete List with id=${id}. Maybe List was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete List with id=" + id
            });
        });
}

