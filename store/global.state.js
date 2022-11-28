import { createContext, useEffect, useReducer } from 'react'
import { reducers } from './reducers'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, auth: {}, modal: {}, carrito: [] }
  const [state, dispatch] = useReducer(reducers, initialState)

  useEffect(() => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    const user = localStorage.getItem('user')
    if (user) {
      dispatch({ type: 'AUTH', payload: { user: JSON.parse(user) } })
      dispatch({ type: 'NOTIFY', payload: { loading: false } })
    }
    dispatch({ type: 'NOTIFY', payload: { loading: false } })
  }, [])

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  )
}
