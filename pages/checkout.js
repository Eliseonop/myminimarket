import { useContext, useState } from 'react'
import { DataContext } from '../store/global.state'

export default function checkout () {
  const [state, dispatch] = useContext(DataContext)

  const { carrito, auth } = state

  const [values, setValues] = useState({
    nombre: '',
    email: '',
    direccion: '',
    ciudad: '',
    tarjeta: '',
    cvv: '',
    fecha: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(values)
  }

  const informationCart = {
    cantidad: carrito.reduce((a, b) => a + b.cantidad, 0),
    total: carrito.reduce((a, b) => a + b.precio * b.cantidad, 0)
  }

  return (
    // formulario checkout
    <section className='flex items-center justify-center py-10'>
      <div className='p-8 bg-gray-100 dark:bg-gray-800 flex flex-col lg:w-full xl:w-3/5'>
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
        <label className='mt-8 text-base leading-4 text-gray-800 dark:text-gray-50'>
          Tarjeta
        </label>
        <div className='mt-2 flex-col'>
          <div>
            <input
              name='tarjeta'
              value={values.tarjeta}
              onChange={handleInputChange}
              className='border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600'
              type='email'
              placeholder='0000 1234 6549 15151'
            />
          </div>
          <div className='flex-row flex'>
            <input
              className='border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600'
              name='fecha'
              placeholder='MM/YY'
              value={values.fecha}
              onChange={handleInputChange}
            />
            <input
              className='border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600'
              type='email'
              name='cvv'
              id=''
              placeholder='CVC'
              value={values.cvv}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <label className='mt-8 text-base leading-4 text-gray-800 dark:text-gray-50'>
          Nombre del propietario
        </label>
        <div className='mt-2 flex-col'>
          <div>
            <input
              className='border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600'
              type='email'
              name='nombre'
              placeholder='Juan Perez'
              value={values.nombre}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <label className='mt-8 text-base leading-4 text-gray-800 dark:text-gray-50'>
          Ciudad y region
        </label>
        <div className='mt-2 flex-col'>
          <input
            value={values.ciudad}
            onChange={handleInputChange}
            className='border rounded-bl rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600'
            type='text'
            name='ciudad'
            placeholder='lima-peru, av. los incas 123'
          />
        </div>

        <button className='mt-8 border border-transparent hover:border-gray-300 dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:hover:text-white dark:border-transparent bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full'>
          <div>
            <p className='text-base leading-4'>Pagar </p>
          </div>
        </button>
      </div>
    </section>
  )
}
