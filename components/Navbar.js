import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { DataContext } from '../store/global.state'

export function Navbar () {
  const router = useRouter()
  const [state, dispatch] = useContext(DataContext)
  const { auth } = state

  return (
    // navbar ecommer with tailwidns
    <nav className='bg-white shadow'>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            {/* Mobile menu button*/}
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              {/* Icon when menu is closed. */}
              {/* Menu open: "hidden", Menu closed: "block" */}
              <svg
                className='block h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              {/* Icon when menu is open. */}
              {/* Menu open: "block", Menu closed: "hidden" */}
              <svg
                className='hidden h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='flex-1 flex items-center justify-around space-x-5 '>
            <div className='flex-shrink-0 flex items-center'>
              <span className='font-bold text-2xl'>Mini Market</span>
            </div>
            <div className='hidden sm:block sm:ml-6 mx-4 '>
              <div className='flex '>
                {/* Current: "bg-gray-900 text-white", Default: "text-black hover:bg-gray-700 hover:text-white" */}
                <Link
                  href='/'
                  className=' text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                >
                  Productos
                </Link>
                <Link
                  href='/promociones'
                  className='text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold'
                >
                  Promociones
                </Link>
                <Link
                  href='/contacto'
                  className='text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold'
                >
                  Contacto
                </Link>
                <Link
                  href='/carrito'
                  className='text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold'
                >
                  Carrito
                </Link>
                {auth?.user ? (
                  <div className='hidden sm:block md:px-7 '>
                    <div className='flex space-x-4'>
                      <Link
                        href='/perfil'
                        className='text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      >
                        {auth.user.name.toUpperCase()}
                      </Link>
                      <button
                        className='text-black hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                        onClick={() => {
                          localStorage.removeItem('user')
                          dispatch({ type: 'AUTH', payload: {} })
                        }}
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-3'>
                    <button
                      type='button'
                      className='bg-indigo-600
                        hover:bg-indigo-700
                        text-white px-3 py-2 rounded-md text-sm font-medium'
                    >
                      <Link href='/login'>Iniciar Session</Link>
                    </button>
                    <button
                      type='button'
                      className='bg-amber-400
                        hover:bg-amber-500
                        text-white px-3 py-2 rounded-md text-sm font-medium'
                    >
                      <Link href='/register'>Registrarse</Link>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
