import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from '../store/global.state'

export function Navbar () {
  const router = useRouter()
  const [state, dispatch] = useContext(DataContext)
  const { auth, carrito } = state
  const [show, setShow] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  // cerrar el menu al darle click afuera
  const ref = useRef()

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // si el usuario hace click afuera del menu
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // cleanup
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [show])

  console.log(router.pathname)

  return (
    // navbar ecommer with tailwidns
    <nav className='bg-white shadow'>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            {/* Mobile menu button*/}
            <button
              onClick={() => setShowMenu(!showMenu)}

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
              <span className='font-bold text-2xl'>
                <Link href='/'>My minimarket</Link>
              </span>
            </div>
            <div className='hidden sm:block sm:ml-6 mx-4 '>
              <div className='flex '>
                {/* Current: "bg-gray-900 text-white", Default: "text-black hover:bg-gray-700 hover:text-white" */}
                <Link
                  href='/'
                  className={
                    router.pathname === '/'
                      ? ' text-white bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold'
                      : 'text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold'
                  }
                >
                  Productos
                </Link>
                {/* <Link
                  href='/promociones'
                  className={
                    router.pathname === '/promociones'
                    ? ' text-white bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold' : 'text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold'
                  }
                >
                  Promociones
                </Link>
                <Link
                  href='/contacto'
                  className='text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold'
                >
                  Contacto
                </Link> */}
                <Link
                  href='/carrito'
                  className={
                    router.pathname === '/carrito'
                      ? ' text-white bg-gray-700 hover:text-white mx-4 px-3 py-2 rounded-md text-sm font-bold'
                      : 'text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold mx-4'
                  }
                >
                  {' '}
                  {carrito.length > 0 && (
                    <span className='bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold'>
                      {carrito
                        .map(item => item.cantidad)
                        .reduce((a, b) => a + b)}
                    </span>
                  )}
                  Carrito
                </Link>
                {auth?.user ? (
                  <div className='hidden sm:block md:px-7 relative' ref={ref}>
                    <div className='flex space-x-4'>
                      <button
                        type='button'
                        onClick={() => setShow(!show)}
                        className={
                          show
                            ? 'text-white bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold'
                            : 'text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold'
                        }
                      >
                        {auth.user.name.toUpperCase()}
                      </button>

                      {show && (
                        <div className='absolute right-14 z-10 w-48 top-10 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <div className='py-1'>
                            <Link
                              href='/perfil'
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            >
                              Perfil
                            </Link>
                            <Link
                              href='/'
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            >
                              Configuración
                            </Link>
                            {auth.user.typeUser === 'ADMIN' && (
                              <>
                                <Link
                                  href='/admin/producto'
                                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                >
                                  Admin Productos
                                </Link>
                                <Link
                                  href='/admin/pedidos'
                                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                >
                                  Admin Pedidos
                                </Link>

                                <Link
                                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                  href='/admin/clientes'
                                >
                                  Clientes
                                </Link>
                              </>
                            )}
                          </div>
                        </div>
                      )}

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
