function Loading () {
  return (
    <div className='z-20 fixed top-0 flex w-[100vw] h-[100vh] bg-blur-md  backdrop-opacity-10 backdrop-invert bg-white/40 justify-center  p-6'>
      <div className='absolute bg-black opacity-80 inset-0 z-0'></div>
      <div className='w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white '>
        <div className='flex justify-center items-center my-20'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
        </div>
        <p>
          <span className='text-2xl font-bold'>Cargando...</span>
        </p>
      </div>
    </div>
  )
}
export default Loading
