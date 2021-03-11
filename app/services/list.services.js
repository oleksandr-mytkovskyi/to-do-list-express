const db = require("../models");
const List = db.list;
// const Op = db.Sequelize.Op;
let timerDelete = null;

exports.add = (req, res) => {
  // Create a List
  const list = {
    name: req.body.name,
    status: req.body.status,
    isDeleted: req.body.isDeleted,
    deteteData: req.body.deteteData,
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

exports.get = (req, res, query) => {
    const {limit, offset} = query;
    List.findAll({
        attributes: ['id', 'name', 'status', 'updatedAt', 'createdAt' ],
        where: {isDeleted: false},
        limit: limit,
        offset: offset,
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

exports.getById = (req, res, id) => {
    List.findAll({
        attributes: ['id', 'name', 'status', 'updatedAt', 'createdAt' ],
        where: {id: id, isDeleted: false}
    })
    .then(data => {
      res.send(data[0]);
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

exports.addToTrash = (req, res, id) => {
    const data = {
        isDeleted: true,
        deleteData: new Date().toISOString(),
    };
    List.update(data, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "List was deleted successfully!",
                    id: id
                });
                timerDelete = setTimeout(() => {
                    this.delete(req, res, id);
                }, 60000);
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

exports.removeToTrash = (req, res, id) => {
    clearTimeout(timerDelete);
    const data = {
        isDeleted: false,
        deleteData: null,
    };
    List.update(data, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "List was recovery successfully!",
                    id: id
                });
            } else {
                res.send({
                    message: `Cannot recovery List with id=${id}. Maybe List was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not recovery List with id=" + id
            });
        });
}

