import axios from "axios"
import https from 'https'

const HTTP = axios.create({
    baseURL: 'http://localhost:8081',
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})

const HTTPIgnoreNetworkErrors = axios.create({
    baseURL: 'http://hocalhost:8081',
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})

export default {
    getCalculations (page = 1, perPage = 5) {
        return HTTP.get('/calculations?per_page=' + perPage + '&page=' + page, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }
        })
    },
    add (firstInt, secondInt) {
        return HTTP.post('/add/' + firstInt + '/' + secondInt, '',{
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }
        })
    },
    subtract (firstInt, secondInt) {
        return HTTP.post('/subtract/' + firstInt + '/' + secondInt, '',{
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }
        })
    },
    multiply (firstInt, secondInt) {
        return HTTP.post('/multiply/' + firstInt + '/' + secondInt, '',{
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }
        })
    },
    divide (firstInt, secondInt) {
        return HTTP.post('/divide/' + firstInt + '/' + secondInt, '',{
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }
        })
    }
}