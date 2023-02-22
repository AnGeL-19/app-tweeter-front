import React from 'react'
import { HeaderTweeter } from '../header/HeaderTweeter'

export const Layout = ({children}) => {

  return (
    <>

        <HeaderTweeter />

        <main className="main_layout">

            {children}

        </main>

    </>
  )
}
