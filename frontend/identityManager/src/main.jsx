import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import API from './pages/API';
import Contact from './pages/Contact';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Logout from './components/Logout';
import RegisterBusiness from './api/RegisterBusiness';
import { ReactSession } from "react-client-session";

ReactSession.setStoreType("sessionStorage");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/api',
    element: <API />,
    errorElement: <Error />
  },
  {
    path: '/contact',
    element: <Contact />,
    errorElement: <Error />
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />
  },
  {
    path: '/profile',
    element: <Welcome />,
    errorElement: <Error />
  },
  {
    path: '/error',
    element: <Error />
  },
  {
    path: '/logout',
    element: <Logout />,
    errorElement: <Error />
  },
  {
    path: '/business',
    element: <RegisterBusiness />,
    errorElement: <Error />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
