function OrderCheck ({ setCheck, check }) {
  const handleClose = () => {
    setCheck(false)
  }

  return (
    <div
      className={
        check
          ? 'fixed top-0 flex w-[100vw] h-[100vh] bg-blur-md z-10 backdrop-opacity-10 backdrop-invert bg-white/40 justify-center  p-6'
          : 'hidden'
      }
    >
      <div className='absolute bg-black opacity-80 inset-0 z-0'></div>
      <div className='w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white '>
        <div className=''>
          <div className='text-center p-5 flex-auto justify-center'>
            <h2 className='text-xl font-bold py-4 '>Compra hecha con exito</h2>
          </div>
          <div className='p-3  mt-2 text-center space-x-4 md:block'>
            <button
              className='mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100'
              onClick={handleClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderCheck
