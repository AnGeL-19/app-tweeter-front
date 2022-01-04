import React from 'react'
import { ItemTrend } from './ItemTrend'

export const Trends = () => {



    return (
        <section className="section__trends">

            <h2 className="title">Trends for you</h2>
            <div className="line"></div>

            <ItemTrend />
            <ItemTrend />
            <ItemTrend />
            <ItemTrend />
            <ItemTrend />
            <ItemTrend />                      

        </section>
    )
}
