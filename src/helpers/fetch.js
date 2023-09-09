

// login/new

import Cookies from "js-cookie";

export const fetchApi = (data, label, method,token) => {

    return fetch(`${process.env.REACT_APP_URL_API}/${label}`, {
        method: method,
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        },
        body: JSON.stringify(data)
    });
}

export const fetchGetApi = (label,token) => {

    const url = `${process.env.REACT_APP_URL_API}/${label}`;
    console.log(url);
    console.log({label,token});
    return fetch(url,{
        method: 'GET',
        headers: {
            'x-token': token
        }
    });

}


export const fetcher = url => fetch(`${process.env.REACT_APP_URL_API}/${url}`,{
    method: 'GET',
    headers: {
            'x-token': Cookies.get('token'),
    }
}).then(r => r.json())


export const fetcherPost = (url,{arg}) => fetch(`${process.env.REACT_APP_URL_API}/${url}`,{
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
        'x-token': Cookies.get('token')
    },
    body: JSON.stringify(arg)
}).then(r => r.json())

export const fetcherFile = (url,{ arg }) => fetch(`${process.env.REACT_APP_URL_API}/${url}`,{
    method: 'POST',
    headers: {
        'x-token': Cookies.get('token')
    },
    body: arg
}).then(r => r.json())

export const fetcherFilePut = (url, arg ) => fetch(`${process.env.REACT_APP_URL_API}/${url}`,{
    method: 'PUT',
    headers: {
        'x-token': Cookies.get('token')
    },
    body: arg
}).then(r => r.json())

export const fetcherPut = (url,{ arg }) => fetch(`${process.env.REACT_APP_URL_API}/${url}`,{
    method: 'PUT',
    headers: {
        'Content-type': 'application/json',
        'x-token': Cookies.get('token')
    },
    body: JSON.stringify(arg ? arg:{})
}).then(r => r.json())

