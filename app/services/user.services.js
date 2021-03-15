const db = require("../models");
const jwt = require('../modules/jwt');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = db.user;

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
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            if(err) {
                throw new Error('Error in hash callback');
            }
            const field = {
                userName: userName,
                email: email,
                password: hash,
            };
            await User.create(field);
            let token = await jwt.createToken(email);
            res.send({
            sucess: true,
            token,
          });  
        });
        
    } catch(e) {
        res.status(400).send({
            message: e.message || "invalid registration"
        });
    }
}  

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const data = await User.findOne({
            attributes: ['id', 'email', 'password'],
            where: { email: email}
        });
        if (!data) {
            throw new Error(`email ${email} does not exist`)
        }
        const hash = data.dataValues.password;

        bcrypt.compare(password, hash, async function(err, result) {
            try {
                if(err) {
                    throw new Error('Error in hash callback on Login');
                }
                if(!result) {
                    throw new Error('Password incorect'); 
                }
                const token = await jwt.createToken(email);
                res.send({
                    sucess: true,
                    token,
                });   
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
