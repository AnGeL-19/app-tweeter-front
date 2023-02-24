import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import { LoadingComponent } from '../LoadingComponent';
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
            {/* (loading) */}
            {
                (loading)
                ? <LoadingComponent />
                :
                dataUser.map( (user, index) => (
                    <>
                        <div className="line" key={index}></div>
                        <ItemWTFollow key={user.uid+'wh'} user={user}/>
                    </>
                ))
            }

        </aside>
    )
}
