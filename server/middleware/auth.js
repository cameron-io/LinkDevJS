const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const cookies = req.headers.cookie;
  const token_cookie = cookies.split('; ').filter((e) => e.match('access_token=') != null);

  // Check if no token
  if (token_cookie.length == 0) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  const token = token_cookie[0].split('access_token=')[1];

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token.' });
  }
};
