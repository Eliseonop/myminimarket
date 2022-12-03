import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { PerfilLayout } from '../../components/user/PerfilLayout'
import { updateUser } from '../../services/user.service'
import { DataContext } from '../../store/global.state'

function perfil ({ children }) {
  const [info, setInfo] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const [state, dispatch] = useContext(DataContext)
  const router = useRouter()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      router.push('/login')
    } else {
      setInfo({
        ...info,
        name: user.name,
        email: user.email
      })
    }
  }, [])

  const updateInfoAsync = async () => {
    try {
      dispatch({ type: 'NOTIFY', payload: { loading: true } })
      const user = JSON.parse(localStorage.getItem('user'))
      const { id } = user
      const { name, password } = info
      console.log(info)
      const newUser = await updateUser({
        id,
        name,
        password
      })

      localStorage.setItem('user', JSON.stringify(newUser.data))
      dispatch({ type: 'AUTH', payload: { user: newUser.data } })
      dispatch({ type: 'NOTIFY', payload: { loading: false } })
      // recargar la pagina
      router.push('/perfil')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = e => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }

  return (
    <PerfilLayout>
      <div>
        <div className='m-6 space-y-3'>
          <div className='my-3 max-w-md '>
            <label htmlFor='nombre'>Nombre</label>
            <input
              type='text'
              name='name'
              id='nombre'
              className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              value={info.name}
              onChange={handleChange}
            />
          </div>
          <div className='my-3 max-w-md '>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              value={info.email}
              disabled
            />
          </div>
          <div className='my-3 max-w-md '>
            <label htmlFor='password'>Contraseña</label>
            <input
              type='password'
              name='password'
              id='password'
              className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              value={info.password}
              onChange={handleChange}
            />

            <div className='my-3 max-w-md '>
              <label htmlFor='password2'>Confirmar Contraseña</label>
              <input
                type='password'
                name='password2'
                id='password2'
                className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                value={info.password2}
                onChange={handleChange}
              />
              {info.password !== info.password2 ? (
                <p className='text-red-500'>Las contraseñas no coinciden</p>
              ) : (
                <span></span>
              )}
            </div>
          </div>
          {/* button update */}
          <div className='my-3 max-w-md '>
            <button
              type='submit'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              onClick={updateInfoAsync}
            >
              Actualizar Información
            </button>
          </div>
        </div>
      </div>
    </PerfilLayout>
  )
}
export default perfil
