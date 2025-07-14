// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';

// const ProtectedRoute = ({ children }) => {
//   const { mobileNumber } = AppContext();

//   if (!mobileNumber) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

// export default ProtectedRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { mobileNumber } = useContext(Context);

  if (!mobileNumber) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
