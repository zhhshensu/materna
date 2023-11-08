import React, { useState } from 'react'
import { PrimeReactProvider } from 'primereact/api'
import { LayoutProvider } from './layouts/context/layoutcontext'
import { MainRouter } from './router'

import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css' // flex
import './App.css'

function App() {
  return (
    <PrimeReactProvider>
      <LayoutProvider>
        <MainRouter />
      </LayoutProvider>
    </PrimeReactProvider>
  )
}

export default App
