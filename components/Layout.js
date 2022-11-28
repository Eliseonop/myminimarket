import { useContext } from 'react'
import { DataContext } from '../store/global.state'
import Loading from './Loading'
import { Navbar } from './Navbar'

export function Layout ({ children }) {
  const [state, dispatch] = useContext(DataContext)
  const { notify } = state

  return (
    <div>
      <Navbar />
      {notify.loading ? <Loading /> :  children }
    </div>
  )
}
