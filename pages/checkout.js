import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { createOrder } from '../services/order.service'
import { DataContext } from '../store/global.state'
import OrderCheck from '../components/Ordercheck'
import Link from 'next/link'
export default function checkout () {
  const [state, dispatch] = useContext(DataContext)
  const [loading, setLoading] = useState(false)
  const { carrito, auth } = state

  const [check, setCheck] = useState(false)

  const [values, setValues] = useState({
    nombre: '',
    email: auth.user ? auth.user.email : '',
    direccion: '',
    ciudad: '',
    tarjeta: '',
    cvv: '',
    fecha: ''
  })
  const router = useRouter()
  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    try {
      handleBuy().then(res => {
        setLoading(false)
        dispatch({ type: 'CARRITO', payload: [] })
        setCheck(true)
        router.push('/')
      })
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCheck(false)
  //   }, 5000)
  // }, [check])

  const informationCart = {
    cantidad: carrito.reduce((a, b) => a + b.cantidad, 0),
    total: carrito.reduce((a, b) => a + b.price * b.cantidad, 0)
  }
  const handleBuy = async () => {
    const productos = carrito.map(x => x.id)

    try {
      const data = createOrder({
        total: +informationCart.total,
        quantity: +informationCart.cantidad,
        direction: values.direccion,
        userId: auth?.user?.id,
        products: productos
      })
      dispatch({ type: 'CARRITO', payload: [] })
    } catch (error) {
      console.log(error)
    }
  }

  if (check) {
    return <OrderCheck check={check} setCheck={setCheck} />
  }

  return (
    // formulario checkout
    <section className='flex items-center justify-center py-10'>
      <div className='p-8 bg-gray-100 dark:bg-black flex flex-col lg:w-full xl:w-3/5'>
        <div className='w-full max-w-md'>
          {/* information cart */}
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <h1 className='text-center text-2xl font-bold text-gray-900'>
                Checkout
              </h1>
            </div>
            <div className='mb-4'>
              <h1 className='text-center text-xl font-bold text-gray-900'>
                Información del carrito
              </h1>
            </div>
            <div className='mb-4'>
              <h1 className='text-center text-lg font-bold text-gray-900'>
                Cantidad de productos: {informationCart.cantidad}
              </h1>
            </div>
            <div className='mb-4'>
              <h1 className='text-center text-lg font-bold text-gray-900'>
                Total: s/{informationCart.total}
              </h1>
            </div>
          </div>
        </div>
        <label className='mt-8 text-base leading-4 text-black dark:text-gray-50'>
          Tarjeta
        </label>
        <div className='mt-2 flex-col'>
          <div>
            <input
              name='tarjeta'
              value={values.tarjeta}
              onChange={handleInputChange}
              className='border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-400 text-gray-400'
              type='tel'
              placeholder='xxxx xxxx xxxx xxxx'
            />
          </div>
          <div className='flex-row flex'>
            <input
              className='border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-400 text-gray-400'
              name='fecha'
              type='month'
              placeholder='MM/YY'
              value={values.fecha}
              onChange={handleInputChange}
            />
            <input
              className='border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-400 text-gray-400'
              type='password'
              maxLength={3}
              name='cvv'
              placeholder='CVC'
              value={values.cvv}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <label className='mt-8 text-base leading-4 text-black dark:text-gray-50'>
          Nombre del propietario
        </label>
        <div className='mt-2 flex-col'>
          <div>
            <input
              className='border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-400 text-gray-400'
              type='email'
              name='nombre'
              placeholder='Juan Perez'
              value={values.nombre}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <label className='mt-8 text-base leading-4 text-black dark:text-gray-50'>
          Ciudad y region
        </label>
        <div className='mt-2 flex-col'>
          <input
            value={values.direccion}
            onChange={handleInputChange}
            className='border rounded-bl rounded-br border-gray-300 p-4 w-full text-base leading-4  text-black placeholder-gray-300'
            type='text'
            name='direccion'
            placeholder='lima-peru, av. los incas 123'
          />
        </div>

        <button
          disabled={carrito.length < 0 || !state?.auth?.user}
          className={
            carrito.length < 0 || !state?.auth?.user
              ? 'bg-gray-300 text-gray-400 cursor-not-allowed mt-8 w-full py-4 rounded'
              : 'bg-blue-500 text-white mt-8 w-full py-4 rounded'
          }
          onClick={handleSubmit}
        >
          <div>
            <p className='text-base leading-4'>Ordenar Productos </p>
          </div>
        </button>
        {!state?.auth?.user && (
          <div className='mt-4'>
            <p className='text-base leading-4 text-center text-red-500'>
              Debes iniciar sesión para poder ordenar
              <spa>
                <Link href='/login' className='text-blue-500 mx-10'>
                  Iniciar sesión
                </Link>
              </spa>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
