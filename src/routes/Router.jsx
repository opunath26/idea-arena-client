import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import AddContest from "../pages/AddContest/AddContest";
import DashboardLayout from "../layouts/DashboardLayout";
import MyContests from "../pages/Dashboard/MyContests/MyContests";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Candidate from "../pages/Candidate/Candidate";
import ApproveCandidates from "../pages/Dashboard/ApproveCandidates/ApproveCandidates";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignCandidates from "../pages/Dashboard/AssignCandidates/AssignCandidates";
import OrganizerRoute from "./OrganizerRoute";
import ContestManagement from "../pages/Dashboard/ContestManagement/ContestManagement";
import PrizeDelivered from "../pages/Dashboard/PrizeDelivered/PrizeDelivered";
import Winner from "../pages/Winner/Winner";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Contests from "../pages/Contests/Contests";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import AllContests from "../pages/AllContests/AllContests";
import Error from "../pages/Shared/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'candidate',
        element: <PrivateRoute><Candidate></Candidate></PrivateRoute>,
        loader: () => fetch('/addContest.json').then(res => res.json())
      },
      {
        path: 'add-contest',
        element: <PrivateRoute><AddContest></AddContest></PrivateRoute>,
        loader: () => fetch('/addContest.json').then(res => res.json())
      },
      {
        path: 'contest-track/:trackingId',
        Component: Winner
      },
      {
        path: 'all-contests',
        element: <AllContests />
      },
      {
        path: 'contest-details/:id',
        element: <PrivateRoute><ContestDetails /></PrivateRoute> 
      },
    ]
  },

  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      {
        path: 'my-contests',
        Component: MyContests
      },

      {
        path: 'payment/:contestId',
        Component: Payment
      },
      {
        path: 'payment-history',
        Component: PaymentHistory
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      
      // Organizer Only routes
      {
        path: 'contest-management',
        element: <OrganizerRoute><ContestManagement></ContestManagement></OrganizerRoute>
      },
      {
        path: 'prize-delivered',
        element: <OrganizerRoute><PrizeDelivered></PrizeDelivered></OrganizerRoute>
      },

      // Admin Only routes
      {
        path: 'approve-candidates',
        element: <AdminRoute><ApproveCandidates></ApproveCandidates></AdminRoute>
      },
      {
        path: 'assign-candidates',
        element: <AdminRoute><AssignCandidates></AssignCandidates></AdminRoute>
      },
      {
        path: 'users-management',
        element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
      }
    ]
  },
  {
    path: '*',
    element: <Error></Error>
  }
]);