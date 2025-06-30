const express = require('express');
const { add, get } = require('../data/user');
const { createJSONToken, isValidPassword } = require('../util/auth.js');
const { isValidEmail, isValidText } = require('../util/validation.js');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  const errors = {};
  if (!isValidEmail(email)) errors.email = 'Invalid email';
  if (!isValidText(password, 6)) errors.password = 'Password too short';

  try {
    await get(email);
    errors.email = 'Email already exists';
  } catch (_) {}

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ message: 'Validation failed', errors });
  }

  const createdUser = await add({ email, password, name });
  const token = createJSONToken(email);
  res.status(201).json({ user: createdUser, token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await get(email);
    const valid = await isValidPassword(password, user.password);
    
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createJSONToken(email);

    res.json({
      token,
      userId: user._id,
      name: user.name,  
      email: user.email 
    });

  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
});


module.exports = router;
