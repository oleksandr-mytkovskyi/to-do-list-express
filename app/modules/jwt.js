const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicUrl = 'C:/Users/user/Desktop/crud-backend-main/publickKey';
const privatUrl = 'C:/Users/user/Desktop/crud-backend-main/privatKey.ppk';
exports.getKey = (url) => {
    return fs.readFileSync(url, 'utf8');   
}

const publickKey = this.getKey(publicUrl);
const privatKey = this.getKey(privatUrl);

exports.createToken = async (email) => {
    return jwt.sign(
        { email },
        publickKey,
        {   
            algorithm: 'HS256',
            expiresIn: '1h'
        },
      );
}

exports.checkToken = (token) => {  
    try{
        const decoded = jwt.verify(token, publickKey);
        console.log(decoded);
        return true;
    } catch(e) {
        return false;
    }
}






