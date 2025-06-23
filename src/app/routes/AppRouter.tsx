import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from '../../modules/auth/pages/LoginPage'
import SignupPage from '../../modules/auth/pages/SignupPage'
import HomePage from '../../modules/home/pages/HomePage'
import PersonneAddPage from '../../modules/personne/pages/PersonneAddPage'
import PersonneDetailPage from '../../modules/personne/pages/PersonneDetailPage'
import PersonnesListPage from '../../modules/personne/pages/PersonnesListPage'
import PersonneEditPage from '../../modules/personne/pages/PersonneEditPage'
const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/homepage',
    element: <HomePage />,
  },
  {
    path: '/person/add',
    element: <PersonneAddPage />,
  },
 {
  path: '/person/detail/:numeroIdentification',
  element: <PersonneDetailPage />,
},
{
  path: '/person/list',
  element: <PersonnesListPage />,
},
{
  path: '/person/edit/:numeroIdentification',
  element: <PersonneEditPage />,
},
{
    path: '*', // mettre cette route en dernier
    element: <LoginPage />,
  },
])


export function AppRouter() {
  return <RouterProvider router={router} />
}
