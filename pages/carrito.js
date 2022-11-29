import { useRouter } from 'next/router'
import { useContext } from 'react'
import { DataContext } from '../store/global.state'

export default function carrito () {
  const [state, dispatch] = useContext(DataContext)

  const { carrito } = state

  const router = useRouter()

  const handleDisminuir = product => {
    const exist = carrito.find(x => x.id === product.id)

    if (exist.cantidad === 1) {
      dispatch({
        type: 'CARRITO',
        payload: carrito.filter(x => x.id !== product.id)
      })
    } else {
      dispatch({
        type: 'CARRITO',
        payload: carrito.map(x =>
          x.id === product.id ? { ...exist, cantidad: exist.cantidad - 1 } : x
        )
      })
    }
  }

  const handleAumentar = product => {
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

  const handleCheckout = () => {
    router.push('/checkout')
  }

  return (
    // my cart of products
    <section className='py-1 bg-blueGray-50'>
      <div className='w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24'>
        <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded '>
          <div className='rounded-t mb-0 px-4 py-3 border-0'>
            <div className='flex flex-wrap items-center'>
              <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
                <h3 className='font-bold  text-blueGray-700 text-2xl'>
                  Mi Carrito
                </h3>
              </div>
              <div class='relative w-full px-4 max-w-full flex-grow flex-1 text-right'>
                <button
                  class={
                    carrito.length === 0
                      ? 'bg-gray-400   text-white active:bg-indigo-600 text-lg font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      : 'bg-blue-500  text-white active:bg-indigo-600 text-lg font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  }
                  type='button'
                  onClick={handleCheckout}
                  disabled={carrito.length === 0}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>

          <div className='block w-full overflow-x-auto'>
            <table className='items-center bg-transparent w-full border-collapse '>
              <thead>
                <tr>
                  <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                    Nombre
                  </th>
                  <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                    imagen
                  </th>
                  <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                    Cantidad
                  </th>
                  <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                    Precio
                  </th>
                  <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                    total
                  </th>
                </tr>
              </thead>

              <tbody>
                {carrito.length === 0 ? (
                  <tr>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left'>
                      <span className='ml-3 font-bold text-blueGray-600'>
                        No hay productos en el carrito
                      </span>
                    </td>
                  </tr>
                ) : (
                  carrito.map(product => (
                    <tr key={product.id}>
                      <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-blueGray-700 '>
                        {product.nombre}
                      </th>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 '>
                        <img
                          className='h-12 w-12 rounded-full'
                          src={product.imagen}
                          alt={product.nombre}
                        />
                      </td>
                      <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
                        {/* button dismis */}
                        <button
                          className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                          type='button'
                          onClick={() => handleDisminuir(product)}
                        >
                          -
                        </button>
                        <span className='text-center mx-3'>
                          {product.cantidad}
                        </span>
                        <button
                          onClick={() => handleAumentar(product)}
                          className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                          type='button'
                        >
                          +
                        </button>
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
                        {/* <i className='fas fa-arrow-up text-emerald-500 mr-4'></i> */}
                        s/ {product.precio}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
                        s/ {product.precio * product.cantidad}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
