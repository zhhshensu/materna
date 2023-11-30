import React, { useContext } from 'react'
import AppMenu from './AppMenu'
import { LayoutContext } from './context/layoutcontext'

const AppSidebar = () => {
  const { layoutConfig } = useContext(LayoutContext)

  return (
    <>
      <div className="side-header">
        <AppMenu />
      </div>
    </>
  )
}

export default AppSidebar
