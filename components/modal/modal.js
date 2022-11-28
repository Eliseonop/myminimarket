import { useEffect, useState } from 'react'
import { createProduct, updateProduct } from '../../services/producto'

export default function Modal ({ dataModal, setDataModal }) {
  const [values, setValues] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!dataModal.dataModal) {
      try {
        const data = await createProduct({
          nombre: values.nombre,
          precio: +values.precio,
          descripcion: values.descripcion,
          imagen: values.imagen
        })
        setDataModal({
          dataModal: null,
          open: false
        })
      } catch (error) {
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
      <div className='block  w-full md:w-2/3 xl:w-1/3 absolute z-20 bg-white p-7 border rounded-lg'>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-2xl'>Agregar Producto</h2>
          <div className='cursor-pointer' onClick={() => setDataModal(null)}>
            xX
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
