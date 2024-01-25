export default class ApiService {
    static init = () => {
        const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
        this.apiURL = apiURL + '/api'
    }

    static callApi = async (url, options) => {
        return fetch(`${this.apiURL}${url}`, options).then((response) => {
            if (response.ok) {
                const contentType = response.headers.get('content-type')
                if (
                    contentType &&
                    contentType.indexOf('application/json') !== -1
                ) {
                    return response.json()
                } else if (
                    contentType &&
                    contentType.indexOf('image/') !== -1
                ) {
                    return response.blob()
                } else {
                    return response.text()
                }
            } else if (response.status === 401) {
                window.location.href = '/login'
            } else {
                const error = new Error(
                    response.statusText || 'An error occured'
                )
                error.status = response.status
                error.response = response

                throw error
            }
        })
    }

    static get = async (url) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }
        return this.callApi(url, options)
    }

    static post = async (url, data = {}) => {
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        return this.callApi(url, options)
    }

    static put = async (url, data = {}) => {
        const options = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        return this.callApi(url, options)
    }

    static sendForm = async (url, data = {}) => {
        const options = {
            method: 'PUT',
            credentials: 'include',
            body: data,
        }
        return this.callApi(url, options)
    }

    static fetchImage = async (url) => {
        const options = {
            method: 'GET',
            credentials: 'include',
        }

        if (url.startsWith('http')) {
            return fetch(url).then((response) => {
                if (response.ok) {
                    return response.blob()
                } else {
                    const error = new Error(
                        response.statusText || 'An error occured'
                    )
                    error.status = response.status
                    error.response = response

                    throw error
                }
            })
        }

        return this.callApi(url, options)
    }
}
