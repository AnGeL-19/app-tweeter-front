import React from 'react'
import { ItemWTFollow } from '../home/ItemWTFollow'

export const ShowPoeple = ({users}) => {
  return (
    <div className="div__sohw_post">

            <section className="show_posts">

                {
                    users.map((user,index) => (
                        <>
                            <div className="line"></div>
                            <ItemWTFollow key={user.uid+index} user={user}/>
                        </>
                    ))
                }
                
            </section>      

        </div>
  )
}
