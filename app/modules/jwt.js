const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicUrlA = process.env.ENVIROMENT === 'production' ? process.env.publicKeyA : 'C:/Users/user/Desktop/crud-backend-main/publicKeyA';
const privatUrlA = process.env.ENVIROMENT === 'production' ? process.env.privatKeyA : 'C:/Users/user/Desktop/crud-backend-main/privatKeyA';
const publicUrlR = process.env.ENVIROMENT === 'production' ? process.env.publicKeyR : 'C:/Users/user/Desktop/crud-backend-main/publicKeyR';
const privatUrlR = process.env.ENVIROMENT === 'production' ? process.env.privatKeyR : 'C:/Users/user/Desktop/crud-backend-main/privatKeyR';
exports.getKey = (url) => {
    return fs.readFileSync(url, 'utf8');   
}

const publickKeyAccess = this.getKey(publicUrlA);
const privatKeyAccess = this.getKey(privatUrlA);

const publickKeyRefresh = this.getKey(publicUrlR);
const privatKeyRefresh = this.getKey(privatUrlR);

exports.createAccessToken = async (id, email, userName, roleId) => {
    return jwt.sign(
        { 
            id,
            email,
            userName,
            roleId
        },
        privatKeyAccess,
        {   
            algorithm: 'RS256',
            expiresIn: '1h' ,
            issuer:  'skysoft-tech',
        },
      );
}

exports.createRefreshToken = async (id, email, userName, roleId) => {
    return jwt.sign(
        { 
            id,
            email,
            userName,
            roleId
        },
        privatKeyRefresh,
        {   
            algorithm: 'RS256',
            expiresIn: '30d' ,
            issuer:  'skysoft-tech',
        },
      );
}

exports.checkToken = (token, options) => {
    try {
        let signature = null;
        switch (options.type) {
            case 'access':
                signature = publickKeyAccess;
                break;
            case 'refresh':
                signature = publickKeyRefresh;
                break;
            default:
                break;
        }
        const decoded = jwt.verify(token, signature);
        console.log(decoded);
        return decoded;
    } catch (e) {
        return false;
    }
}
