import React from 'react'
import { ItemWTFollow } from '../home/ItemWTFollow'

export const ShowPoeple = ({users}) => {

    console.log(users);

  return (
    <div className="div__sohw_people">

            <section className="show_people">

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
