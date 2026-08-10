const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const header = req.get('Authorization');
  if (!header) return res.status(401).json({ message: 'Authorization header is required' });

  const match = header.match(/^Bearer\s+(\S+)$/i);
  if (!match) return res.status(401).json({ message: 'A valid Bearer token is required' });
  if (!process.env.JWT_SECRET) return res.status(500).json({ message: 'Authentication is not configured' });

  try {
    req.auth = jwt.verify(match[1], process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({
      message: error.name === 'TokenExpiredError' ? 'Token has expired' : 'Invalid token'
    });
  }
};

module.exports = { authenticateJWT };
