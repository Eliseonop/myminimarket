import { useEffect, useState } from 'react'
import { getUsers } from '../../services/user.service'

export default function clientes () {
  const [clientes, setClientes] = useState([])

  const obtainClientsAsync = async () => {
    try {
      const data = await getUsers()

      setClientes(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obtainClientsAsync()
  }, [])

  return (
    <div>
      <h1 className='text-2xl text-gray-800 font-light'>Mis Clientes</h1>
      {clientes.length > 0 ? (
        <div className=''>
          <table className='table-auto shadow-md mt-10 w-full w-lg'>
            <thead className='bg-gray-800'>
              <tr className='text-white'>
                <th className='w-1/5 py-2'>Nombre</th>
                <th className='w-1/5 py-2'>Email</th>
                <th className='w-1/5 py-2'>Documento</th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {clientes.map(cliente => (
                <tr key={cliente.id}>
                  <td className='border px-4 py-2'>{cliente.name}</td>
                  <td className='border px-4 py-2'>{cliente.email}</td>
                  <td className='border px-4 py-2'>{cliente.document}</td>
                </tr>
              ))}{' '}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}
