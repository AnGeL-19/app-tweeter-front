import { useCallback, useMemo } from "react";
import { useEffect, useState } from "react";


export const useFetch = (token) => {

    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false)
    

    const [fetchToken, setToken] = useState(token)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const doFetch = async (query,dataInfo,method) => {

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
            setLoading(true)


            const response = await fetch(`${process.env.REACT_APP_URL_API}/${query}`, options);
            const respData = await response.json();


            setData(prev => {
                return [...prev, ...respData.data]
            })

            setHasMore(respData.data.length > 0)

            setLoading(false)
            // setError(null)
        }catch(err){
            console.log(err)
            // setError(err)
            setLoading(true)
        }
        

    }


    const cleanData = () => {
        setData([])
    }


    return {data, loading, hasMore, error, doFetch , cleanData}

}



