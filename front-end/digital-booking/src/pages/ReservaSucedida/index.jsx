import style from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ReservationContext } from '../../context/ReservationContext'

export function ReservaSucedida() {
  const { dataReserva } = useContext(ReservationContext)
  console.log(dataReserva)
  return (
    <div className={style.container}>
      <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} size="4x" />
      <h1>Muito obrigado!</h1>
      <p>Sua reserva foi feita com sucesso</p>

      <div className={style.contentReserva}>
        <h3>Dados da reserva</h3>
        <div>
          <div className={style.itemReserva}>
            <p>Inicio:</p>
            <span>{dataReserva.dataCheckIn}</span>
          </div>

          <div className={style.itemReserva}>
            <p>Fim:</p>
            <span>{dataReserva.dataCheckOut}</span>
          </div>

          <div className={style.itemReserva}>
            <p>Horario check-in: </p>
            <span>{dataReserva.horaInicioReserva}</span>
          </div>
        </div>
      </div>
      <Link to="/">
        <button>Voltar a página inicial</button>
      </Link>
    </div>
  )
}
