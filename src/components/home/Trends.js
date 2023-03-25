import React, { lazy, Suspense } from 'react'
import useSWR from 'swr'
import { LoadingComponent } from '../LoadingComponent';
import { fetcher } from '../../helpers/fetch'
import ItemTrend  from './ItemTrend'
import { NotDataComponent } from '../NotDataComponent';

export const Trends = () => {
    
    const { data: trends , isLoading, error } = useSWR(`tweets/hashtags`, fetcher)

    return (
        <section className="section__trends">

            <h2 className="title">Trends for you</h2>
            <div className="line"></div>
            <Suspense fallback={<LoadingComponent />} > 
                {
                    (trends)
                    &&
                    trends.data.map( trend => (
                        <ItemTrend key={trend.hid} trend={trend} />
                    ))
                }
            </Suspense>

            {
                (isLoading)
                ?
                <LoadingComponent />
                : 
                (trends.data.length === 0)
                    &&
                <NotDataComponent text={'No Trends'} />   
            }
        </section>
    )
}