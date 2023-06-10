import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/style.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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

//Novas
import LoginScreen from './components/Login';
import SignUpScreen from './components/SignUp/index';
import { ProtectLayout } from './components/Protectedlayout';


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element:
          <ProtectLayout>
            < Home />
          </ProtectLayout>
      },
      {
        path: "/report/:idJobOpportunity",
        element:
          <ProtectLayout>
            <ReportPage />
          </ProtectLayout>
      },
      {
        path: "/dashboard",
        element:
          <ProtectLayout>
            < Dashboard />
          </ProtectLayout>
      },
      {
        path: "/dashboard/teste",
        element:
          <ProtectLayout>
            < DashboardTeste />
          </ProtectLayout>
      },
      {
        path: "/skill",
        element:
          <ProtectLayout>
            < AppSkills />
          </ProtectLayout>
      },
      {
        path: "/interview/:idJobOpportunity",
        element:
          <ProtectLayout>
            < CreateInterview />
          </ProtectLayout>
      },
      {
        path: "/jobopportunity",
        element:
          <ProtectLayout>
            < CreateJobOpportunity />
          </ProtectLayout>
      },
      {
        path: "/jobopportunity/dashboard",
        element:
          <ProtectLayout>
            < DashboardJobOpportunity />
          </ProtectLayout>
      },
      {
        path: "/jobopportunity/report/:idJobOpportunity",
        element:
          <ProtectLayout>
            < ReportJobOpportunity />
          </ProtectLayout>
      },
      {
        path: "/jobopportunityskill/:id",
        element:
          <ProtectLayout>
            < FactorJobOpportunitySkill />
          </ProtectLayout>
      },
      {
        path: "/teste/:idJobOpportunity",
        element:
          <ProtectLayout>
            < Teste />
          </ProtectLayout>
      },
      {
        path: "/signup",
        element:
          <SignUpScreen />
      },
      {
        path: "/login",
        element:
          <LoginScreen />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
