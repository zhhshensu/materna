import React, { Children, lazy, ReactElement, useMemo } from 'react'
import { Navigate, useRoutes, RouteProps, Link, Outlet } from 'react-router-dom'
import Layout from '@/layouts/layout'
import NotFound from '@/pages/NotFound'
import Home from '@/pages/home'

export const routeList: any[] = [
  {
    path: '/',
    element: (
      <Layout>
        <Outlet></Outlet>
      </Layout>
    ),
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export default function MainRouter() {
  const element = useRoutes(routeList)
  return element
}
