import {hideData, isEmpty, isJson, showData} from 'react-lf-tools'

const getLocal = (key, valueDefault = '') => {
    const data = localStorage.getItem(`mytraining:${key}`)
    if (isEmpty(data)) {
        return valueDefault
    } else {
        if (isJson(data))
            return JSON.parse(data)
        else
            return showData(data)
    }
}

const setLocal = (key, data = {}, encrypt = true) => {
    localStorage.setItem(`mytraining:${key}`, (encrypt) ? hideData(data) : JSON.stringify(data))
}

const removeLocal = (key) => {
    localStorage.removeItem(`mytraining:${key}`)
}

const clearLocal = () => localStorage.clear()

const getSession = (key, valueDefault = '') => {
    const data = sessionStorage.getItem(`mytraining:${key}`)
    if (isEmpty(data)) {
        return valueDefault
    } else {
        if (isJson(data))
            return JSON.parse(data)
        else
            return showData(data)
    }
}

const setSession = (key, data = {}, encrypt = true) => sessionStorage.setItem(`mytraining:${key}`, (encrypt) ? hideData(data) : JSON.stringify(data))

const removeSession = (key) => sessionStorage.removeItem(`mytraining:${key}`)

const clearSession = () => sessionStorage.clear()

export {
    getLocal,
    setLocal,
    removeLocal,
    clearLocal,
    getSession,
    setSession,
    removeSession,
    clearSession
}
