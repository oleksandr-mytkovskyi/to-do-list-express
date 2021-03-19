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

exports.createToken = async (id, email, userName, roleId, options) => {
    let signature = null;
    let expiresIn = null;
    switch (options.type) {
        case 'access':
            signature = privatKeyAccess;
            expiresIn = '1h';
            break;
        case 'refresh':
            signature = privatKeyRefresh;
            expiresIn = '30d';
            break;
        default:
            break;
    }
    return jwt.sign(
        { 
            id,
            email,
            userName,
            roleId
        },
        signature,
        {   
            algorithm: 'RS256',
            expiresIn: expiresIn ,
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
