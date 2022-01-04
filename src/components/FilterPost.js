import React, { useState } from 'react'

export const FilterPost = ({filters}) => {

    const {filter1, filter2, filter3, filter4} = filters;

    const [selectF, setSelectFilter] = useState({
        [filter1.nameObj]: filter1,
        [filter2.nameObj]: filter2,
        [filter3.nameObj]: filter3,
        [filter4.nameObj]: filter4
    });


    const handleSelect = (e) => {

        setSelectFilter({
            [filter1.nameObj]: {...filter1,
                                select: false,},
            [filter2.nameObj]: {...filter2,
                                select: false,},
            [filter3.nameObj]: {...filter3,
                                select: false,},
            [filter4.nameObj]: {...filter4,
                                select: false,},
            [e.target.id]: {
                nameObj: e.target.id,
                name: e.target.innerText || e.target.innerHTML,
                select: true
            }
                            
        });

        console.log({[e.target.id]: {
            nameObj: e.target.id,
            name: e.target.innerText || e.target.innerHTML,
            select: true
        }});

        
    }


    return (
        <div className="filters_post">

            <div onClick={handleSelect} 
                 className="filter" 
                 id={`${filter1.nameObj}`}>
                <div className={`line-left ${selectF[filter1.nameObj].select ? 'active-line' : ''}`} ></div>
                <span id={`${filter1.nameObj}`} 
                      className={`nameFilter ${selectF[filter1.nameObj].select ? 'active-text': 'gray3Color'}`}>
                    {filter1.name}
                </span>
            </div>

            <div onClick={handleSelect} 
                 className="filter" id={`${filter2.nameObj}`}>
                <div className={`line-left ${selectF[filter2.nameObj].select  ? 'active-line' : ''}`} ></div>
                <span   id={`${filter2.nameObj}`}
                        className={`nameFilter ${selectF[filter2.nameObj].select  ? 'active-text': 'gray3Color'}`}>
                    {filter2.name}
                </span>
            </div>

            <div onClick={handleSelect} 
                 className="filter" id={`${filter3.nameObj}`}>
                 <div className={`line-left ${selectF[filter3.nameObj].select? 'active-line' : ''}`} ></div>
                <span   id={`${filter3.nameObj}`}
                        className={`nameFilter ${selectF[filter3.nameObj].select ? 'active-text': 'gray3Color'}`}>
                    {filter3.name}
                </span>
            </div>

            <div onClick={handleSelect} 
                 className="filter" id={`${filter4.nameObj}`}>
                 <div className={`line-left ${selectF[filter4.nameObj].select ? 'active-line' : ''}`} ></div>
                <span   id={`${filter4.nameObj}`}
                        className={`nameFilter ${selectF[filter4.nameObj].select ? 'active-text': 'gray3Color'}`}>
                    {filter4.name}
                </span>
            </div>

        </div>
    )
}
