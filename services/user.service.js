import { axiosConfig } from './config/axios.config'

export const authRegister = async data => {
  const response = await axiosConfig.post('/auth/user', data)
  return response
}

export const authLogin = async data => {
  const response = await axiosConfig.post('/auth/login', data)
  return response
}

export const getUsers = async () => {
  const { data } = await axiosConfig.get('/auth/user')
  return data
}

export const updateUser = async ( data) => {
  const response = await axiosConfig.put(`/auth/user`, data)
  return response
}
