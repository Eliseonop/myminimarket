import { useEffect, useState } from 'react'
import { createProduct, updateProduct } from '../../services/producto'
import Loading from '../../components/Loading'

export default function Modal ({ dataModal, setDataModal }) {
  const [values, setValues] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    error: '',
    state: false
  })
  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    if (!dataModal.dataModal) {
      try {
        const data = await createProduct({
          nombre: values.nombre,
          precio: +values.precio,
          descripcion: values.descripcion,
          imagen: values.imagen
        })
        setLoading(false)
        setDataModal({
          dataModal: null,
          open: false
        })
      } catch (error) {
        setLoading(false)
        setError({
          error: error.message,
          state: true
        })
        console.log(error)
      }
    } else {
      try {
        const data = await updateProduct(values)
        setDataModal({
          dataModal: null,
          open: false
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    if (dataModal.dataModal) {
      setValues(dataModal.dataModal)
    }
  }, [dataModal.dataModal])

  return (
    <div
      className={
        dataModal.open
          ? 'absolute flex w-[100vw] h-[100vh] bg-blur-md z-10 backdrop-opacity-10 backdrop-invert bg-white/40 justify-center  p-6'
          : 'hidden'
      }
    >
      {loading && <Loading />}
      <div className='block  w-full md:w-2/3 xl:w-1/3 absolute z-20 bg-white p-7 border rounded-lg'>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-2xl'>Agregar Producto</h2>
          <div
            className='cursor-pointer'
            onClick={() =>
              setDataModal({
                dataModal: null,
                open: false
              })
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
        </div>
        <form className='  font-bold  m-7' onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-72 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
            required
            type='text'
            name='nombre'
            value={values.nombre}
            onChange={handleInputChange}
          />

          <label>Precio</label>
          <input
            className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-72 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
            required
            type='number'
            name='precio'
            value={values.precio}
            onChange={handleInputChange}
          />

          <div>
            <label>Descripcion</label>
            <input
              className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full  h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
              required
              type='text'
              name='descripcion'
              value={values.descripcion}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Imagen URL</label>
            <input
              className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
              required
              type='text'
              name='imagen'
              value={values.imagen}
              onChange={handleInputChange}
            />
          </div>
            {
              error.state && <p className='text-red-500'>{error.error}</p>
            }
          <button
            type='submit'
            className='w-[250px] mt-5 bg-indigo-500 py-3 px-5 rounded-md shadow-lg'
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  )
}
