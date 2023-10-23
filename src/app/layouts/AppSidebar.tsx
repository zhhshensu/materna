import React, { useContext } from 'react'
import AppMenu from './AppMenu'
import { NavLink } from 'react-router-dom'
import { LayoutContext } from './context/layoutcontext'

const AppSidebar = () => {
  const { layoutConfig } = useContext(LayoutContext)
  return (
    <>
      <div className="side-header">
        <NavLink to="/" className="app-logo">
          <img
            src={`/layout/images/logo-${
              layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'
            }.svg`}
            width="47.22px"
            height={'35px'}
            alt="logo"
          />
          <span>SAKAI</span>
        </NavLink>
      </div>
      <AppMenu />
    </>
  )
}

export default AppSidebar
