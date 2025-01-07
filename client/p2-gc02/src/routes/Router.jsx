import { createBrowserRouter, redirect } from "react-router-dom";

import Public from '../views/public';
import PublicLayout from "../views/PublicLayout";
import DetailedCuisine from '../views/DetailedCuisine';
import MainLayout from "../views/MainLayout";
import Cuisine from '../views/Cuisine';
import Login from "../views/Login"
import AddCuisine from '../views/AddCuisine';
import EditCuisine from '../views/EditCuisine';
import UploadImage from '../views/UploadImage';
import Category from '../views/Category';
import AddUser from '../views/AddUser';

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => {
      return redirect('/pub')
    }
  },
  {
    path: '/pub',
    element: <PublicLayout/>,
    children: [
      {
        path: '',
        element: <Public/>
      },
      {
        path: ':id',
        element: <DetailedCuisine/>
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>,
    loader: () => {
      if(localStorage.access_token) {
        return redirect('/')
      }
      return null
    }
  },
  {
    path: '/',
    element: <MainLayout/>,
    loader: () => {
      if(!localStorage.access_token) {
        return redirect('/login')
      }

      return null
    },
    children: [
      {
        path: 'cuisines',
        element: <Cuisine/>
      },
      {
        path: 'cuisines/add',
        element: <AddCuisine/>
      },
      {
        path: 'cuisines/edit/:id',
        element: <EditCuisine/>
      },
      {
        path: 'cuisines/upload/:id',
        element: <UploadImage/>
      },
      {
        path: 'categories',
        element: <Category/>
      },
    ]
  },
  {
    path: '/add-user',
    loader: () => {
      if(!localStorage.access_token) {
        return redirect('/login')
      }

      return null
    },
    element: <AddUser/>,
  },
])

export default router