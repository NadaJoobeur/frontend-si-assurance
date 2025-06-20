import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from '../../modules/auth/pages/LoginPage'
import SignupPage from '../../modules/auth/pages/SignupPage'
import HomePage from '../../modules/home/pages/HomePage'

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
    path: '*', // toute autre route redirige vers login
    element: <LoginPage />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
