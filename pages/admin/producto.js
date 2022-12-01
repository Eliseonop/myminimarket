import { useEffect, useState } from 'react'
import Delete from '../../components/Delete'
import Modal from '../../components/modal/modal'
import {
  createProduct,
  getProductById,
  getProducts
} from '../../services/producto.service'

function producto () {
  const [productos, setProductos] = useState([])

  const [eliminar, setEliminar] = useState({
    producto: null,
    open: false
  })

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
  // if (dataModal.open) {
  //   return <Modal dataModal={dataModal} setDataModal={setDataModal} />
  // }
  // if (eliminar.open) {
  //   return
  // }

  return (
    <>
      {dataModal.open && (
        <Modal dataModal={dataModal} setDataModal={setDataModal} />
      )}

      {eliminar.open && (
        <Delete
          producto={eliminar?.producto}
          eliminar={eliminar}
          setEliminar={setEliminar}
        />
      )}
      <div className='flex flex-col md:m-20 '>
        <h4 className=' text-xl font-bold text-gray-700 mb-4'>
          Lista de productos
        </h4>
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
              <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 shadow-sm py-4 px-5'>
                <div className='font-bold'>Nombre</div>
                <div className='font-bold'>Precio</div>
                <div className='font-bold hidden sm:block '>Descripcion</div>
                <div className='font-bold hidden md:block'>Imagen</div>
                <div className='font-bold'>Acciones</div>
              </div>
              {/* cuerpo de la tabla con divs */}
              <div className='space-y-3 overflow-y-auto max-h-[60vh]'>
                {productos.map(producto => (
                  <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 h10 p-4' key={producto.id}>
                    <div>{producto.name}</div>
                    <div>{producto.price}</div>
                    <div className='hidden sm:block'>
                      {producto.description}
                    </div>
                    <div className='hidden md:block'>
                      <img
                        className='w-10 h-10 rounded-full'
                        src={producto.image}
                        alt=''
                      />
                    </div>
                    <div class='md:flex-auto flex flex-col lg:flex-row space-x-0 lg:space-x-3 space-y-3 lg:space-y-0  '>
                      <button
                        onClick={() => handleEdit(producto.id)}
                        class='h-10  hover:bg-black  px-6 font-semibold rounded-md bg-slate-400 text-white'
                        type='submit'
                      >
                        Editar
                      </button>
                      <button
                        class='h-10 px-6 font-semibold rounded-md border hover:bg-red-500 border-slate-200 text-slate-900'
                        type='button'
                        onClick={() =>
                          setEliminar({
                            producto: producto,
                            open: true
                          })
                        }
                      >
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
    </>
  )
}
export default producto
