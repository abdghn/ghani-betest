const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';

const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, secret, { expiresIn: '1h' });
};

module.exports = generateToken;
