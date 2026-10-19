import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || 'secret');
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (e) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  }
  req.user = null;
  next();
};
