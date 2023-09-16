import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout';
import Car from './pages/car';
import { Dashboard } from './pages/dashboard';
import New from './pages/dashboard/new';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Private from './components/private';


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/dashboard",
        element: <Private><Dashboard /></Private>
      },
      {
        path: "/car/:id",
        element: <Car />
      },
      {
        path: "dashboard/new",
        element: <Private><New /></Private>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
])

export { router };