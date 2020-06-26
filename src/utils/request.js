import axios from 'axios'
import {
    Message
} from 'element-ui';
//创建axios
const request = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 100000
})

//设置axios请求拦截器  可以对请求进行统一化的处理
request.interceptors.request.use(
    config => {
        return config
    },
    err => {
        Message.error('请求异常！！！')
        return Promise.reject('请求异常！！！')
    }
)

//设置响应拦截器
request.interceptors.response.use(
    response => {
        let res = response.data;
        let code = res.code;
        if (code === 200) {
            return res;
        } else {
            Message.error('请求异常！！！')
            return Promise.reject('请求异常！！！')
        }
    },
    err => {
        Message.error('请求异常！！！')
        return Promise.reject('请求异常！！！')
    }
)

export default request