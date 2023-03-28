import React from 'react'
import LogoTweeterSmall from '../static/tweeter-small.svg';

export const LoadingComponent = ({logo}) => {
  return (
    <div className="loading_container">
      {
        logo
        ?
        <div className="div__img__logo">
          <img src={LogoTweeterSmall} className="logoBig" alt='Logo Tweeter Big'/>
        </div>
        :
        <svg className="spinner" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>  
      }
             
    </div>
    
  )
}
