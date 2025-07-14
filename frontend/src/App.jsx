import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Root from "./pages/Root";
import LoginStep1 from "./components/LoginStep1";
import SignupStep1 from "./components/SignupStep1";
import Verify from "./components/Verify";
import Successful1 from "./components/Successful1";
// import Successful2 from "./components/Successful2";
import Home from "./pages/Home";
import Services from "./pages/Services";
import LoginSignUp from "./pages/LoginSignup";
import SignupProfileSetup from "./pages/SignupProfileSetup";
import ProfileSetupSS1 from "./components/ProfileSetupSS1";
import ProfileSetupSS2 from "./components/ProfileSetupSS2";
import ProfileSetupSS3 from "./components/ProfileSetupSS3";
import MyBookings from "./pages/MyBookings";
import MyBookingsUCDetails from "./pages/MyBookingsUCDetails";
import MyBookingsUCCompletedDetails from "./pages/MyBookingsUCCompletedDetails";
import MyBookingsUCCancelled from "./pages/MyBookingsUCCancelled";
import User from "./pages/User";
import Notifications from "./components/Notifications";
import MyProfile from "./components/MyProfile";
import MyBookingsNUCCompletedDetails from "./pages/MyBookingsNUCCompletedDetails";
import MyBookingsNUCCancelled from "./pages/MyBookingsNUCCancelled";
import MyBookingsNUCDetails from "./pages/MyBookingsNUCDetails";  

import MyBookingsSCVDetails from "./pages/MyBookingsSCVDetails";
import MyBookingsSCHDetails from "./pages/MyBookingsSCHDetails";
import MyBookingsSCMDetails from "./pages/MyBookingsSCMDetails";
import MyBookingsSCNDetails from "./pages/MyBookingsSCNDetails";
import MyBookingsSCLDetails from "./pages/MyBookingsSCLDetails";

import MyBookingsSCCompletedVDetails from "./pages/MyBookingsSCCompletedVDetails";
import MyBookingsSCCompletedHDetails from "./pages/MyBookingsSCCompletedHDetails";
import MyBookingsSCCompletedMDetails from "./pages/MyBookingsSCCompletedMDetails";
import MyBookingsSCCompletedNDetails from "./pages/MyBookingsSCCompletedNDetails";
import MyBookingsSCCompletedLDetails from "./pages/MyBookingsSCCompletedLDetails";
import MyBookingsSCCancelled from "./pages/MyBookingsSCCancelled";
import EditProfile from "./components/EditProfile";
import ImportantDetails from "./components/ImportantDetails";
import BasicDetails from "./components/BasicDetails";
import MedicalHistory from "./components/MedicalHistory";
import FamilyMembers from "./components/FamilyMembers";
import Verifysignup from "./components/Verifysignup";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginStep1all from "./components/LoginStep1";
import Successful2 from './components/Successful2';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// import { UserAuthContextProvider } from "./components/LoginStep1";
// import { UserAuthContextProvider2 } from "./components/SignupStep1";



export default function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Root />,
      children: [
        {
          path: "", element:(
          <LoginSignUp />),children: [
            { path: "", element: <LoginStep1 /> },
            { path: "*", element: <LoginStep1all /> },
            // { path: "verify-login", element: <Verify /> },
            { path: "verify-login", element: <Verifysignup /> },
            { path: "success-login", element: <Successful1 /> },
            { path: "signup", element: <SignupStep1 /> },
            { path: "verify-signup", element: <Verify isSignupVerify={true} /> },
            {
              path: "success-signup",
              element: <Successful2 />,
            },
          ],
        },
        {
          path: "signup-profile-setup", 
          // element: <SignupProfileSetup />,
          element: <ProtectedRoute><SignupProfileSetup /></ProtectedRoute>,
          // element: <SignupProfileSetup />,
          children: [
            { path: "", element: <ProfileSetupSS1 /> },
            { path: "step-2", element: <ProfileSetupSS2 />},
            { path: "step-3", element: <ProfileSetupSS3 />}
          ]
        }
      ]
    },
    { path: '/home',
      //  element: <Home />, 
      element: <ProtectedRoute><Home /></ProtectedRoute>,
      // element: <Home />,
       children: [
      { path: '', element: <Services /> }
    ]},
    { 
      path: '/bookings',
      //  element: <Outlet />, 
      element:  <Outlet />,
       children: [
        { path: '', element: <MyBookings /> },
        { path: 'urgent-booking-details/:id', element: <MyBookingsUCDetails /> },
        { path: 'urgent-booking-completed-details', element: <MyBookingsUCCompletedDetails />},
        { path: 'urgent-booking-cancelled-details', element: <MyBookingsUCCancelled />},



        ////nonUrgentbookings
        { path: 'non-urgent-booking-details', element: <MyBookingsNUCDetails /> },
        { path: 'non-urgent-booking-completed-details', element: <MyBookingsNUCCompletedDetails />},
        { path: 'non-urgent-booking-cancelled-details', element: <MyBookingsNUCCancelled />},


        

        { path: 'standalone-booking-vaccination-details/:id', element: <MyBookingsSCVDetails /> },
        { path: 'standalone-booking-home-details', element: <MyBookingsSCHDetails /> },
        { path: 'standalone-booking-medicine-details', element: <MyBookingsSCMDetails /> },
        { path: 'standalone-booking-nursing-details', element: <MyBookingsSCNDetails /> },
        { path: 'standalone-booking-lab-test-details', element: <MyBookingsSCLDetails /> },

        { path: 'standalone-booking-completed-vaccination-details', element: <MyBookingsSCCompletedVDetails /> },
        { path: 'standalone-booking-completed-home-details', element: <MyBookingsSCCompletedHDetails /> },
        { path: 'standalone-booking-completed-medicine-details', element: <MyBookingsSCCompletedMDetails /> },
        { path: 'standalone-booking-completed-nursing-details', element: <MyBookingsSCCompletedNDetails /> },
        { path: 'standalone-booking-completed-lab-test-details', element: <MyBookingsSCCompletedLDetails /> },
        { path: 'standalone-booking-cancelled-details', element: <MyBookingsSCCancelled />}
      ]
    },
    {
      path: '/user', 
      // element: <User />,
      element: <ProtectedRoute><User /></ProtectedRoute>,
      // element:  <User /> ,

      children: [
        {path: "", element: <MyProfile />},
        {
          path: "edit-profile",
          element: <EditProfile />,
          children: [
            { path: "", element: <BasicDetails /> },
            { path: "important-details", element: <ImportantDetails /> },
            { path: "medical-history", element: <MedicalHistory />},
            { path: "family-details", element: <FamilyMembers />}
          ],
        },
        { path: 'notifications', element: <Notifications />},
      ]
    },
  ]);
  return (
    <AppContext>
      <RouterProvider router={routes} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Options: light, dark, colored
      />
    </AppContext>
    
  );
}
