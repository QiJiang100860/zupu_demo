import axios from 'axios'
import host from '../../config/hostCfg'

// create an axios instance
const service = axios.create({
    baseURL: host.host, // api的base_url
    timeout: 5000, // request timeout
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})
service.interceptors.request.use(config => {
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})



// respone interceptor
service.interceptors.response.use(
    response => response.data,
    error => {
        console.log('网络异常')
        return Promise.reject(error)
    })

export default service
