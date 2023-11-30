import classNames from 'clsx'
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react'
import { AppTopbarRef } from '../types/types'

import { LayoutContext } from './context/layoutcontext'
import whiteLogo from '@/assets/images/logo-white.png'
import blackLogo from '@/assets/images/logo-black.png'

import { NavLink, Link } from 'react-router-dom'

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const { layoutConfig, onMenuToggle } = useContext(LayoutContext)
  // const menubuttonRef = useRef(null)
  // const topbarmenuRef = useRef(null)
  // const topbarmenubuttonRef = useRef(null)

  // useImperativeHandle(ref, () => ({
  //   menubutton: menubuttonRef.current,
  //   topbarmenu: topbarmenuRef.current,
  //   topbarmenubutton: topbarmenubuttonRef.current,
  // }))
  const logoUrl = layoutConfig?.colorScheme !== 'light' ? whiteLogo : blackLogo
  return (
    <div className="layout-topbar">
      <Link to="/" className="layout-topbar-logo">
        <img src={logoUrl} width="47.22px" height={'35px'} alt="logo" />
        <span>MATERNA</span>
      </Link>

      {/* <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button> */}
    </div>
  )
})

AppTopbar.displayName = 'AppTopbar'

export default AppTopbar
