import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchGetApi } from '../../helpers/fetch';
import { ItemTrend } from './ItemTrend'

export const Trends = () => {

    const {token} = useSelector(state => state.auth);
    const [dataTweets, setDataTweets] = useState([])
    console.log(dataTweets);

    useEffect(() => {
        
        const respData = async () => {
            const data = await fetchGetApi('tweets/hashtags',token)
            const resp = await data.json();

            setDataTweets(resp.tweets)
        }

        respData()

    }, [])

    return (
        <section className="section__trends">

            <h2 className="title">Trends for you</h2>
            <div className="line"></div>

            {
                dataTweets.map( trend => (
                    <ItemTrend key={trend.hid} trend={trend} />
                ))
            }
            {/* <ItemTrend />
            <ItemTrend />
            <ItemTrend />
            <ItemTrend />
            <ItemTrend />
            <ItemTrend />                       */}

        </section>
    )
}
