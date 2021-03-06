const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user')
const moment = require('moment');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/register', async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const result = await User.createUser(req.body);

  if (result['affectedRows'] === 1) {
    res.json({
      success: 'Usuario registrado'
    })
  } else {
    res.json({
      error: 'Campos incorrectos'
    })
  }
});

// POST User login // http://localhost:3000/users/login
router.post('/login', async (req, res) => {
  try {
    const usuario = await User.getByEmail(req.body.email);
    if (usuario) {
      const verifyPass = bcrypt.compareSync(req.body.password, usuario.password);
      if (verifyPass) {
        res.json({
          success: "Login done!",
          token: createToken(result.id)
        })
      } else {
        res.json({
          error: 'The user is not register or pass/email is not correct'
        })
      }
    } else {
      res.json({
        error: 'The user is not register or pass/email is not correct'
      })
    }
  } catch (err) {
    res.json({ err: err.message })
  }
})

//JWT// Creacion del token para el usuario

function createToken(pUserID) {
  const payload = {
    userID: pUserID,
    createDATE: moment().unix(),
    expireDATE: moment().add(15, 'minutes').unix()
  }
  return jwt.sign(payload, process.env.SECRET_KEY)
}
module.exports = router;