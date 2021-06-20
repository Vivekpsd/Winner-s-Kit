const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

//@route  GET api/auth
//@Desc   Test Route
//@Access Public

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Auth-Token, Content-Type, Accept'
  );
  next();
});

router.get('/', auth, async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST api/auth
//@Desc   Authenticate user and get token
//@Access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password in required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //Check if User exist
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //Return JsonWebToken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status('500').send('Server Error');
    }
  }
);

module.exports = router;
