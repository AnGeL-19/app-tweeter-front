import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import { ItemWTFollow } from './ItemWTFollow'

export const WhoToFollow = () => {

    const {token} = useSelector(state => state.auth);
    const [dataUser, setDataUser] = useState([])

    const {doFetch, data, loading, error } = useFetch(token)

    useEffect(()=>{
        doFetch('user/recomment',{},'GET')
    },[])

    useEffect(()=>{
        setDataUser(data.data )
    },[data])
    
    return (
        <aside className="aside__follow">

            <h2 className="title">Who to follow</h2>

            {
                loading
                ? <span>Loading...</span>
                :
                dataUser.map( (user, index) => (
                    <>
                        <div className="line"></div>
                        <ItemWTFollow key={user.uid+index+'wh'} user={user}/>
                    </>
                ))
            }

        </aside>
    )
}
