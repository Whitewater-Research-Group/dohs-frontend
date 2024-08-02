const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();
require('dotenv').config();


//Welcome Message for Developer

router.get('/', (req, res) => {
  res.send('Welcome to the User Management API! \n This API allows you to register and Login users with your front end Environment \n\n Thanks for Consuming');
});
 
// Register new user
router.post('/register', async (req, res) => {
  const { firstname, lastname, email, designation, license_number, password, location } = req.body;
  
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      designation,
      license_number,
      password: hashedPassword,
      location
    });

    

    res.status(201).json({Message: 'User created Successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health Worker login
router.post('/login/health-worker', async (req, res) => {
    const { license_number, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { license_number } });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { email: user.email, designation: user.designation },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Non-Health Worker login
  router.post('/login/non-health-worker', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { email: user.email, designation: user.designation },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
 
  

module.exports = router;
