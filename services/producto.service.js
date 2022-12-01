import axios from 'axios'

export const createProduct = async product => {
  const { data } = await axios.post('/api/producto', product)
  return data
}

export const getProducts = async () => {
  const { data } = await axios.get('/api/producto')
  return data
}

export const getProductById = async id => {
  const { data } = await axios.get(`/api/producto/${id}`)
  return data
}

export const updateProduct = async product => {
  const { data } = await axios.put(`/api/producto/${product.id}`, product)
  return data
}

export const deleteProduct = async id => {
  const { data } = await axios.delete(`/api/producto/${id}`)
  return data
}
