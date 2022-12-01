import { useEffect, useState } from 'react'
import { createProduct, updateProduct } from '../../services/producto.service'
import Loading from '../../components/Loading'

export default function Modal ({ dataModal, setDataModal }) {
  const [values, setValues] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    stock: ''
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
          name: values.name,
          price: +values.price,
          description: values.description,
          image: values.image,
          stock: +values.stock
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
    <>
      {loading && <Loading />}

      <div
        className={
          dataModal.open
            ? 'fixed flex w-screen top-0 h-[100vh] bg-blur-md z-10 backdrop-opacity-10 backdrop-invert bg-white/40 justify-center pt-32 '
            : 'hidden'
        }
      >
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
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />

            <label>Precio</label>
            <input
              className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-72 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
              required
              type='number'
              name='price'
              value={values.price}
              onChange={handleInputChange}
            />

            <div>
              <label>Descripcion</label>
              <input
                className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full  h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
                required
                type='text'
                name='description'
                value={values.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Imagen URL</label>
              <input
                className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
                required
                type='text'
                name='image'
                value={values.image}
                onChange={handleInputChange}
              />
            </div>
            <label>Stock</label>
            <input
              className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-72 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
              required
              type='number'
              name='stock'
              value={values.stock}
              onChange={handleInputChange}
            />

            {/* stock */}

            {error.state && <p className='text-red-500'>{error.error}</p>}
            <button
              type='submit'
              className='w-[250px] mt-5 bg-indigo-500 py-3 px-5 rounded-md shadow-lg'
            >
              {dataModal.dataModal ? 'Actualizar' : 'Agregar'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
