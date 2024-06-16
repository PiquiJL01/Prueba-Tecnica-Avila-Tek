const db = require('./db')

const userSchema = new db.mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingrese una direcciuon de correo valida'] },
  password: { type: String, required: true },
  // roles: [{ type: db.mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }]
})

const User = db.mongoose.model('User', userSchema)

module.exports = User