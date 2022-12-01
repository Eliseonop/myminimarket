import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { getProductById } from '../../services/producto.service'
import { DataContext } from '../../store/global.state'

function DetailProduct (props) {
  const [product, setProduct] = useState(props.product)
  const [cantidad, setCantidad] = useState(1)
  const [state, dispatch] = useContext(DataContext)
  const { carrito } = state
  const router = useRouter()

  useEffect(() => {
    if (router.query.id) {
      getProductById(router.query.id)
        .then(res => {
          setProduct(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [router.query.id])

  useEffect(() => {
    if (cantidad < 1) {
      setCantidad(1)
    }
  }, [cantidad])

  const handleAddToCart = product => {
    const exist = carrito.find(x => x.id === product.id)

    if (exist) {
      dispatch({
        type: 'CARRITO',
        payload: carrito.map(x =>
          x.id === product.id
            ? { ...exist, cantidad: exist.cantidad + cantidad }
            : x
        )
      })
    } else {
      dispatch({
        type: 'CARRITO',
        payload: [...carrito, { ...product, cantidad: cantidad }]
      })
    }
  }
  const handleBuy = product => {
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

    router.push('/carrito')
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left'>
        <div className='md:flex items-center -mx-10'>
          <div className='w-full md:w-1/2 px-10 mb-10 md:mb-0'>
            <div className='relative'>
              <img
                src={product?.image}
                className='w-full relative z-10'
                alt=''
              />
              <div className='border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0'></div>
            </div>
          </div>
          <div className='w-full md:w-1/2 px-10'>
            <div className='mb-10'>
              <h1 className='font-bold uppercase text-2xl mb-5'>
                {product?.name}
              </h1>
              <p className='text-sm'>{product?.description}</p>
            </div>
            <div>
              <div className='inline-block align-bottom mr-5'>
                <span className='text-2xl leading-none align-baseline'>s/</span>
                <span className='font-bold text-5xl leading-none align-baseline'>
                  {product?.price}
                </span>
              </div>
              <div className='inline-block align-bottom'>
                <button
                  onClick={() => handleBuy(product)}
                  className='bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold'
                >
                  <i className='mdi mdi-cart -ml-2 mr-2'></i> Comprar ahora
                </button>
              </div>
            </div>
            {/* information stock */}
            <div className='mt-10'>
              <span className='font-bold'>Stock:{'  ' + product?.stock} </span>
            </div>
            <div class='md:flex-auto mt-10 '>
              {/* button disminuir cantidad */}
              <div className='flex flex-row '>
                <button
                  onClick={() => setCantidad(cantidad - 1)}
                  className='bg-white opacity-75 border h-10  hover:opacity-100 text-yellow-900 hover:text-white rounded-full  font-semibold hover:bg-black hover:border-slate-400 '
                >
                  {/* icono de menos svg */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M20 12H4'
                    />
                  </svg>
                </button>
                <span className='text-2xl leading-none align-middle px-5 py-2'>
                  {' '}
                  {cantidad}
                </span>
                {/* button aumentar cantidad */}
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  className='bg-white h-10  opacity-75 border  hover:opacity-100 text-yellow-900 hover:text-white rounded-full  font-semibold hover:bg-black hover:border-slate-400 '
                >
                  {/* icono de mas svg */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                </button>
                <button
                  class=' ml-5 hover:bg-black  px-6 font-semibold rounded-md bg-slate-400 text-white'
                  type='submit'
                  onClick={() => handleAddToCart(product)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
// export async function getServerSideProps (context) {
//   const { id } = context.query
//   console.log(id)
//   const res = await getProductById(id)
//   // server side rendering
//   console.log(res)
//   return {
//     props: {
//         product: {
//             id: 1,
//             nombre: 'Producto 1',
//             descripcion: 'Descripcion del producto 1',
//             precio: 100,
//             imagen: 'https://picsum.photos/200/300'
//         }
//     } // will be passed to the page component as props
//   }
// }
