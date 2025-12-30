// const Appointment =require("../models/Appointment");
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth_middleware = async (req, res, next) => {
  try {
    // read token from cookie or header
    const token = req.cookies.authorization?.replace('Bearer ', '') || req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");

    // attach user id and role info to request
    req.userId = decoded.id;
    req.userRole = decoded.role;
    req.is_admin = decoded.is_admin || false;
    next();
  } catch (err) {
    console.error('JWT Error:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = auth_middleware;
