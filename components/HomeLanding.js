import { useContext, useEffect, useState } from 'react'
import { getProducts } from '../services/producto'
import { DataContext } from '../store/global.state'

export function HomeLanding () {
  const [state, dispatch] = useContext(DataContext)
  const [products, setProducts] = useState([])

  const { carrito } = state

  useEffect(() => {
    try {
      obtainProducts()
    } catch (error) {
      console.log(error)
    }
    console.log(state)
  }, [])

  const obtainProducts = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddToCart = product => {
    const exist = carrito.find(x => x.id === product.id)

    if (exist) {
      dispatch({
        type: 'CARRITO',
        payload: carrito.map(x =>
          x.id === product.id ? { ...exist, cantidad: exist.cantidad + 1 } : x
        )
      })
    } else {
      dispatch({
        type: 'CARRITO',
        payload: [...carrito, { ...product, cantidad: 1 }]
      })
    }
  }

  return (
    // landing for a ecommerce
    <div className='flex flex-col items-center  md:justify-around  justify-center min-h-screen py-2'>
      <main className='flex flex-col p-4  w-full flex-1  items-center text-center'>
        {/* mostrar un listado de todos los productos */}
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {products?.map(product => (
            // card minimalist for product in landing qual to shopify
            <div
              key={product.id}
              className='bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700'
            >
              <img
                className='rounded-t-lg p-8 h-52 w-52 md:w-64 mx-auto'
                src={product.imagen}
                alt='product image'
              ></img>

              <div className='px-5 pb-5'>
                <a href='#'>
                  <h3 className='text-gray-900 font-semibold text-xl tracking-tight dark:text-white'>
                    {product.nombre}
                  </h3>
                </a>
                <div className='flex items-center mt-2.5 mb-5'>
                  <svg
                    className='w-5 h-5 text-yellow-300'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                  </svg>
                  <svg
                    className='w-5 h-5 text-yellow-300'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                  </svg>
                  <svg
                    className='w-5 h-5 text-yellow-300'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                  </svg>
                  <svg
                    className='w-5 h-5 text-yellow-300'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                  </svg>
                  <svg
                    className='w-5 h-5 text-yellow-300'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                  </svg>
                  <span className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>
                    {product.rating || 5}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <h5 className='text-xs pb-2 font-semibold text-gray-700 dark:text-gray-200'>
                    {product.descripcion}
                  </h5>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-2xl mx-4 font-bold text-gray-900 dark:text-white'>
                    s/ {product.precio}
                  </span>
                  <a
                    href='#'
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    onClick={() => handleAddToCart(product)}
                  >
                    Agregar al carrito
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
