import { NavLink, useNavigate } from 'react-router-dom'
import { ToggleMenu } from '../ToggleMenu'
import { useContext, useEffect } from 'react'
import styles from './styles.module.css'
import logo1 from '../../assets/logo1.svg'
import { AuthContext } from '../../context/AuthContext'

export function Header() {
  const { 
    user, 
    getUserLocalStorage, 
    logout, 
    isLogged, 
    toggleIsLogged 
  } = useContext(AuthContext)

  const navigate = useNavigate()

  // Função para lidar com o logout do usuárioloca
  function handleLogout() {
    logout()
    toggleIsLogged() // Altera o estado de logado
    navigate('/')
    window.location.reload()
  }

  useEffect(() => {
    getUserLocalStorage()
  }, [])

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.headerImg}>
          <NavLink to="/" end title="Home">
            <img src={logo1} alt="" />
          </NavLink>
          <p>Digital Booking</p>
        </div>
        <ToggleMenu />

        {isLogged ? (
          <div className={styles.headerButtons}>
            {user && <span>Olá {user.name}!</span>}
            <NavLink to="/cadastrar-produto">
              <button>Gerenciar</button>
            </NavLink>
            <button onClick={handleLogout}>Sair</button>
          </div>
        ) : (
          <div className={styles.headerButtons}>
            <NavLink to="/register" end title="Criar conta">
              <button>Criar conta</button>
            </NavLink>
            <NavLink to="/login" end title="Iniciar sessão">
              <button>Iniciar sessão</button>
            </NavLink>
          </div>
        )}
      </div>
    </>
  )
}
