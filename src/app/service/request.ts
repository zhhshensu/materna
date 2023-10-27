import Axios from 'axios'
import type { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { showToast } from '@/utils'

const BASE_URL = '/api'
const TIME_OUT = 10 * 1000

const SUCCESS_CODE = 200

const instance = Axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 跨域请求时是否需要使用凭证
  withCredentials: true,
})
const token = localStorage.getItem(prefixToken) || ''
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

instance.interceptors.response.use(
  (res) => {
    if (String(res.status).indexOf('2') !== 0) {
      return {
        code: res.status,
        message: res.data.message || '请求异常，请刷新重试',
        result: false,
      }
    }
    const { data, code, message } = res.data
    if (code === SUCCESS_CODE) {
      return data
    } else {
      showToast({
        message,
      })
      return Promise.reject(res.data)
    }
  },
  (error: AxiosError) => {
    if (error && error.response) {
      errorHandle(error.response.status, error.response.data)
      return Promise.reject(error.response)
    }
    return Promise.reject(error)
  },
)

const errorHandle = (status: number, error: any): any => {
  // HTTP状态码判断
  switch (status) {
    case 401:
      return showToast(
        `Error Code: ${status}, Message: ${
          error.message || '登录失效，请重新登录'
        }`,
      )
    case 403:
      return showToast(
        `Error Code: ${status}, Message: ${error.message || '你没有访问权限'}`,
      )
    case 500:
      return showToast(
        `Error Code: ${status}, Message: ${
          error.message || '后台错误，请联系管理员'
        }`,
      )
    case 502:
      return showToast(
        `Error Code: ${status}, Message: ${error.message || '平台环境异常'}`,
      )
    default:
      showToast(
        `Error Code: ${status}, Message: ${
          error.message || '未知错误，请刷新重试'
        }`,
      )
  }
}

export default instance
