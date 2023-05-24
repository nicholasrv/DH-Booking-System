import { useEffect, useState } from 'react'
import api from '../../service/api'

import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'

export function CardCategory({ filteredProductQnt }) {
  const navigate = useNavigate()

  const [category, setCategory] = useState([])

  useEffect(() => {
    getCategory()
  }, [])

  async function getCategory() {
    try {
      const response = await api.get('categoria')
      setCategory(response.data)
     
    } catch (error) {
      console.log('Erro ao buscar categorias' + error)
    }
  }

  async function handleNavigate(id) {
    navigate('/produtos-por-categoria/' + id)
  }

  
  return (
    <div className={styles.containerCategory}>
      <div className={styles.containerCard}>
        <div
          className={styles.card}
          onClick={() => {handleNavigate(2)}}
        >
          <div style={{ backgroundImage: `url("https://pesweb.azureedge.net/spimg/hotelbannerimages/pestana-sao-paulo-hotel-banner-01.jpg?scale=downscaleonly&encoder=freeimage&progressive=true&quality=50&w=1440&h=780&mode=crop&anchor=bottomcenter")` }}
          ></div>
          <div className={styles.quantityItens}>
            <h1>Apartamento</h1>
            <span>{filteredProductQnt.apartamento}</span>
            {filteredProductQnt.apartamento > 1 
              ?
                <span>apartamentos</span>         
              :
                <span>apartamento</span> 
            }
          </div>
        </div>

        <div
          className={styles.card}
          value={category.descricaoCategoria}
          onClick={() => {
            handleNavigate(1)
          }}
        >
          <div style={{ backgroundImage: `url("https://www.qualviagem.com.br/wp-content/uploads/2015/06/infinity-blue-beneficios.jpg")` }}
          ></div>
          <div className={styles.quantityItens}>
            <h1>Resorts</h1>
            <span>{filteredProductQnt.resort}</span>
            {filteredProductQnt.resort > 1 
              ?
                <span>resorts</span>         
              :
                <span>resort</span> 
            }
          </div>
        </div>

        <div
          className={styles.card}
          value={category.descricaoCategoria}
          onClick={() => {
            handleNavigate(3)
          }}
        >
          <div style={{ backgroundImage: `url("https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768")` }}
          ></div>
          <div className={styles.quantityItens}>
            <h1>Hoteis</h1>
            <span>{filteredProductQnt.hotel}</span>
            {filteredProductQnt.hotel > 1 
              ?
                <span>hoteis</span>         
              :
                <span>hotel</span> 
            }
          </div>
        </div>

        <div
          className={styles.card}
          value={category.descricaoCategoria}
          onClick={() => {
            handleNavigate(4)
          }}
        >
          <div style={{ backgroundImage: `url("https://viagemeturismo.abril.com.br/wp-content/uploads/2020/11/gettyimages-964872010.jpg?quality=70&strip=info&w=1024&resize=1200,800")` }}
          ></div>
          <div className={styles.quantityItens}>
            <h1>Beira mar</h1>
            <span>{filteredProductQnt.beiraMar}</span>
            <span>beira mar</span>         
          </div>
        </div>


      </div>
    </div>
  )
}
