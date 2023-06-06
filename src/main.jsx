import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/style.css';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import Home from "./routes/home.jsx";
import Dashboard from './routes/dashboard/dashboard.jsx';
import AppSkills from './routes/skill/AppSkills.jsx';
import CreateInterview from './routes/interview/createInterview.jsx';
import CreateJobOpportunity from './routes/jobopportunity/createJobOpportunity.jsx';
import FactorJobOpportunitySkill from './routes/jobopportunitySkill/factorJobOpportunitySkill.jsx';
import DashboardJobOpportunity from './routes/jobopportunity/dashboardJobOpportunity.jsx';
import ReportJobOpportunity from './routes/jobopportunity/reportJobOpportunity.jsx'
import ReportPage from './routes/jobopportunity/ReportPage.jsx';
import Teste from './routes/teste.jsx';
import DashboardTeste from './routes/dashboard/dashboardTeste.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/report/:idJobOpportunity",
        element: <ReportPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/teste",
        element: <DashboardTeste />,
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
        path: "/jobopportunity/dashboard",
        element: <DashboardJobOpportunity />,
      },
      {
        path: "/jobopportunity/report/:idJobOpportunity",
        element: <ReportJobOpportunity />,
      },
      {
        path: "/jobopportunityskill/:id",
        element: <FactorJobOpportunitySkill />,
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
