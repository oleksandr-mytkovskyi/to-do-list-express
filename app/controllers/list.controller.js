const listServices = require("../services/list.services");

// Create and Save a new List
exports.add = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  listServices.add(req, res);
};

// Retrieve all Lists from the database.
exports.get = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  listServices.get(req, res);
};

exports.getById = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const id = req.params.id;
  const condition = id ? {id : +id} : null ;
  listServices.getById(req, res, id);
};

// Update a List by the id in the request
exports.update = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const id = req.params.id;
  if(!id) {
    res.send({
      message: "Not found id for updata "
    });
    return;
  }
  listServices.updata(req, res, id); 
};

// Delete a List with the specified id in the request
exports.delete = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const id = req.params.id;
  if(!id) {
    res.send({
      message: "Not found id for delete "
    });
    return;
  }
  listServices.delete(req, res, id);
};

exports.addToTrash = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const id = req.params.id;
  if(!id) {
    res.send({
      message: "Not found id for delete "
    });
    return;
  }
  listServices.addToTrash(req, res, id);
};

exports.removeToTrash = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const id = req.params.id;
  if(!id) {
    res.send({
      message: "Not found id for delete "
    });
    return;
  }
  listServices.removeToTrash(req, res, id);
};


