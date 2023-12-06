import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { Welcome } from './pages/Login.jsx';
import { TeacherPage } from './pages/teacher.jsx';
import { CreateStudentPage } from './pages/CreateStudent.jsx';
import { ProfileStudent } from './pages/ProfileStudent.jsx';
import { ProfileCompany } from './pages/ProfileCompany.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "/create-student",
        element: <CreateStudentPage />,
      },
      {
        path: "/welcome2",
        element: <Welcome />,
      },
      {
        path: "/teacher",
        element: <TeacherPage />,
      },
      {
        path: "/profile-student",
        element: <ProfileStudent />,
      },
      
      {
        path: "/profile-company",
        element: <ProfileCompany />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
