const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Authorization section
const login = require('./controllers/auth.controllers').login;
const verifyToken = require('./middelwares/authJwt').verifyToken;
// Route segregation by module
const userRoutes = require('./routes/user');

app.use(bodyParser.json());
// Modules
app.post('/api/login', login);
app.use('/api/users', userRoutes);

// Server startup
app.listen(3000, () => {
    console.log('Server started on port 3000');
});