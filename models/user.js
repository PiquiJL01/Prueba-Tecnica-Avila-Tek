const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/PruebaTecnica', { serverSelectionTimeoutMS: 30000 });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;