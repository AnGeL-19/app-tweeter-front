import React, { memo } from 'react'
import { ItemWTFollow } from '../home/ItemWTFollow'
import { LoadingComponent } from '../LoadingComponent';
import { NotDataComponent } from '../NotDataComponent';

export const ShowPoeple = memo(({users, loading, error}) => {

    console.log(users, !!users);

  return (
    <div className="div__sohw_people">

            <section className="show_people">

                {
                    (loading || error)
                    ? <LoadingComponent />
                    : 
                    (!users || users.length === 0)
                    ? <NotDataComponent text={'No hay Usuarios'} />
                    :
                    users.map((user,index) => (
                        <ItemWTFollow key={user.uid+index} user={user}/>
                    ))
                }        

            </section>      

        </div>
  )
})
