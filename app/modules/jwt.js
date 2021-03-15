const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.getSslKey = () => {
    const str = fs.readFileSync('C:/Users/user/Desktop/crud-backend-main/publickKey', 'utf8');
    ssl = str.substring(str.lastIndexOf('"') + 1, str.lastIndexOf('=') + 1);
    return ssl;  
}

const secret = this.getSslKey();

exports.createToken = async (email, expiresIn) => {
    return jwt.sign(
        { email },
        secret,
        { algorithm: 'HS256'},
        { expiresIn }
      );
}

exports.checkToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            throw new Error('Does not token, you need authorization')
        }
        console.log(token);
        jwt.verify(token, secret, function (err, decoded) {
            if(err) {
                throw new Error('Token doen not valid');
            }
            next();    
        });
    } catch(e) {
        res.status(401).send({
            messege: e.messege || 'you need authorization'
        })
    }
}






