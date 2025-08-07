const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: String,
  jobTitle: String
});

module.exports = mongoose.model('User', userSchema);
