import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/style.css';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import Home from "./routes/home.jsx";
import Dashboard from './routes/dashboard.jsx';
import AppSkills from './routes/skill/AppSkills.jsx';
import CreateInterview from './routes/interview/createInterview.jsx';
import CreateJobOpportunity from './routes/jobopportunity/createJobOpportunity.jsx';
import FactorJobOpportunitySkill from './routes/jobopportunitySkill/factorJobOpportunitySkill.jsx';
import DashboardJobOpportunity from './routes/jobopportunity/dashboardJobOpportunity.jsx';
import Teste from './routes/teste.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/skill",
        element: <AppSkills />,
      },
      {
        path: "/interview/:idJobOpportunity",
        element: <CreateInterview />,
      },
      {
        path: "/jobopportunity",
        element: <CreateJobOpportunity />,
      },
      {
        path: "/jobopportunityskill/:id",
        element: <FactorJobOpportunitySkill />,
      },
      {
        path: "/jobopportunity/dashboard",
        element: <DashboardJobOpportunity />,
      },
      {
        path: "/teste/:idJobOpportunity",
        element: <Teste />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
