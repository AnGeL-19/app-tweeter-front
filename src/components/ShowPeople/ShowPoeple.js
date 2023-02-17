import React from 'react'
import { ItemWTFollow } from '../home/ItemWTFollow'

export const ShowPoeple = ({users, loading, error}) => {

    console.log(users, !!users);

  return (
    <div className="div__sohw_people">

            <section className="show_people">

                {

                    (loading || error)
                    ? <samp>Loading...</samp>
                    : 
                    users.map((user,index) => (
                        <ItemWTFollow key={user.uid+index} user={user}/>
                    ))

                }
                
            </section>      

        </div>
  )
}
