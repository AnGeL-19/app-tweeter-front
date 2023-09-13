import React, { useRef } from 'react'
import { FilterPost } from '../components/FilterPost'
import { SearchComponent } from '../components/SearchComponent'
import { ShowPoeple } from '../components/ShowPeople/ShowPoeple'
import { ShowPosts } from '../components/ShowPost/ShowPosts'
import { useQuery } from '../hooks/useQuery'
import { useParams, useHistory } from 'react-router-dom'
import { 
    isSelectedParam, 
    queryDataParams, 
    queryDataParamsApi, 
    selectedFilter, 
    selectedParam,  
} from '../helpers/selectedRoute'


export const ExplorePage = () => {

    const query = useQuery();
    const param = useParams();

    const objFilter = [
        {
            nameObj: 'top',
            select: true,
            name: 'Top',
            url: 'tweets/explore',
            page: '/explore',
            filter: '/top'  
        },
        {
            nameObj: 'lastest',
            select: false,
            name: 'Lastest',
            url: 'tweets/explore',
            page: '/explore',
            filter: '/lastest'       
        },
        {
            nameObj: 'people',
            select: false,
            name: 'People',
            url: `user/people`,
            page: '/explore',
            filter: '/people' 
        },
        {
            nameObj: 'media',
            select: false,
            name: 'Media',
            url: '',
            page: '/explore',
            filter: '/media'
        },
    ]


    const filters = useRef(selectedFilter(objFilter, param.filter))
    const showPeople = useRef(isSelectedParam(filters.current,'people'))
    const urlData = useRef(filters.current.find(f => f.select))
    const filter = useRef(selectedParam(filters.current,param.filter))
    const baseUrl = useRef(queryDataParamsApi(urlData.current, query))
    const baseUrlWeb = useRef(queryDataParams(filter.current))
    

    return (

        <main className="explore_container_main">

            <div className="div_filter">

                <FilterPost filters={ filters.current } query={query.toString()} />

            </div>

            <div className="div__input__post">

                <SearchComponent param={baseUrlWeb.current} query={query.toString()} />
                
                
                {

                    (showPeople.current)
                    ? <ShowPoeple query={
                        baseUrl.current
                    }/>
                    : 
                    <ShowPosts query={
                        baseUrl.current
                    }
                    />  
                }
                
                
            </div>

        </main>

    )
}
