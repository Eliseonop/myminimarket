import { useContext, useEffect, useState } from 'react'
import { PerfilLayout } from '../../components/user/PerfilLayout'
import { getOrders } from '../../services/order.service'
import { DataContext } from '../../store/global.state'

export default function pedidos () {
  const [pedidos, setPedidos] = useState([])
  const [status, setStatus] = useState('')

  
  
  useEffect(() => {
    const {id} =   JSON.parse(localStorage.getItem('user'))
    console.log(id)
    getOrdersAsync(id)
  }, [])

  const getOrdersAsync = async (id) => {
    try {
      const data = await getOrders()
      const dataOfUser = data.filter(order => order.user.id === id)
      setPedidos(dataOfUser)
    } catch (error) {
      console.log(error)
    }
  }
  const statusSpan = status => {
    switch (status) {
      case 'PENDING':
        return (
          <span className='bg-yellow-500 text-white px-2 py-1 rounded-full'>
            Pendiente
          </span>
        )
      case 'CANCELLED':
        return (
          <span className='bg-red-500 text-white px-2 py-1 rounded-full'>
            Cancelado
          </span>
        )
      case 'COMPLETED':
        return (
          <span className='bg-green-500 text-white px-2 py-1 rounded-full'>
            Completado
          </span>
        )
      default:
        return (
          <span className='bg-yellow-500 text-white px-2 py-1 rounded-full'>
            Pendiente
          </span>
        )
    }
  }
  return (
    <PerfilLayout>
      <div className='flex flex-col'>
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden '>
              <table className='min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700'>
                <thead className='bg-gray-100 dark:bg-gray-700'>
                  <tr>
                    <th scope='col' className='p-4'>
                      <div className='flex items-center'>
                        <label  className='sr-only'>
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th
                      scope='col'
                      className='py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400'
                    >
                      Nombre de Productos
                    </th>
                    <th
                      scope='col'
                      className='py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400'
                    >
                      Total
                    </th>
                    <th
                      scope='col'
                      className='py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400'
                    >
                      Cantidad
                    </th>
                    <th
                      scope='col'
                      className='py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400'
                    >
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                  {pedidos.map((pedido, index) => (
                    <tr className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                      <td className='p-4 w-4'>
                        <div className='flex items-center'></div>
                      </td>
                      <td className='flex py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                        {pedido.products.map((product, index) => (
                          <span key={index}>{product.name},</span>
                        ))}
                      </td>
                      <td className='py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white'>
                        s/ {pedido.total}
                      </td>
                      <td className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                        {pedido.direction}
                      </td>
                      <td className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                        {statusSpan(pedido.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PerfilLayout>
  )
}
