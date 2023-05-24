import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBed,
  faCalendarDays,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons'

import './search.css'
import api from '../../service/api'

export function Search() {
  const navigate = useNavigate()
  const [cities, setCities] = useState([])
  const [destination, setDestination] = useState('')
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(null)

  function handleSearch() {
    navigate('/produtos-por-categoria/:categoria')
  }

  async function getCidades() {
    try {
      const response = await api.get('cidades')
      setCities(response.data)
    } catch (error) {
      console.log('Erro ao buscar cidades' + error)
    }
  }

  return (
    <>
      <h1>Digital Booking </h1>
      <div className="headerSearch">
        <div className="headerSearchItem ">
          <FontAwesomeIcon icon={faBed} className="headerIcon" />
          <input
            type="text"
            placeholder="Para onde vamos ?"
            className="headerSearchInput"
            aria-required="false"
            // onChange={(e) => setDestination(e.target.value)}
            onClick={getCidades}
          />
          <div className="citiesContent">
            <ul className="listMode">
              {cities.map((city) => (
                <li className="headerList" value={city.id} key={city.id}>
                  <div className='action-list-item-content'> 
                    <div className="headerListItem">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="headerIcon"
                      />

                      <div className="layout-item-flex truncate">
                        <div className="truncate">
                          <span>
                            <strong>{city.nomeCidade}</strong>
                          </span>
                        </div>
                        <div>{city.pais}</div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="headerSearchInput"
            dateFormat="dd/MM/yyyy"
            placeholderText="Check-in"
          />

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="headerSearchInput"
            dateFormat="dd/MM/yyyy"
            placeholderText="Check-out"
          />
        </div>
        <div className="headerSearchItem">
          <button className="headerBtn" onClick={handleSearch}>
            Buscar
          </button>
        </div>
      </div>
    </>
  )
}
