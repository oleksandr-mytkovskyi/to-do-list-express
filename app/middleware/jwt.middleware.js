const jwt = require('../modules/jwt');

exports.jwtMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            throw new Error('Does not token, you need authorization')
        }
        const checkToken =  jwt.checkToken(token, {type: "access"});
        if(!checkToken) {
            throw new Error('Token not valid');
        }
        next();
    } catch(e) {
        res.status(401).send({
            messege: e.messege || 'you need authorization'
        })
    }
}