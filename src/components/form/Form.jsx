import React from 'react'

export const Form = ({children,onSubmit,className}) => {

  return (
    <form onSubmit={onSubmit} className={className}>
        {children}  
    </form>
  )
}



