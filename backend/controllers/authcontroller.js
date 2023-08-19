const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../model/User');
require('dotenv').config();


const saltRounds = 10;

router.post('/login', 
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      
      
      const user = await User.findOne({ email: email }).exec();
      
      if (!user) {
        return res.status(401).json({ message: 'Login Failed, Invalid Email' });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Login Failed, Invalid Password' });
      }

      const token = jwt.sign(
        { id: user._id, name: user.username },
        process.env.VotersecretKey,
        {
          algorithm: process.env.algorithm,
          expiresIn: '7d'
        }
      );
      res.status(200).json({
        message: 'Login Successful',
        jwtoken: token,
        data: user
      });
    } catch (err) {
        logger.error(`Error in / route: ${err.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);
router.post('/signup', 
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email').not().isEmpty().withMessage('Email is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').not().isEmpty().withMessage('Password is required'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Hash the password
      const hash = await bcrypt.hash(req.body.password, saltRounds);

      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const newUser = new User({
        username: req.body.name,
        role: req.body.userrole,
        email: req.body.email,
        password: hash
      });

      const savedUser = await newUser.save();

      const token = jwt.sign(
        { id: savedUser._id, name: savedUser.username },
        process.env.VotersecretKey,
        { algorithm: process.env.algorithm, expiresIn: '7d' }
      );

      return res.status(200).json({
        message: 'Registration Successful',
        jwtoken: token,
        data: savedUser
      });
    } catch (err) {
      logger.error(`Error in / route: ${err.message}`);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);
module.exports = router;
