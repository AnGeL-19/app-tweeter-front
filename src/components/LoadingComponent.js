import React from 'react'

export const LoadingComponent = () => {
  return (
    <div className="loading_container">
        <svg className="spinner" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>  
    </div>
    
  )
}
