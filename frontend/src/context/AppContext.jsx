

// import React, { createContext, useContext, useState, useEffect } from "react";

// const Context = createContext({});
// export default Context;

// export function AppContext({ children }) {
//   const [flag, setFlag] = useState(false);
//   const [serviceFlowControl, setServiceFlowControl] = useState(undefined);
//   const [standaloneService, setStandaloneServies] = useState(false);
//   const [urgentStep, setUrgentStep] = useState(1);
//   const [nonUrgentStep, setNonUrgentStep] = useState(1);
//   const [standaloneStep, setStandaloneStepStep] = useState(1);
//   const [profileCompleted, setProfileCompleted] = useState(true);

//   const [isAvailable, setIsAvailable] = useState("Urgent");
//   const [mobileNumber, setMobileNumber] = useState(() => {
//     return localStorage.getItem('mobileNumber') || '';
//   });
//   useEffect(() => {
//     localStorage.setItem('mobileNumber', mobileNumber);
//   }, [mobileNumber]);

//   return (
//     <Context.Provider value={
//       {
//         flag, setFlag,
//         serviceFlowControl, setServiceFlowControl,
//         standaloneService, setStandaloneServies,
//         urgentStep, setUrgentStep,
//         nonUrgentStep, setNonUrgentStep,
//         standaloneStep, setStandaloneStepStep,
//         profileCompleted, setProfileCompleted,
//         isAvailable, setIsAvailable,
//         mobileNumber, setMobileNumber
//       }
//     }>
//       {children}
//     </Context.Provider>
//   );
// }




import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext({});
export default Context;

export function AppContext({ children }) {
  const [flag, setFlag] = useState(false);
  const [serviceFlowControl, setServiceFlowControl] = useState(undefined);
  const [standaloneService, setStandaloneServies] = useState(false);
  const [urgentStep, setUrgentStep] = useState(1);
  const [nonUrgentStep, setNonUrgentStep] = useState(1);
  const [standaloneStep, setStandaloneStepStep] = useState(1);
  const [profileCompleted, setProfileCompleted] = useState(true);
  const [isAvailable, setIsAvailable] = useState("Urgent");
  
  const [mobileNumber, setMobileNumber] = useState(() => {
    return localStorage.getItem('mobileNumber') || '';
  });

  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('userId') || '';
  });

  useEffect(() => {
    localStorage.setItem('mobileNumber', mobileNumber);
  }, [mobileNumber]);

  useEffect(() => {
    localStorage.setItem('userId', userId);
  }, [userId]);

  // Function to generate and set user ID after booking
  const generateUserId = () => {
    const newUserId = 'user-' + Math.random().toString(36).substring(2, 15);
    setUserId(newUserId);
    return newUserId;
  };

  return (
    <Context.Provider value={
      {
        flag, setFlag,
        serviceFlowControl, setServiceFlowControl,
        standaloneService, setStandaloneServies,
        urgentStep, setUrgentStep,
        nonUrgentStep, setNonUrgentStep,
        standaloneStep, setStandaloneStepStep,
        profileCompleted, setProfileCompleted,
        isAvailable, setIsAvailable,
        mobileNumber, setMobileNumber,
        userId, setUserId,
        generateUserId
      }
    }>
      {children}
    </Context.Provider>
  );
}
