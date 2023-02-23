import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchGetApi } from '../../helpers/fetch';
import { useFetch } from '../../hooks/useFetch';
import { LoadingComponent } from '../LoadingComponent';
import { ItemTrend } from './ItemTrend'

export const Trends = () => {

    const {token} = useSelector(state => state.auth);

    const [dataTrend, setDataTrend] = useState([])

    const {doFetch, data, loading, error } = useFetch(token)

    useEffect(()=>{
        doFetch('tweets/hashtags', {}, 'GET') 
    },[])

    useEffect(()=>{
        setDataTrend(data.data) 
    },[data])

    return (
        <section className="section__trends">

            <h2 className="title">Trends for you</h2>
            <div className="line"></div>
            {/* (loading) */}
            {
                (true)
                ? <LoadingComponent />
                :
                dataTrend.map( trend => (
                    <ItemTrend key={trend.hid} trend={trend} />
                ))
            }

        </section>
    )
}
