import axios from 'axios'
import { tip } from './httperror'
import { useSession } from '../composables/useSession'

const { getSession, setSession } = useSession()

const baseUrl = 'https://ginoweng.com'

const API = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'text/plain'
  }
})
// http request 攔截器
API.interceptors.request.use(
  (config) => {
    let access_token = getSession('access_token')
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// http response 攔截器
API.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const originalRequest = error.config
    const refreshToken = getSession('refresh_token')
    const { response } = error
    if (response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      async () => {
        try {
          const res = await API.post('/api/refresh_token', { refreshToken })
          const { new_access_token, new_refresh_token } = res.data
          setSession('access_token', new_access_token)
          setSession('refresh_token', new_refresh_token)
          originalRequest.headers.Authorization = `Bearer ${new_access_token}`
          return await API(originalRequest)
        } catch (err) {
          errorHandle(401)
          return Promise.reject(error)
        }
      }
    }
    if (response) {
      errorHandle(response.status)
    }
    return Promise.reject(error)
  }
)

//失敗處理
const errorHandle = (status) => {
  switch (status) {
    case 401:
      // token不合法、過期或為空值
      tip('登入逾時 / 錯誤')
      break
    case 403:
      //該權限無法獲取該api資料
      tip('無權限')
      break
    case 500:
      //API Exception
      tip('讀取失敗')
      break
    default:
      tip('錯誤')
  }
}

export default API
