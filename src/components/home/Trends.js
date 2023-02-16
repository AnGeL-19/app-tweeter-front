import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchGetApi } from '../../helpers/fetch';
import { useFetch } from '../../hooks/useFetch';
import { ItemTrend } from './ItemTrend'

export const Trends = () => {

    const {token} = useSelector(state => state.auth);
    const [dataTweets, setDataTweets] = useState([])
    console.log(dataTweets);

    const [ data, loading, error, setLabelFetch ] = useFetch('tweets/hashtags',{},'GET',token)

    useEffect(()=>{
        setDataTweets(data.data )
        return() => setDataTweets([])
    },[data])


    return (
        <section className="section__trends">

            <h2 className="title">Trends for you</h2>
            <div className="line"></div>

            {
                loading
                ? <span>Loading...</span>
                :
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
