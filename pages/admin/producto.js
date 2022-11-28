import { useEffect, useState } from 'react'
import Modal from '../../components/modal/modal'
import {
  createProduct,
  getProductById,
  getProducts
} from '../../services/producto'

function producto () {
  const [productos, setProductos] = useState([])
  const [dataModal, setDataModal] = useState({
    dataModal: null,
    open: false
  })
  useEffect(() => {
    try {
      obtainProducts()
    } catch (error) {
      console.log(error)
    }
  }, [dataModal])

  const obtainProducts = async () => {
    try {
      const data = await getProducts()
      setProductos(data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleEdit = async id => {
    try {
      const data = await getProductById(id)
      setDataModal({
        dataModal: data,
        open: true
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleCreate = () => {
    setDataModal({
      dataModal: null,
      open: true
    })
  }
  if (dataModal.open) {
    return <Modal dataModal={dataModal} setDataModal={setDataModal} />
  }

  return (
    <div className='flex flex-col m-20 '>
      <h1 className='text-center text-3xl font-bold text-gray-700 mb-4'>
        Lista de productos
      </h1>
      <div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleCreate}
        >
          Agregar Producto
        </button>
      </div>
      <div className='flex justify-center'>
        <div className='w-full '>
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            {/* header de la tabla con divs */}
            <div className='grid grid-cols-5 shadow-sm py-4 px-5'>
              <div className='font-bold'>Nombre</div>
              <div className='font-bold'>Precio</div>
              <div className='font-bold'>Descripcion</div>
              <div className='font-bold'>Imagen</div>
              <div className='font-bold'>Acciones</div>
            </div>
            {/* cuerpo de la tabla con divs */}
            <div className=''>
              {productos.map(producto => (
                <div className='grid grid-cols-5 h10 p-4' key={producto.id}>
                  <div>{producto.nombre}</div>
                  <div>{producto.precio}</div>
                  <div>{producto.descripcion}</div>
                  <div>
                    <img
                      className='w-10 h-10 rounded-full'
                      src={producto.imagen}
                      alt=''
                    />
                  </div>
                  <div className='space-x-3'>
                    <button
                      onClick={() => handleEdit(producto.id)}
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                      Editar
                    </button>
                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default producto
