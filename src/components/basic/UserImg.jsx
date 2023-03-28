import React from 'react'
import { NavLink } from 'react-router-dom'

export const UserImg = ({url}) => {
  return (
    <div className="img__user"> 
      <img src={url} alt="userimg" />
    </div>
  )
}
// https://th.bing.com/th/id/OIP.ia3f6X2LTEwPjGX6Pdmk4gHaHa?pid=ImgDet&rs=1