import React from 'react'

const StoreContext = React.createContext()

export function useStoreContext() {
    return React.useContext(StoreContext)
}

export default StoreContext
