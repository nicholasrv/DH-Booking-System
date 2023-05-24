import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.css'

export function ToggleMenu() {
  const [openMenu, setOpenMenu] = useState(false)
  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <>
      <button
        onClick={toggleMenu}
        className={styles.buttonHamburguer + " " + (openMenu ? styles.buttonHamburguerFixed : "")}
      >
        {openMenu ? (
          <FontAwesomeIcon icon={faXmark} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </button>
      {openMenu ? (
        <div className={`${styles.menuMobile}`}>
          <div>
            <h1>MENU</h1>
            <button>
              <Link to={'/register'}>Criar conta</Link>
            </button>
            <button>
              <Link to={'/login'}>Fazer login</Link>
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}


