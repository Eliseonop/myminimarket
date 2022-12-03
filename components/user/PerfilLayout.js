import Link from 'next/link'
import { useRouter } from 'next/router'

export const PerfilLayout = ({ children }) => {
  const router = useRouter()

  return (
    <main className='mx-auto max-w-7xl px-3 py-4 sm:py-6 sm:px-6 lg:px-8'>
      <div className='flex h-full flex-col lg:flex-row'>
        <div className='w-full shrink-0 lg:w-1/5 '>
          {/* options perfil nav */}
          <div className='flex flex-col-mt-1 p-10 flex-row items-center md:flex-col pr-2 lg:flex gap-6'>
            <Link
              href='/perfil'
              className=' hidden md:flex flex-col items-center justify-center w-32 h-32 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer'
            >
              foto
            </Link>
            <Link
              href='/perfil/pedidos'
              className={
                router.pathname === '/perfil/pedidos'
                  ? 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold'
                  : 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              }
            >
              Pedidos
            </Link>
            <Link
              href='/perfil/datos'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
            >
              Datos
            </Link>
            <Link
              href='/perfil/direcciones'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
            >
              Direcciones
            </Link>
          </div>
        </div>
        <div className='flex-1 flex flex-col'>{children}</div>
      </div>
    </main>
  )
}
