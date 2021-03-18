const listServices = require("../services/list.services");

// Create and Save a new List
exports.add = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  listServices.add(req, res, next);
};

// Retrieve all Lists from the database.
exports.get = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  const query = req.query;
  listServices.get(req, res, next, query);
};

exports.getById = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.params.id;
  listServices.getById(req, res, next, id);
};

// Update a List by the id in the request
exports.update = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.params.id;
  if(!id) {
    res.send({
      message: "Not found id for updata "
    });
    return;
  }
  listServices.updata(req, res, next, id); 
};

// Delete a List with the specified id in the request
exports.delete = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.params.id;
  if(!id) {
    res.send({
      message: "Not found id for delete "
    });
    return;
  }
  listServices.delete(req, res, next, id);
};

exports.addToTrash = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.params.id;
  if(!id) {
    res.send({
      message: "Not found id for delete "
    });
    return;
  }
  listServices.addToTrash(req, res, next, id);
};

exports.removeToTrash = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.params.id;
  if(!id) {
    res.send({
      message: "Not found id for delete"
    });
    return;
  }
  listServices.removeToTrash(req, res, next, id);
};


