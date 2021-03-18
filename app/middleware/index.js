const MW = {}
MW.jwt = require('./jwt.middleware');
MW.access = require('./access.middleware');

module.exports = MW;
