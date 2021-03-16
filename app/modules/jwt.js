const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicUrl = 'C:/Users/user/Desktop/crud-backend-main/publicKey';
const privatUrl = 'C:/Users/user/Desktop/crud-backend-main/privatKey';
exports.getKey = (url) => {
    return fs.readFileSync(url, 'utf8');   
}

const publickKey = this.getKey(publicUrl);
const privatKey = this.getKey(privatUrl);

exports.createAccessToken = async (id, email, userName) => {
    return jwt.sign(
        { 
            id,
            email,
            userName,
        },
        privatKey,
        {   
            algorithm: 'RS256',
            expiresIn: '1h' ,
            issuer:  'skysoft-tech',
        },
      );
}

exports.createRefreshToken = async (id, email, userName) => {
    return jwt.sign(
        { 
            id,
            email,
            userName,
        },
        privatKey,
        {   
            algorithm: 'RS256',
            expiresIn: '30d' ,
            issuer:  'skysoft-tech',
        },
      );
}

exports.checkToken = (token) => {  
    try{
        const decoded = jwt.verify(token, publickKey);
        console.log(decoded);
        return decoded;
    } catch(e) {
        return false;
    }
}
