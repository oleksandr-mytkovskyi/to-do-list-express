const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicUrlA = 'C:/Users/user/Desktop/crud-backend-main/publicKeyA';
const privatUrlA = 'C:/Users/user/Desktop/crud-backend-main/privatKeyA';
const publicUrlR = 'C:/Users/user/Desktop/crud-backend-main/publicKeyR';
const privatUrlR = 'C:/Users/user/Desktop/crud-backend-main/privatKeyR';
exports.getKey = (url) => {
    return fs.readFileSync(url, 'utf8');   
}

const publickKeyAccess = process.env.ENVIROMENT === 'production' ? process.env.publicKeyA : this.getKey(publicUrlA);
const privatKeyAccess = process.env.ENVIROMENT === 'production' ? process.env.privatKeyA : this.getKey(privatUrlA);

const publickKeyRefresh = process.env.ENVIROMENT === 'production' ? process.env.publicKeyR : this.getKey(publicUrlR);
const privatKeyRefresh = process.env.ENVIROMENT === 'production' ? process.env.privatKeyR : this.getKey(privatUrlR);

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
        return decoded;
    } catch (e) {
        return false;
    }
}
