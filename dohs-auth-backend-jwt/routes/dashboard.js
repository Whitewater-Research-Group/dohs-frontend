const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Protected dashboard route
router.get('/dashboard', auth, (req, res) => {
  res.json({ msg: `Welcome to the dashboard, ${req.user.email}. Your designation is ${req.user.designation}.` });
});

module.exports = router;
