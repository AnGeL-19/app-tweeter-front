

// login/new

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