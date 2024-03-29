import React, {  Suspense, lazy} from 'react'
import useSWR from 'swr'
import { fetcher } from '../../helpers/fetch'
import { LoadingComponent } from '../LoadingComponent';
import { NotDataComponent } from '../NotDataComponent';
import ItemWTFollow  from './ItemWTFollow'

export const WhoToFollow = () => {

    const { data: users , isLoading, error } = useSWR(`user/recomment`, fetcher,{
        revalidateOnFocus: false,
        // revalidateOnMount:false,
        // revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0
    })
    
    return (
        <aside className="aside__follow">

            <h2 className="title">Who to follow</h2>

            {
                (users)
                &&
                users.data.map( (user) => (
                    <div key={user.uid+'wh'}>
                        <div className="line" ></div>
                        <ItemWTFollow  user={user}/> 
                    </div>
                ))
            }

            {
                (isLoading)
                ?
                <LoadingComponent />
                : 
                (users.data.length === 0)
                    &&
                <NotDataComponent text={'No users'} />   
            }
        </aside>
    )
}
