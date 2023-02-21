import React from 'react'
import { HeaderTweeter } from '../header/HeaderTweeter'

export const Layout = ({children}) => {

  return (
    <div>

        <HeaderTweeter />

        <main>

            {children}

        </main>

    </div>
  )
}
