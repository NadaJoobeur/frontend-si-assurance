import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from '../../modules/auth/pages/LoginPage'
import SignupPage from '../../modules/auth/pages/SignupPage'
import HomePage from '../../modules/home/pages/HomePage'
import PersonneAddPage from '../../modules/personne/pages/PersonneAddPage'
import PersonneDetailPage from '../../modules/personne/pages/PersonneDetailPage'
import PersonnesListPage from '../../modules/personne/pages/PersonnesListPage'
import PersonneEditPage from '../../modules/personne/pages/PersonneEditPage'
import CreateContratPage from '../../modules/contrat/pages/CreateContratPage'
import ContratsPage from '../../modules/contrat/pages/ContratsPage'
import ContratDetailPage from '../../modules/contrat/pages/ContratDetailPage'
import ContratUpdatePage from '../../modules/contrat/pages/ContratUpdatePage'
import  PacksPage from '../../modules/garantie/Pages/PacksPage'
import CreateAgencePage from '../../modules/agence/pages/CreateAgencePage'
import AgencesPage from '../../modules/agence/pages/AgencesPage'
import AgenceUpdatePage from '../../modules/agence/pages/AgenceUpdatePage'
import AgenceDetailPage from '../../modules/agence/pages/AgenceDetailPage'
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
  path: '/contrat/add',
  element: <CreateContratPage/>,
},
 { path: '/contrat/list',
  element: < ContratsPage />,
},
   {
  path: '/contrat/detail/:numeroContrat',
  element: <ContratDetailPage />,
},
 {
  path: '/contrat/edit/:numeroContrat',
  element: <ContratUpdatePage />,
},
{
  path: '/garantie',
  element: <PacksPage />,
},
{
  path: '/agence/add',
  element: <CreateAgencePage/>,
},
 { path: '/agences/list',
  element: < AgencesPage />,
},
 { path: '/agences/detail/:code_agence',
  element: <AgenceDetailPage />,
},
 {
  path: '/agences/edit/:code_agence',
  element: <AgenceUpdatePage />,
},
{
    path: '*', // mettre cette route en dernier
    element: <LoginPage />,
  },
])


export function AppRouter() {
  return <RouterProvider router={router} />
}
