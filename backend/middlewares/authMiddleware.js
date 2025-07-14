// // backend/middlewares/authMiddlewares.js
// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// import User from '../models/User.js';



//   // if (
//   //   req.headers.authorization &&
//   //   req.headers.authorization.startsWith('Bearer')
//   // ) {
//   //   try {
//   //     token = req.headers.authorization.split(' ')[1];
//   //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   //     req.user = await User.findById(decoded.id).select('-otp');
//   //     next();
//   //   } catch (error) {
//   //     console.error(error);
//   //     res.status(401);
//   //     throw new Error('Not authorized, token failed');
//   //   }
//   // }


//   const protect = asyncHandler(async (req, res, next) => {

//     const token = req.header('Authorization');
//     console.log(token);
//     if (!token) {
//       return res.status(401).json({ message: 'Not authorized, no token' });
//     }
 
//     const bearer = token.split(' ');
//     const bearerToken = bearer[1];
//     try {
//       const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
//       req.user = decoded;
//       console.log(decoded);
//       next();
//     } catch (err) {
//       console.error(err);
//       return err.Response(401, 400020., 'Access denied. Invalid Token', res);
//     }
 
//   if (!token) {
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }
// });

// export { protect };

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const bearer = token.split(' ');
  const bearerToken = bearer[1];

  try {
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to `req.user`
    console.log(decoded);
    next(); // Call the next middleware
  } catch (err) {
    console.error(err);
    // Respond with an error message
    return res.status(401).json({ 
      message: 'Access denied. Invalid token',
      error: err.message // Optional: Include the error message for debugging
    });
  }
});

export { protect };










 