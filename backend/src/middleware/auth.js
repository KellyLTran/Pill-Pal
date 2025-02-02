import jwt, { decode } from 'jsonwebtoken'
import User from '../models/user.model';

// use this for protected routes
const protectedRoute = (req, res, next) => {

  const token = req.cookies.jwt;

  if (!token) return res.status(401).json({message: 'No token, authorization denied.'});

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = User.findById(decoded.userId).select("-password")
    if (!user) return res.status(404).json({message: "User not found"});
    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({message:"Token invalid"});
  }
}