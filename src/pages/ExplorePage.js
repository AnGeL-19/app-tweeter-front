import React from 'react'
import { ComponentBtn } from '../components/ComponentBtn'
import { FilterPost } from '../components/FilterPost'
import { HeaderTweeter } from '../components/HeaderTweeter'
import { ShowPosts } from '../components/ShowPost/ShowPosts'

export const ExplorePage = () => {

    const objFilter = {
        filter1: {
            nameObj: 'top',
            select: true,
            name: 'Top'
        },
        filter2: {
            nameObj: 'lastest',
            select: false,
            name: 'Lastest'
        },
        filter3: {
            nameObj: 'people',
            select: false,
            name: 'People'
        },
        filter4: {
            nameObj: 'media',
            select: false,
            name: 'Media'
        },
    }

    

    return (
        <div>
            <HeaderTweeter />

            <div className="explore_container_main">

                <main className="container_main">

                    <div className="div_filter">

                        <FilterPost filters={objFilter}/>

                    </div>

                    <div className="div__input__post">

                        <form className="form_icon_input_btn">

                            <div className="icon_input_btn">
                                <span className="material-icons gray3Color">
                                    search
                                </span>
                                <input type="text" placeholder="Search"/>
                                <ComponentBtn median txtBtn="Search" />
                            </div>

                        </form>

                        <ShowPosts />
                      
                    </div>

                </main>
            </div>


        </div>
    )
}
