import { deleteProduct } from '../services/producto.service'

function Delete ({ producto, setEliminar, eliminar }) {
  const handleDelete = async () => {
    try {
      await deleteProduct(producto.id)
      setEliminar({
        producto: null,
        open: false
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleClose = () => {
    setEliminar({
      producto: null,
      open: false
    })
  }

  return (
    <div
      className={
        eliminar.open
          ? 'fixed top-0 flex w-[100vw] h-[100vh] bg-blur-md z-10 backdrop-opacity-10 backdrop-invert bg-white/40 justify-center  p-6'
          : 'hidden'
      }
    >
      <div className='absolute bg-black opacity-80 inset-0 z-0'></div>
      <div className='w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white '>
        <div className=''>
          <div className='text-center p-5 flex-auto justify-center'>
            {/* imagen */}
            <img
              src={producto ? producto.image : ''}
              alt='imagen'
              className='w-20 h-20 mx-auto '
            />
            <h2 className='text-xl font-bold py-4 '>
              Seguro que deseas Eliminar?
            </h2>
            <p className='text-xl text-gray-500 px-8'>
              Esta accion no se puede deshacer al darle click en eliminar se
              borrara el producto:{' '}
              <span className='font-bold'>{producto.name}</span> de forma
              permanente
            </p>
          </div>
          <div className='p-3  mt-2 text-center space-x-4 md:block'>
            <button
              className='mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100'
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button
              className='mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600'
              onClick={handleDelete}
            >
              eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Delete
