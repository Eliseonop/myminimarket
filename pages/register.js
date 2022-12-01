import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { authRegister } from '../services/user.service'
import { DataContext } from '../store/global.state'

export default function Register () {
  const initialState = {
    name: '',
    email: '',
    document: '',
    password: '',
    cfpassword: ''
  }
  const [state, dispatch] = useContext(DataContext)
  const [values, setValues] = useState(initialState)

  const router = useRouter()

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    try {
      const dataUser = await authRegister(values)
      dispatch({ type: 'NOTIFY', payload: { loading: false } })

      router.push('/login')
    } catch (error) {
      console.log(error)
      dispatch({ type: 'NOTIFY', payload: { error: error?.response?.data } })
    }
  }
  const buttonDisabled =
    values.name.length === 0 ||
    values.email.length === 0 ||
    values.password.length === 0 ||
    values.cfpassword.length === 0 ||
    values.password !== values.cfpassword

  return (
    <div className=''>
      <Head>
        <title>Register</title>
      </Head>

      {/* formulario de registro minimalista con tailwinds */}
      <div className='flex items-center justify-center my-20 md:my-48  '>
        <div className='w-full max-w-xs'>
          <form
            onSubmit={handleSubmit}
            className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          >
            {/* nombre */}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='name'
              >
                Nombre
              </label>
              <input
                required
                name='name'
                onChange={handleInputChange}
                value={values.name}
                className='shadow appearance-none border focus:border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='name'
                type='text'
                placeholder='Nombre'
              />
            </div>
            {/* apellido */}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='username'
              >
                Email
              </label>
              <input
                required
                name='email'
                onChange={handleInputChange}
                value={values.email}
                className='shadow appearance-none border focus:border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                type='email'
                placeholder='email@example.com'
              />
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='username'
              >
                Documento
              </label>
              <input
                required
                name='document'
                maxLength={8}
                onChange={handleInputChange}
                value={values.document}
                className='shadow appearance-none border focus:border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='71275435'
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='password'
              >
                Contraseña
              </label>
              <input
                required
                name='password'
                onChange={handleInputChange}
                value={values.password}
                className='shadow appearance-none border focus:border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                type='password'
                placeholder='******************'
              />
            </div>
            {/* confirm password */}
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='cfpassword'
              >
                Confirmar Contraseña
              </label>
              <input
                required
                name='cfpassword'
                onChange={handleInputChange}
                value={values.cfpassword}
                className='shadow appearance-none border focus:border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='cfpassword'
                type='password'
                placeholder='******************'
              />
            </div>
            {/* error nor password equals */}
            <div className='mb-6'>
              {values.password !== values.cfpassword &&
                values.cfpassword.length > 0 && (
                  <p className='text-red-500 text-xs italic'>
                    Las contraseñas no coinciden.
                  </p>
                )}
            </div>

            <div className='flex items-center justify-between'>
              <button
                disabled={buttonDisabled}
                className={
                  buttonDisabled
                    ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                }
                type='submit'
              >
                Registrarse
              </button>
              <Link
                href='/login'
                className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
              >
                Ya tienes cuenta?
              </Link>
            </div>
          </form>
          <p className='text-center text-gray-500 text-xs'>
            &copy;2022 titanicsoft. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
