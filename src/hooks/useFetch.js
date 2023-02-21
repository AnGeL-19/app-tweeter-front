import { useCallback } from "react";
import { useEffect, useState } from "react";


export const useFetch = (token) => {

    const [data, setData] = useState([]);

    const [fetchToken, setToken] = useState(token)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loa = useCallback((value) => {
        setLoading(value);
    },[loading])

    const doFetch = async (label,dataInfo,method) => {

        let options = {}
        switch (method.toUpperCase().trim()) {
            case 'GET':
                options = {
                    method: 'GET',
                    headers: {
                                'x-token': fetchToken
                            }
                }
                break;
            default:
                options = {
                    method,
                    headers: {
                                'Content-type': 'application/json',
                                'x-token': fetchToken
                            },
                    body: JSON.stringify(dataInfo) 
                }
                break;
        }

        try{
            loa(true)

            const response = await fetch(`${process.env.REACT_APP_URL_API}/${label}`, options);
            const respData = await response.json();
            
           
            setData(respData)
            loa(false)
            // setError(null)
        }catch(err){
            console.log(err)
            // setError(err)
            loa(true)
        }
        

    }

    // useEffect(() => {
    
        // setLoading(true)
        // fetch(`${process.env.REACT_APP_URL_API}/${labelFetch}`, options).then((response) => {
        //     response.json().then(resp => {
        //         setData(resp)
        //         setLoading(false)
        //     })
        // }).catch((err) => {
        //     console.log(err)
        //     setError(err)
        //     setLoading(true)
        // })

    //     console.log("amonos");

    // }, [labelFetch])
    // ,loading,error,

    const fe = useCallback((label,dataInfo,method) => {
        doFetch(label,dataInfo,method)
    },[data])


    return {data, loading, error, doFetch: fe}

}