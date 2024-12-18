const jwt = require('jsonwebtoken');
const { errorHandler } = require('./error.js');

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1]; // Handle Bearer tokens

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user;
    next();
  });
};
