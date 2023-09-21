import React, { Children, lazy, ReactElement, useMemo } from 'react'
import { Navigate, useRoutes, RouteProps, Link, Outlet } from 'react-router-dom'
import Layout from '../layout/layout'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

export const routeList: any[] = [
  {
    path: '/',
    element: (
      <Layout>
        <Outlet></Outlet>
      </Layout>
    ),
    children: [],
  },
  {
    path: '/login',
    name: '登录',
    element: <Login />,
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
