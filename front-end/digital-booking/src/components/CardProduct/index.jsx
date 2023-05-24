import { useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot,
  faWifi,
  faSwimmer
} from '@fortawesome/free-solid-svg-icons'

export function CardProduct({ product }) {
  const navigate = useNavigate()

  function handleNavigate(id) {
    navigate('/produto/' + id)
  }

  return (
    <div className={styles.containerCardInline} key={product.id}>
      <div className={styles.contentCard}>
        <div className={styles.contentImage}
          style={{ backgroundImage: `url(${product.imagens[0].urlImagem})` }}>
        </div>
        <div className={styles.contentDescription}>
          <div className={styles.contentAvaliation}>
            <div className={styles.stars}>
              <p>{product.categoria.descricaoCategoria}</p>
              <span>⭐⭐⭐⭐⭐</span>
              <h3>{product.nomeProduto}</h3>
            </div>
          <div className={styles.avaliation}>
                <div>
                  <span>{product.categoria.qualificacaoCategoria}</span>
                </div>
                <p>Muito bom</p>
          </div>
          </div>

          <div className={styles.contentIcons}>
            <div>
              <FontAwesomeIcon icon={faLocationDot} />
              <p>A 900 metros da praia</p>
              <FontAwesomeIcon icon={faSwimmer} />
              <FontAwesomeIcon icon={faWifi} />
            </div>
            <div></div>
          </div>
          <div className={styles.contentText}>
            <p className={styles.contentTextDescription}>
              {product.descricaoProduto}
            </p>
          </div>
          <div>
            <button
              className={styles.button}
              onClick={() => {
                handleNavigate(product.id)
              }}
            >
              Ver mais
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
