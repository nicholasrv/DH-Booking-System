import { useRef, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { checkEmail, checkPassword } from '../../Scripts/validateForm'

import styles from './styles.module.css'
import { ToastContainer, toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'

export function Login() {
  const { authenticate } = useContext(AuthContext);
  const passwRef = useRef()
  const iconRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate()

  // Gerenciamento de erros do formulário com useState
  const [passwordError, setPasswordError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
   
    onFinish(email, password)
  }  

  const showHide = () => {
    if (passwRef.current.type === 'password') {
      passwRef.current.type = 'text'
      iconRef.current.className = `${styles.hide}`
    } else {
      passwRef.current.type = 'password'
      iconRef.current.className = ''
    }
  }

  async function onFinish(email, password) {
    try {
      const isEmailValid = checkEmail(email)
      const isPasswordValid = checkPassword(passwRef.current.value)

      setEmailError(!isEmailValid)
      setPasswordError(!isPasswordValid)   

      await authenticate(email, password)
      toast('Bem-vindo, ', {type: "success", autoClose: 2000})
      navigate('/')
    } catch (error) {
      toast('Erro ao tentar logar ' + error, {type: "error", autoClose: 2000})
    }
  }

  return (
    <>
      <div className={styles.login}>
        <h1>Iniciar sessão</h1>
        <form action="">
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              className={emailError ? 'border-error' : ''}
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.loginpassword}>
            <label htmlFor="password">Senha</label>
            <input
              className={passwordError ? 'border-error' : ''}
              ref={passwRef}
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div ref={iconRef} id={styles.icon} onClick={showHide}></div>
          </div>

          <div>
            <button type="submit" onClick={handleSubmit}>
              Iniciar
            </button>
            <span>
              Não é cadastrado? <Link to="/register">Criar conta</Link>
            </span>
          </div>
        </form>
        {passwordError || emailError ? (
          <div className={styles.containerError}>
            <ul>
              {emailError ? <li> * E-mail digitado não é válido</li> : ''}
              {passwordError ? (
                <li>* A senha deve ter mais de seis caracteres.</li>
              ) : (
                ''
              )}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
      <ToastContainer />
    </>
  )
}
