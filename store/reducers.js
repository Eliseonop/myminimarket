import { ACTIONS } from './actions'

export const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload
      }
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload
      }

    case ACTIONS.MODAL:
      return {
        ...state,
        modal: action.payload
      }

    case ACTIONS.CARRITO:
      return {
        ...state,
        carrito: action.payload
      }

    default:
      return state
  }
}
