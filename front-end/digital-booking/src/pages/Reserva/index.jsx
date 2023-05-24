import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../service/api'

import { Calender } from '../../components/Calender'
import { Policy } from '../../components/Policy'
import HeaderDetails from '../../components/HeaderDetails'
import { Loading } from '../../components/Loading'

import { AuthContext } from '../../context/AuthContext'
import { ProductContext } from '../../context/ProductContext'
import { ReservationContext } from '../../context/ReservationContext'

import ptBR from 'date-fns/locale/pt-BR'
import { format } from 'date-fns'

import { ToastContainer, toast } from 'react-toastify'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faLocationDot } from '@fortawesome/free-solid-svg-icons'

import style from './style.module.css'

export function Reserva() {
  const { startDate, endDate, onChangeDates, setDataReserva } =
    useContext(ReservationContext)

  const { newProduct } = useContext(ProductContext)
  const { user } = useContext(AuthContext)
  console.log(user)
  const navigate = useNavigate()

  const [cidade, setCidade] = useState('')
  const [hora, setHora] = useState('')
  const [loading, setLoading] = useState(false)

  //Formata datas
  function datesFormatted(date) {
    const newDateFormatted = format(new Date(date), `dd'-'MM'-'yyyy`, {
      locale: ptBR
    })

    return newDateFormatted
  }

  function handleSubmit(event) {
    event.preventDefault()
    // setLoading(true)
    reserve()
  }

  async function reserve() {
    // setRemoveLoading(false)
    const data = {
      dataCheckIn: datesFormatted(startDate),
      dataCheckOut: datesFormatted(endDate),
      horaInicioReserva: hora,
      produtos: {
        id: newProduct.id
      },
      usuario: {
        id: user.id,
        role: 'USER'
      }
    }
    console.log(data)

    if (cidade == '') {
      alert('Preencha o campo cidade')
      return
    }

    if (hora == '') {
      alert('Preencha o horario de chegada')
      return
    }

    if (startDate == null) {
      alert('Selecione as datas que deseja reservar')
      return
    }

    try {
      //TODO: Implementação da Reserva //
      await api
        .post('reservas/salvar', data, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        .then((result) => {
          if (result.status == 200) {
            console.log(result.data)

            //Salvando dados da reserva
            setDataReserva(result.data)
            toast('Reserva efetuada!!! ', { type: 'success', autoClose: 2000 })
            // setRemoveLoading(true)
            navigate('/sucesso')
          }
        })
    } catch (error) {
      toast('Infelizmente, a reserva não pôde ser completada.', {
        type: 'error',
        autoClose: 2000
      })
    }
  }

  return (
    <>
      <HeaderDetails />

      <form
        action=""
        className={style.reservaContainer}
        onSubmit={handleSubmit}
      >
        <section className={style.mainContainer}>
          <div className={style.formReserva}>
            <h2>Complete seus dados</h2>
            <div className={style.formContent}>
              <div className={style.formBox}>
                <div className={style.groupInput}>
                  <label htmlFor="">Nome</label>
                  <input type="text" value={user.name} disabled />

                  <label htmlFor="">Sobrenome</label>
                  <input type="text" value={user.name} disabled />
                </div>

                <div className={style.groupInput}>
                  <label htmlFor="">E-mail</label>
                  <input type="email" value="email@digitalhouse.com" disabled />

                  <label htmlFor="">Cidade</label>
                  <input
                    type="text"
                    value={cidade}
                    className={style.lastInput}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </div>
              </div>

              <div className={style.dataReserva}>
                <h2>Selecione sua data de reserva</h2>

                <Calender
                  onChangeDates={onChangeDates}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>

              <div className={style.horarioChegada}>
                <h2>Seu horário de chegada</h2>

                <div className={style.contentChegada}>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    size="lg"
                    style={{ color: '#4de080' }}
                  />
                  <p>
                    Seu quarto estará pronto para check-in entre 12:00 e 14:00
                  </p>

                  <div className={style.inputTime}>
                    <p>Indique a sua hora prevista de chegada</p>
                    <div className={style.iconSelect}>
                      <select
                        defaultValue={'DEFAULT'}
                        onChange={(e) => setHora(e.target.value)}
                      >
                        <option value="DEFAULT" disabled>
                          Selecione sua hora de chegada
                        </option>
                        <option value="18-04-2023 00:00:00">00:00 AM</option>
                        <option value="18-04-2023 01:00:00">01:00 AM</option>
                        <option value="18-04-2023 02:00:00">02:00 AM</option>
                        <option value="18-04-2023 03:00:00">03:00 AM</option>
                        <option value="18-04-2023 04:00:00">04:00 AM</option>
                        <option value="18-04-2023 05:00:00">05:00 AM</option>
                        <option value="18-04-2023 06:00:00">06:00 AM</option>
                        <option value="18-04-2023 07:00:00">07:00 AM</option>
                        <option value="18-04-2023 08:00:00">08:00 AM</option>
                        <option value="18-04-2023 09:00:00">09:00 AM</option>
                        <option value="18-04-2023 10:00:00">10:00 AM</option>
                        <option value="18-04-2023 11:00:00">11:00 AM</option>
                        <option value="18-04-2023 12:00:00">12:00 AM</option>
                        <option value="18-04-2023 13:00:00">13:00 PM</option>
                        <option value="18-04-2023 14:00:00">14:00 PM</option>
                        <option value="18-04-2023 15:00:00">15:00 PM</option>
                        <option value="18-04-2023 16:00:00">16:00 PM</option>
                        <option value="18-04-2023 17:00:00">17:00 PM</option>
                        <option value="18-04-2023 18:00:00">18:00 PM</option>
                        <option value="18-04-2023 19:00:00">19:00 PM</option>
                        <option value="18-04-2023 20:00:00">20:00 PM</option>
                        <option value="18-04-2023 21:00:00">21:00 PM</option>
                        <option value="18-04-2023 22:00:00">22:00 PM</option>
                        <option value="18-04-2023 23:00:00">23:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={style.sidebarContainer}>
          <div className={style.sidebarContent}>
            <h1>Detalhe da reserva</h1>

            {newProduct.length != 0 &&
              <img src={newProduct.imagens[0].urlImagem} alt="" />
            }

            <div className={style.sidebarText}>
              {newProduct.length != 0 && (
                <>
                  <h3>{newProduct.categoria.descricaoCategoria}</h3>

                  <h2>{newProduct.nomeProduto}</h2>

                  <span>⭐⭐⭐⭐⭐</span>

                  <div className={style.addressHotel}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p>{newProduct.endereco}</p>
                  </div>
                </>
              )}
            </div>

            <div className={style.checkInOut}>
              <div>
                <p>Check-in</p>
                {startDate !== null ? (
                  <span>{datesFormatted(startDate)}</span>
                ) : (
                  <span>___ /___ /______</span>
                )}
              </div>
              <div>
                <p>Check-out</p>
                {endDate !== null ? (
                  <span>{datesFormatted(endDate)}</span>
                ) : (
                  <span>___ /___ /______</span>
                )}
              </div>
            </div>

            <div className={style.buttonSubmit}>
              <button type="submit">Confirmar reserva</button>

              {loading && <Loading />}
            </div>
          </div>
        </section>
      </form>

      <section className={style.policyContainer}>
        <div className={style.policyContent}>
          <Policy />
        </div>
      </section>

      <ToastContainer />
    </>
  )
}
