import { createContext, useContext, useReducer } from 'react'

const AppStateContext = createContext()
const AppDispatchContext = createContext()

export const ACTIONS = {
  WIDGET: {
    POINTER: {
      CHANGE_SELECT: 0x1
    }
  },
  OBJECT_INFO: {
    UPDATE: 0x2,
    CLOSE: 0x3
  }
}

const initialState = {
  widget: {
    pointer: {
      selected: false
    }
  },
  objectInfo: {
    open: false,
    ra: 0,
    dec: 0
  }
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.WIDGET.POINTER.CHANGE_SELECT:
      state.widget.pointer.selected = action.data
      return { ...state }
    case ACTIONS.OBJECT_INFO.UPDATE:
      state.objectInfo = action.data
      state.widget.pointer.selected = false
      return { ...state }
    case ACTIONS.OBJECT_INFO.CLOSE:
      state.objectInfo.open = false
      return { ...state }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  )
}

export function useApp() {
  return [useContext(AppStateContext), useContext(AppDispatchContext)]
}
