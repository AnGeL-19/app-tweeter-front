import { types } from "../types/types"

export const addError = (message) => ({
    type: types.addError,
    payload: message
})

export const removeError = () => ({
    type: types.removeError
})