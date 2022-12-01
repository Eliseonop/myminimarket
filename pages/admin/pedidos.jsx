import { useEffect, useState } from 'react'
import { getOrders, updateOrder } from '../../services/order.service'

function pedidos () {
  const [pedidos, setPedidos] = useState([])
  const [status, setStatus] = useState('')

  function handleStatusChange (pedido, e) {
    setStatus(e.target.value)
    updatePedidos(pedido, e.target.value)
    console.log(status)
  }

  const updatePedidos = async (pedido, STATUS) => {
    try {
      console.log(pedido)
      const data = await updateOrder({
        ...pedido,
        status: STATUS
      })
      getOrdersAsync()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrdersAsync()
  }, [])

  const getOrdersAsync = async () => {
    try {
      const data = await getOrders()
      setPedidos(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
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
    // tabla con la lista de pedidos
    <>
      <div className='flex flex-col md:m-20 '>
        <h4 className=' text-xl font-bold text-gray-700 mb-4'>
          Lista de pedidos
        </h4>

        <div className='flex justify-center  '>
          <div className='w-full '>
            <div className='bg-white relative shadow-lg rounded px-8 pt-6 pb-8 mb-4 max-h-[90vh]  '>
              {/* header de la tabla con divs */}
              <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7   shadow-sm py-4 px-5'>
                <div className='font-bold'>Email</div>
                <div className='font-bold hidden sm:block'>Direccion</div>
                <div className='font-bold'>Productos</div>
                <div className='font-bold hidden sm:block'>Total</div>
                <div className='font-bold hidden sm:block'>Estado</div>
                <div className='font-bold'>Acciones</div>
              </div>
              {/* cuerpo de la tabla con divs */}
              <div className='space-y-3 overflow-y-auto max-h-[60vh]'>
                {pedidos.map(pedido => (
                  <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 max-h-30 p-4 border '>
                    <div>{pedido?.user?.email}</div>
                    <div className='hidden sm:block'>{pedido?.direction}</div>
                    <div className='overflow-y-auto h-20'>
                      {pedido?.products?.map(producto => {
                        return <div className='font-bold'>{producto?.name}</div>
                      })}
                    </div>

                    <div className='hidden sm:block'>{pedido?.total}</div>
                    <div className='hidden sm:block'>
                      {statusSpan(pedido?.status)}
                    </div>

                    <div className='block  mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 '>
                      {' '}
                      <select
                        className=' bg-gray-100  border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 border '
                        name='status'
                        defaultValue={status}
                        onChange={e => handleStatusChange(pedido, e)}
                        className='browser-default custom-select'
                      >
                        <option selected value='PENDING'>
                          PENDING
                        </option>
                        <option value='CANCELLED'>CANCELLED</option>
                        <option value='COMPLETED'>COMPLETED</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default pedidos
