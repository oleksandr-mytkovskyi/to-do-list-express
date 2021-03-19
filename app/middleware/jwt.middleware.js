const jwt = require('../modules/jwt');

const jwtMiddleWare = async (req, res, next) => {
    try {
        const authData = req.headers.authorization;
        if(!authData) {
            throw new Error('Does not token, you need authorization')
        }
        const token = authData.split(' ')[1];
        const parseToken =  jwt.checkToken(token, {type: 'access'});
        if(!parseToken) {
            throw new Error('Token not valid');
        }
        req.roleId = parseToken.roleId;
        next();
    } catch(e) {
        res.status(401).send({
            message: e.message || 'you need authorization'
        })
    }
}
module.exports = jwtMiddleWare;