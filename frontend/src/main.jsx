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
        path: "/welcome2",
        element: <Welcome />,
      },
      {
        path: "/teacher",
        element: <TeacherPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
