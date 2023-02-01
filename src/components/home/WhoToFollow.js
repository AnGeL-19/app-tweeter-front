import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchGetApi } from '../../helpers/fetch';
import { ItemWTFollow } from './ItemWTFollow'

export const WhoToFollow = () => {

    const {token} = useSelector(state => state.auth);
    const [dataUser, setDataUser] = useState([])
    console.log(dataUser);

    useEffect(() => {
        
        const respData = async () => {

            const data = await fetchGetApi('user/recomment',token)
            const resp = await data.json();

            setDataUser(resp.data)
        }

        respData()

    }, [])


    return (
        <aside className="aside__follow">

            <h2 className="title">Who to follow</h2>

            {
                dataUser.map( (user, index) => (
                    <>
                        <div className="line"></div>
                        <ItemWTFollow key={user.uid+index} user={user}/>
                    </>
                ))
            }
            

            {/* <div className="line"></div>

            <ItemWTFollow /> */}

        </aside>
    )
}
