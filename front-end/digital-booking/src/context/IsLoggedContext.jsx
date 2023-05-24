import { createContext, useState } from 'react'
import { useEffect } from 'react'

export const IsLoggedContext = createContext()

export const IsLoggedProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const getToken = localStorage.getItem('token')
		
    if (getToken) {
      // o token existe, o usuário está autenticado
      setIsLogged(true)
      // console.log(userEmalLogged)
    }
  }, [])

  const toggleIsLogged = () => {
    setIsLogged(!isLogged)
  }

  return (
    <IsLoggedContext.Provider 
			value={{ isLogged, toggleIsLogged}}>
      {children}
    </IsLoggedContext.Provider>
  )
}
