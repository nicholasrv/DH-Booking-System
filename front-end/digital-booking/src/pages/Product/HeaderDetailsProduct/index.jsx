import { Link } from 'react-router-dom'
import style from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons'

export function HeaderDetailsProduct({ newProduct }) {
  // console.log(newProduct)
  return (
    <>
      <div className={style.headerdetails}>
        <div className={style.title}>
          <div>
            {newProduct.length != 0 ? (
              <span>{newProduct.categoria.descricaoCategoria}</span>
            ) : ''}
          </div>
          <h1>{newProduct.nomeProduto}</h1>
        </div>
        <div className={style.backpage}>
          <Link to="/">
            <section>
              <FontAwesomeIcon icon={faChevronLeft} size="3x" />
            </section>
          </Link>
        </div>
      </div>

      <div className={style.locationdetails}>
        <FontAwesomeIcon icon={faLocationDot} />
        {newProduct.length != 0 ? (
          <p>{newProduct.cidades.nomeCidade}, {newProduct.cidades.pais}</p>
        ) : ''}
      </div>
    </>
  )
}
