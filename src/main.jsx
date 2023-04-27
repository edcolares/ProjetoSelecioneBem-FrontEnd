import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import Home from "./routes/home.jsx";
import NewJobOpportunity from "./routes/NewJobOpportunity.jsx";

import './index.css';

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
