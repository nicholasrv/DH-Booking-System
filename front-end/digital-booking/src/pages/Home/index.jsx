import { useEffect, useState } from 'react'
import api from '../../service/api'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { CardCategory } from '../../components/CardCategory'
import { CardProduct } from '../../components/CardProduct'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot,
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.css'
import { Search } from '../../components/Search'

export function Home() {
  const [products, setProducts] = useState([])
  const [cities, setCities] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [filteredProductQnt, setFilteredProductQnt] = useState({
    apartamento: 0,
    resort: 0,
    hotel: 0,
    beiraMar: 0,
  });


  useEffect(() => {
    getCidades()
    getProdutos()    
  }, [])

  async function getCidades() {
    try {
      const response = await api.get('cidades')
      setCities(response.data)
    } catch (error) {
      console.log('Erro ao buscar cidades' + error)
    }
  }

  async function buscarProdutoPorCidade(id) {
    try {
      const response = await api.get('produtoscidades/' + id)
        .then(response => response.data)
      console.log(response);
    } catch (error) {
      console.log('Erro ao buscar produto por cidade ' + error)
    }
  }
  
  // State que armazena valor de cidade escolhido no select da pesquisa por cidade
  const [selectValue, setSelectValue] = useState('');

  const handlerSubmit = (e) => {
    e.preventDefault()
    console.log(buscarProdutoPorCidade(selectValue));
  }

  //Filtrando Quant de Produto por Categoria
  async function getProdutos() {
    try {
      const response = await api.get('produtos')
      .then(response => response.data)
      setProducts(response)
      
      setFilteredProductQnt({
        apartamento: response.filter(
          (produto) => produto.categoria.descricaoCategoria === "Apartamento"
        ).length,
        resort: response.filter(
          (produto) => produto.categoria.descricaoCategoria === "Resorts"
        ).length,
        hotel: response.filter(
          (produto) => produto.categoria.descricaoCategoria === "Hoteis"
        ).length,
        beiraMar: response.filter(
          (produto) => produto.categoria.descricaoCategoria === "Beira Mar"
        ).length,
      });

    } catch (error) {
      console.log('Erro ao buscar produtos' + error)
    }
  }

  return (
    <>
      <div className={styles.containerBuscador}>
        <h1>Buscar ofertas em hotéis, casas e muito mais</h1>
        {/* <Search /> */}
        
        <div >
          <form action="" className={`containerGlobal ${styles.contentInputs}`}>
            <div className={styles.inputs}>
              <label htmlFor="destino">
                <FontAwesomeIcon icon={faLocationDot} />
              </label>
              <select
                type="text"
                id="destino"
                defaultValue={"DEFAULT"} onChange={e => setSelectValue(e.target.value)}
              >
                <option value="DEFAULT" disabled>Onde vamos?</option>

                {cities.map((city) => (
                  <option value={city.id} key={city.id}>
                    {city.nomeCidade}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputs}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className={styles.inputDatePicker}
                dateFormat="dd/MM/yyyy"
                placeholderText="Check-in"
              />
              <span></span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className={styles.inputDatePicker}
                dateFormat="dd/MM/yyyy"
                placeholderText="Check-out"
              />
              <label htmlFor="check-out">
                <FontAwesomeIcon icon={faCalendarCheck} />
              </label>
            </div>

            <button
              onClick={handlerSubmit}
              type="submit"
              className={styles.buttonBuscar}
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      <section className={`containerGlobal ${styles.category}`}>
        <h2>Buscar por tipo de acomodação</h2>
        <CardCategory products={products} filteredProductQnt={filteredProductQnt}/>
      </section>

      <section className={styles.containerRecomendacao}>
        <div className={styles.contentRecomendacao}>
          <h2>Recomendações</h2>

          <div className={styles.containerCard}>
            {products.length > 0 ? (
              products.map((product) => (
                <CardProduct product={product} key={product.id} />
              ))
            ) : (
              <p>Não há produtos cadastrados</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
