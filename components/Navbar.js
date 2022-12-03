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

  // rutas privadas
  const privateRoutes = [
    { path: '/perfil', name: 'Perfil' },
    { path: '/pedidos', name: 'Pedidos' },
    { path: '/checkout', name: 'pagar' }
  ]
  // si el pathname es igual a uno de los path de privateRoutes, entonces es privado
  const isPrivate = privateRoutes.find(route => route.path === router.pathname)

  useEffect(() => {
    if (isPrivate && !auth.user) {
       router.push('/login')
    }
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

  const handleLogout = () => {
    dispatch({ type: 'AUTH', payload: {} })
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    // navbar ecommer with tailwidns
    <div className='flex flex-col md:h-[8vh]  md:flex-row justify-around p-5   shadow bg-white items-center'>
      <div>
        <h1 className='font-bold text-xl'>Mi Minimarket</h1>
      </div>

      <div
        className={
          showMenu ? 'block md:block h-full md:h-9 ' : 'hidden md:block'
        }
      >
        <ul className='flex flex-col space-y-6 mt-10 items-center md:mt-0 md:space-y-0 md:flex-row md:space-x-11 md:font-medium md:items-center'>
          <li>
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
          </li>

          <li>
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
                  {carrito.map(item => item.cantidad).reduce((a, b) => a + b)}
                </span>
              )}
              Carrito
            </Link>
          </li>
          <li>
            {auth?.user ? (
              <div
                className='flex flex-col sm:flex-row   sm:space-y-0 sm:block md:px-7 relative'
                ref={ref}
              >
                <div className='flex flex-col sm:flex-row gap-5 items-center justify-center sm:space-x-4'>
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
                    onClick={() => handleLogout()}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex flex-col sm:flex-row   sm:space-y-0 sm:block md:px-7 relative'>
                <div className='flex flex-col sm:flex-row gap-5 items-center justify-center sm:space-x-4'>
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
              </div>
            )}
          </li>
        </ul>
      </div>
      <div
        className='block md:hidden absolute left-5 top-5 cursor-pointer '
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? (
          <>
            <svg
              className=' h-6 w-6'
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
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
