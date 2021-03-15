const db = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = db.user;

async function createToken(email, expiresIn) {
    return jwt.sign(
        { email: email },
        'my first jwt token',
        { algorithm: 'HS256'},
        { expiresIn: expiresIn }
      );
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
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            if(err) {
                throw new Error('Error in hash callback');
            }
            const field = {
                userName: userName,
                email: email,
                password: hash,
            };
            const data = await User.create(field);
            // треба перевірка на те, що в базу все ок записалось?
            let token = await createToken(email, '1h');
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
                const token = await createToken(email, '1h');
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


// exports.add = async (req, res) => {
//     // Create a List
//     const list = {
//         name: req.body.name,
//         status: req.body.status,
//         isDeleted: req.body.isDeleted,
//         deteteData: req.body.deteteData,
//     };
//     try {
//         const data = await List.create(list);
//         res.send(data);
//     } catch (e) {
//         res.status(500).send({
//             message: e.message || "Some error occurred while creating the List."
//         });
//     }
// }

// exports.get = async (req, res, query) => {
//     try {
//         const { limit, offset } = query;
//         const data = await List.findAll({
//             attributes: ['id', 'name', 'status', 'updatedAt', 'createdAt'],
//             where: { isDeleted: false },
//             order: [
//                 ['id', 'ASC'],
//             ],
//             limit: limit || 10,
//             offset: offset,
//         });
//         res.send(data);
//     } catch (e) {
//         res.status(500).send({
//             message: e.message || "Some error occurred while retrieving Lists."
//           });
//     }
// }

// exports.getById = async (req, res, id) => {
//     try {
//         const data = await List.findAll({
//             attributes: ['id', 'name', 'status', 'updatedAt', 'createdAt'],
//             where: { id: id, isDeleted: false }
//         });
//         if (!data[0]) {
//             throw new Error(`Not found list with ${id}`);
//         } 
//         res.send(data[0]);
//     } catch (e) {
//         res.status(500).send({
//             message: e.message || "Some error occurred while retrieving Lists."
//           });
//     }
// }

// exports.updata = async (req, res, id) => {
//     try {
//         const data = await List.update(req.body, {
//             where: { id: id }
//         });
//         if (data != 1) {
//             res.status(500).send({
//                 message: `Cannot update List with id=${id}. Maybe List was not found or req.body is empty!`
//             });
//             return;
//         }
//         res.send({
//             message: "List was updated successfully.",
//             id: id
//         })
//     } catch (e) {
//         res.status(500).send({
//             message: e.message || "Error updating List with id=" + id
//         });
//     }
// }

// exports.delete = async (req, res, id) => {
//     try {
//         const data = await List.destroy({
//             where: { id: id }
//         });
//         if (data != 1) {
//             throw new Error(`Cannot delete List with id=${id}. Maybe List was not found!`);
//         }
//         // потрібно записувати десь в логи сервера цю операцію
//         console.log(`List with ${id} was deleted successfully!`);
//     } catch (e) {
//         console.log(e.message || `Could not delete List with id=${id}`);
//     }
// }
