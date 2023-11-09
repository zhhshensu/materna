import React, { useContext, useEffect, useState } from 'react'
import { AppConfigProps, LayoutConfig, LayoutState } from '../types/types'
import { LayoutContext } from './context/layoutcontext'

const AppConfig = (props: AppConfigProps) => {
  // const { layoutConfig, layoutState } = useContext(LayoutContext)

  // const applyScale = () => {
  //   document.documentElement.style.fontSize = layoutConfig.scale + 'px'
  // }

  // useEffect(() => {
  //   applyScale()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [layoutConfig.scale])

  return <></>
}

export default AppConfig
