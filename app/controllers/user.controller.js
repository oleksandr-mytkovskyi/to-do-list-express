const userServices = require('../services/user.services');

exports.reg = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  userServices.reg(req, res, next);
}

exports.login = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  userServices.login(req, res, next);
};

exports.refresh = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  // Validate request
  if (!req.body.refreshToken) {
    res.status(400).send({
      message: 'refreshToken not found'
    });
    return;
  }
  userServices.refresh(req, res, next);
};
