import { useEffect, useState } from "react";


export const useFetch = (label,dataInfo,method='',token) => {

    const [data, setData] = useState([]);

    const [labelFetch, setLabelFetch] = useState(label)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let options = {}

    switch (method.toUpperCase().trim()) {
        case 'GET':
            options = {
                method: 'GET',
                headers: {
                            'x-token': token
                        }
            }
            break;
        default:
            options = {
                method,
                headers: {
                            'Content-type': 'application/json',
                            'x-token': token
                        },
                body: JSON.stringify(dataInfo) 
            }
            break;
    }

    useEffect(() => {
    
        setLoading(true)

        fetch(`${process.env.REACT_APP_URL_API}/${labelFetch}`, options).then((response) => {
           response.json().then(resp => {
                setData(resp)
                setLoading(false)
           })
        }).catch((err) => {
            console.log(err)
            setError(err)
            setLoading(true)
        })

    }, [labelFetch])

    return [data,loading,error,setLabelFetch]

}