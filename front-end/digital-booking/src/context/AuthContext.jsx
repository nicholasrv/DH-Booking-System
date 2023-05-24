import { createContext, useEffect, useState } from 'react'
import api from '../service/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState({
    id: '',
    name: '',
    token: ''
  })

  useEffect(() => {
    const user = getUserLocalStorage()

    if (user) {
      setUser(user)
      setIsLogged(true)
    }
  }, [])

  async function authenticate(email, password) {
    const response = await LoginRequest(email, password)

    const payload = {
      id: response.id,
      name: response.name,
      token: response.token
    }
    setUser({
      id: payload.id,
      name: payload.name,
      token: payload.token
    })
    setIsLogged(true)
    setUserLocalStorage(payload)
  }

  async function LoginRequest(email, password) {
    try {
      const request = await api.post('api/v1/auth/authenticate', {
        email,
        password
      })

      console.log(request.data)
      return request.data
    } catch (error) {
      return null
    }
  }

  function logout() {
    setUser(null)
    setUserLocalStorage(null)
  }

  function setUserLocalStorage(user) {
    localStorage.setItem('DB-BOOKING', JSON.stringify(user))
  }

  function getUserLocalStorage() {
    const json = localStorage.getItem('DB-BOOKING')

    if (!json) {
      return null
    }
    // o token existe, faz a conversão o usuário está autenticado
    const user = JSON.parse(json)

     return user 
  }

  const toggleIsLogged = () => {
    setIsLogged(!isLogged)
  }

  return (
    <AuthContext.Provider
      value={{
        user, 
        setUser,
        authenticate,
        logout,
        getUserLocalStorage,
        isLogged,
        toggleIsLogged
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
