const e = require("express");

exports.accessMiddleWare = async (req, res, next) => {
    try {
        if(req.roleId === 3 && req.method === 'GET') {
            next();
        } else if(req.roleId === 3){
            throw new Error('you does not have permision');
        } else if(req.roleId === 1 || req.roleId === 2){
            next();
        } else {
            throw new Error('you does not have permision');
        }
    } catch(e) {
        res.status(401).send({
            message: e.message || 'you need authorization'
        })
    }
}