import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import Home from "./routes/home.jsx";
import NewJobOpportunity from "./routes/NewJobOpportunity.jsx";
import Dashboard from './routes/dashboard.jsx';
import CreateSkill from './routes/skill/createSkill.jsx';
import CreateInterview from './routes/interview/createInterview.jsx';
import CreateJobOpportunity from './routes/jobopportunity/createJobOpportunity.jsx';
import AddJobOpportunitySkill from './routes/jobopportunitySkill/addJobOpportunitySkill.jsx';
import Teste from './routes/teste.jsx';
import DashboardJobOpportunity from './routes/jobopportunity/dashboardJobOpportunity.jsx';


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
      {
        path: "/skill",
        element: <CreateSkill></CreateSkill>,
      },
      {
        path: "/interview",
        element: <CreateInterview></CreateInterview>,
      },
      {
        path: "/jobopportunity",
        element: <CreateJobOpportunity></CreateJobOpportunity>,
      },
      {
        path: "/jobopportunityskill/:id",
        element: <AddJobOpportunitySkill></AddJobOpportunitySkill>,
      },
      {
        path: "/teste",
        element: <Teste></Teste>,
      },
      {
        path: "/jobopportunity/dashboard",
        element: <DashboardJobOpportunity></DashboardJobOpportunity>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
