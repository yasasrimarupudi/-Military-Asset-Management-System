module.exports = function (allowedRoles) {
  // Normalize allowedRoles to lowercase once
  const normalizedRoles = allowedRoles.map(role => role.toLowerCase());

  return function (req, res, next) {
    const userRole = req.user?.role?.toLowerCase();

    if (!userRole) {
      return res.status(401).json({ message: 'Unauthorized: No role found' });
    }

    if (normalizedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Insufficient role privileges' });
    }
  };
};
