const { hash } = require('bcryptjs');
const User = require('../models/Users.js');

async function add(data) {
  const hashedPw = await hash(data.password, 12);
  const user = new User({
    name: data.name,
    email: data.email,
    password: hashedPw,
  });
  await user.save();
  return { id: user._id, email: user.email };
}

async function get(email) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  return user;
}

exports.add = add;
exports.get = get;
