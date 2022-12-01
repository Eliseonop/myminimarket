import axios from 'axios'

export const createOrder = async order => {
  const { data } = await axios.post('/api/order', order)
  return data
}

export const getOrders = async () => {
  const { data } = await axios.get('/api/order')
  return data
}

export const getOrderById = async id => {
  const { data } = await axios.get(`/api/order/${id}`)
  return data
}

export const updateOrder = async order => {
  const { data } = await axios.put(`/api/order/${order.id}`, order)
  return data
}

export const deleteOrder = async id => {
  const { data } = await axios.delete(`/api/order/${id}`)
  return data
}
