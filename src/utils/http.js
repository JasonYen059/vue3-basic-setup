import API from './axios'

const GET = async (url, params) => {
  try {
    const res = await API.get(url, { params })
    return res.data
  } catch (res) {
    return Promise.reject(res.message)
  }
}

const POST = async (url, data) => {
  try {
    const res = await API.post(url, data)
    return res.data
  } catch (res) {
    return Promise.reject(res.message)
  }
}

const PUT = async (url, data) => {
  try {
    const res = await API.put(url, data)
    return res.data
  } catch (res) {
    return Promise.reject(res.message)
  }
}

const DELETE = async (url, params) => {
  try {
    const res = await API.put(url, { params })
    return res.data
  } catch (res) {
    return Promise.reject(res.message)
  }
}

export default { GET, POST, PUT, DELETE }
