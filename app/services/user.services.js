const db = require("../models");
const jwt = require('../modules/jwt');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = db.user;
const RefreshToken = db.refreshToken;

const refreshTokens = async (id, email, userName, roleId) => {
    const newAccessToken = await jwt.createAccessToken(id, email, userName, roleId);
    const newRefreshToken = await jwt.createRefreshToken(id, email, userName, roleId);
    
    const fieldToken = {
        refreshToken: newRefreshToken
    }
    await RefreshToken.update(fieldToken, {
        where: { userId: id }
    });
    return {
        sucess: true,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };   

}

exports.reg = async (req, res, next) => {
    try {
        const {email, password, userName} = req.body;
        const data = await User.findOne({
            attributes: ['email'],
            where: { email: email}
        });
        if(data) {
            const e = new Error('email already in use, maybe you need login');
            e.status = 400;
            throw e;
        }
        // bcrypt
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            try {
                if (err) {
                    throw new Error('Error in hash callback');
                }
                const field = {
                    userName: userName,
                    email: email,
                    password: hash,
                };
                const data = await User.create(field);
                const id = data.dataValues.id;
          
                const accessToken = await jwt.createAccessToken(id, email, userName, 3);
                const refreshToken = await jwt.createRefreshToken(id, email, userName, 3);

                const fieldToken = {
                    userId: id,
                    refreshToken: refreshToken
                }
                RefreshToken.create(fieldToken);
                res.send({
                    sucess: true,
                    accessToken,
                    refreshToken,
                });
            } catch (e) {
                next(e);
            }
        });
        
    } catch(e) {
        next(e);
    }
}  

exports.login = async (req, res, next) => {
    try {
        const data = await User.findOne({
            attributes: ['id', 'email', 'userName', 'password', 'roleId'],
            where: { email: req.body.email}
        });
        if (!data) {
            const e = new Error(`email ${req.body.email} does not exist`)
            e.status = 400;
            throw e; 
        }
        const hash = data.dataValues.password;
        const {id, email, userName, roleId} = data.dataValues;

        bcrypt.compare(req.body.password, hash, async function(err, result) {
            try {
                if(err) {
                    throw new Error('Error in hash callback on Login');
                }
                if(!result) {
                    const e = new Error('Password incorect');
                    e.status = 400;
                    throw e; 
                }
                const obj = await refreshTokens(id, email, userName, roleId);
                res.send(obj);   
            } catch(e) {
                next(e);
            }
        });

    } catch(e) {
        next(e);
    }
}
exports.refresh = async (req, res, next) => {
    try {
        const {refreshToken} = req.body;
        const parseToken = jwt.checkToken(refreshToken,  {type: "refresh"});
        if(!parseToken) {
            const e = new Error('Refresh token not valid');
            e.status = 400;
            throw e;
        }
        const {id, email, userName, roleId} = parseToken;
        const obj = await refreshTokens(id, email, userName, roleId);
        res.send(obj);   
    } catch(e) {
        next(e);
    }
}