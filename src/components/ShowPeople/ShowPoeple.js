import React, { memo } from 'react'
import { ItemWTFollow } from '../home/ItemWTFollow'

export const ShowPoeple = memo(({users, loading, error}) => {

    console.log(users, !!users);

  return (
    <div className="div__sohw_people">

            <section className="show_people">

                {

                    (!users || users.length === 0 || loading || error)
                    ? <samp>Loading...</samp>
                    : 
                    users.map((user,index) => (
                        <ItemWTFollow key={user.uid+index} user={user}/>
                    ))

                }
                
            </section>      

        </div>
  )
})
