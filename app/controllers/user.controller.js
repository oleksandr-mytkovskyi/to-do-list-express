const userServices = require("../services/user.services");
const regexpUpperCase = /[A-Z]/g;
const regexpLowerCase = /[a-z]/g;
const regexpNumber = /[0-9]/g;

exports.reg = async (req, res) => {
  const {email, password, userName} = req.body;
  res.set('Access-Control-Allow-Origin', '*');
  try {
    // чи треба додаткову валідацію на емейл ?
    if(!email) {
      throw new Error('email is empty');
    }
    if(!userName) {
      throw new Error('userName is empty');
    }
    //валідація пароля
    if(password.length < 8) {
      throw new Error('password length < 8 symbols');
    }
    if(!password.match(regexpUpperCase)) {
      throw new Error('password does not contain a uppercase letter');
    }
    if(!password.match(regexpLowerCase)) {
      throw new Error('password does not contain a lowercase letter');
    }
    if(!password.match(regexpNumber)) {
      throw new Error('password does not contain a number');
    }
    
    userServices.reg(req, res);

  } catch(e) {
    res.status(400).send({
      message: e.message || 'some error'
    });
  }
}

exports.login = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Invalid login or password"
    });
    return;
  }
  userServices.login(req, res);
};


