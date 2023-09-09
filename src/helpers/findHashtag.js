import React from "react";
import { NavLink } from "react-router-dom";


export const findHashtag = (value='') => {

    const find = value.match(/(^|)#[a-zA-Z0-9][\w-]*\b/g)

    return find ? find.map(f => f.trim()) : []

}


export const hashtagText = (value='') => {

    // const regex = new RegExp(/#+([a-zA-Z0-9_]+)/ig);

    // console.log(value.split(' ').map( (value, i) => value));
    // console.log(value.split(' ').map( (value, i) => !regex.test(value.trim())));

    const text = (
        <React.Fragment>
        {
            value.trim().split(' ').map( (value, i) => {
                if (!value.match(/(^|)#[a-zA-Z0-9][\w-]*\b/g)) {
                    return value+' ';
                }else{
                    return (
                        <NavLink 
                            key={i+'ht'}
                            to={`/explore?hashtag=${value.slice(1,value.length)}`} 
                            className="hashtag_link"
                        >
                            {`${value} `}
                        </NavLink>
                    )
                }

            })
        }
        </React.Fragment>
    )
    return text;

}