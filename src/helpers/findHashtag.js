import { NavLink } from "react-router-dom";


export const findHashtag = (value='') => {

    const find = value.match(/(^|)#[a-zA-Z0-9][\w-]*\b/g)
    // string.replace(/(^|\s)#[a-zA-Z0-9][\w-]*\b/g, "$1<span>$2</span>")
    // const h = find.slice(find.index)
    // ,"$1<span>$2</span>"
    console.log(find);

    return find ? find.map(f => f.trim()) : []

}


export const hashtagText = (value='') => {

    const regex = new RegExp(/#+([a-zA-Z0-9_]+)/ig);

    const text = (
        <>
        {
            value.split(' ').map(value => {
                if (!regex.test(value)) {
                    return value+' ';
                }else{
                    return (
                        <NavLink to={`/explore?hashtag=${value.slice(1,value.length)}`} 
                            className="hashtag_link"
                        >
                            {`${value} `}
                        </NavLink>
                    )
                }

            })
        }
        </>
    )

    return text;

}