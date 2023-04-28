import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/style.css';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import Home from "./routes/home.jsx";
import NewJobOpportunity from "./routes/NewJobOpportunity.jsx";
import Dashboard from './routes/dashboard.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/newjobopportunity",
        element: <NewJobOpportunity></NewJobOpportunity>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
