export const selectedFilter = (objFilter, filter) => {
    return objFilter.map(f => {

            if (f.filter.split('/')[1] === filter) {
                return {
                    ...f,
                    select: true
                }
            }else{
                return {
                    ...f,
                    select: false
                }
            }
        })
}

export const isSelectedParam = (objFilter, param) => {

    return objFilter.find(f => f.filter.split('/')[1] === param).select 

}

export const selectedParam = (objFilter, param) => {
    return objFilter.find(f => f.filter.split('/')[1] === param) 
}

export const queryDataParamsApi = (data, param) => { 
    return `${data.url}?filter=${data.nameObj}${param.toString().trim().length > 0 ? `&${param.toString()}` : '' }`
}

export const queryDataParams = (filter) => {
    return `${filter.page}${filter.filter}`
}
