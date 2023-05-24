import { createContext, useState } from 'react'

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [newProduct, setNewProduct] = useState([])

  return (
    <ProductContext.Provider 
			value={{ newProduct, setNewProduct }}>
      {children}
    </ProductContext.Provider>
  )
}
