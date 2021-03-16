const db = require("../models");
const jwt = require('../modules/jwt');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = db.user;
const RefreshToken = db.refreshToken;

const refreshTokens = async (id, email, userName) => {
    const newAccessToken = await jwt.createAccessToken(id, email, userName);
    const newRefreshToken = await jwt.createRefreshToken(id, email, userName);
    
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

exports.reg = async (req, res) => {
    try {
        const {email, password, userName} = req.body;
        const data = await User.findOne({
            attributes: ['email'],
            where: { email: email}
        });
        if(data) {
            throw new Error('email already in use, maybe you need login');
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
          
                const accessToken = await jwt.createAccessToken(id, email, userName);
                const refreshToken = await jwt.createRefreshToken(id, email, userName);

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
                res.status(400).send({
                    message: e.message
                })
            }
        });
        
    } catch(e) {
        res.status(400).send({
            message: e.message || "invalid registration"
        });
    }
}  

exports.login = async (req, res) => {
    try {
        const data = await User.findOne({
            attributes: ['id', 'email', 'userName', 'password'],
            where: { email: req.body.email}
        });
        if (!data) {
            throw new Error(`email ${req.body.email} does not exist`)
        }
        const hash = data.dataValues.password;
        const {id, email, userName} = data.dataValues;

        bcrypt.compare(req.body.password, hash, async function(err, result) {
            try {
                if(err) {
                    throw new Error('Error in hash callback on Login');
                }
                if(!result) {
                    throw new Error('Password incorect'); 
                }
                const obj = await refreshTokens(id, email, userName);
                res.send(obj);   
            } catch(e) {
                res.status(500).send({
                    message: e.message
                });
            }
        });

    } catch(e) {
        res.status(500).send({
            message: e.message || 'invalid login'
        });
    }
}
exports.refresh = async (req, res) => {
    try {
        const {refreshToken} = req.body;
        const parseToken = jwt.checkToken(refreshToken,  {type: "refresh"});
        if(!parseToken) {
            throw new Error('Refresh token not valid');
        }
        const {id, email, userName} = parseToken;
        const obj = await refreshTokens(id, email, userName);
        res.send(obj);   


    } catch(e) {
        res.status(400).send({
            message: e.message
        })
    }

}
