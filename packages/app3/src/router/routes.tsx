import React, { Children, lazy, ReactElement, useMemo } from 'react'
import { Navigate, useRoutes, RouteProps, Link, Outlet } from 'react-router-dom'
import Layout from '../layouts/layout'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import FindGitUser from '../pages/modules/find-git-user'

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
        path: '/find-git-user',
        element: <FindGitUser></FindGitUser>,
      },
    ],
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
