import api from '../../service/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import style from './style.module.css'

import { useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { Loading } from '../../components/Loading'

//Importes do slide
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

//imports icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
  faWifi,
  faSwimmer,
  faHome,
  faTelevision,
  faSnowflake,
  faPaw,
  faCar,
  faPeopleRoof
} from '@fortawesome/free-solid-svg-icons'
import { Calender } from '../../components/Calender'
import { Policy } from '../../components/Policy'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HeaderDetailsProduct } from './HeaderDetailsProduct'
import { ProductContext } from '../../context/ProductContext'
import { ReservationContext } from '../../context/ReservationContext'
import { AuthContext } from '../../context/AuthContext'

export function Product() {
  const { isLogged } = useContext(AuthContext)
  const { newProduct, setNewProduct } = useContext(ProductContext)
  const { startDate, endDate, onChangeDates } = useContext(ReservationContext)
  const [loading, setLoading] = useState(true)
  console.log(newProduct)
  const navigateTo = useNavigate()

  const reservarProduto = () => {
    if (isLogged) {
      //Se estiver logado
      // Ir para a pagina de reserva do produto
      const url = new URL(window.location.href)

      navigateTo(url.pathname + '/reserva')
    } else {
      // Se usuario nao estiver logado
      //Ir pra pagina de login e exibir uma mensagem especifica
      navigateTo('/login')
      toast.error('Para fazer uma reserva você precisa estar logado!')
    }
  }

  const { id } = useParams()

  //Configuração Keen Slider
  const [slides, setSlides] = useState(false)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    loop: true,
    dragSpeed: 2,
    created() {
      setLoaded(true)
    }
  })

  useEffect(() => {
    getProduct()
  }, [])

  async function getProduct() {
    try {
      const response = await api
        .get(`produtos/${id}`)
        .then((response) => response.data)
      setNewProduct(response)
      setLoading(false)
    } catch (error) {
      console.log('Erro ao buscar o produto' + error)
    }
  }

  const slide = () => setSlides(!slides)

  return (
    <>
      {loading && <Loading />}
      <section className={style.ContainerProduct}>
        <HeaderDetailsProduct newProduct={newProduct} />

        {/* Grid de 5 primeiras imagens*/}
        <div className={`containerGlobal ${style.containerGridImages}`}>
          {newProduct.length != 0
            ? newProduct.imagens
                .slice(0, 5)
                .map((element, index) => (
                  <div
                    key={element.id}
                    onClick={slide}
                    className={`${style.responsiveImages} ${style.gridAreas}`}
                    style={{ backgroundImage: `url(${element.urlImagem})` }}
                  ></div>
                ))
            : ''}
          <button onClick={slide} id={style.buttonOpenSlideDesktop}>
            Abrir galeria
          </button>
        </div>

        {/* Slide versão desktop */}
        {slides ? (
          <div className={style.containerSlideDesktop}>
            <div
              ref={sliderRef}
              className={`keen-slider ${style.imagesDesktop}`}
            >
              {newProduct.length != 0
                ? newProduct.imagens.map((element) => (
                    <div
                      key={element.id}
                      style={{ backgroundImage: `url(${element.urlImagem})` }}
                      className={`keen-slider__slide ${style.responsiveImages}`}
                    ></div>
                  ))
                : ''}
              <button
                id={style.buttonNextSlide}
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current.next()
                }
              >
                <FontAwesomeIcon icon={faChevronRight} size="4x" />
              </button>
              <button
                id={style.buttonPrevSlide}
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current.prev()
                }
              >
                <FontAwesomeIcon icon={faChevronLeft} size="4x" />
              </button>
              <button id={style.buttonCloseSlide} onClick={slide}>
                <FontAwesomeIcon icon={faXmark} size="3x" />
              </button>
            </div>
          </div>
        ) : (
          ''
        )}

        {/* Slide vesão tablet e mobile */}
        {newProduct.length != 0 ? (
          <>
            <div className={style.containerSlideMobile}>
              <div ref={sliderRef} className="keen-slider">
                {newProduct.length != 0
                  ? newProduct.imagens.map((element) => (
                      <div
                        key={element.id}
                        style={{ backgroundImage: `url(${element.urlImagem})` }}
                        className={`keen-slider__slide ${style.responsiveImages}`}
                      ></div>
                    ))
                  : ''}
              </div>
            </div>
          </>
        ) : (
          ''
        )}
        {loaded && instanceRef.current && instanceRef.current.slides != 0 && (
          <div className={style.dots}>
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys()
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                  }}
                  className={`${style.dot} ${
                    currentSlide === idx ? style.active : ''
                  }`}
                ></button>
              )
            })}
          </div>
        )}
      </section>

      <section className={`containerGlobal ${style.details}`}>
        <div className={style.descricao}>
          <h2>Descrição</h2>
          <div className={style.separator}></div>
          <p>{newProduct.descricaoProduto}</p>
        </div>
      </section>

      <section className={`containerGlobal ${style.features}`}>
        {/* <span>{product.caracteristica}</span> */}
        <h2>O que esse lugar oferece?</h2>
        <div className={style.separator}></div>
        <div className={style.featuresIcons}>
          {newProduct.length != 0 &&
            newProduct.produtosCaracteristica.map((item) => (
            <div key={item.id}>
              <p>
                <FontAwesomeIcon icon={faSnowflake} /> - {item.nomeCaracteristica}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={`containerGlobal ${style.policyReserva}`}>
        <Policy newProduct={newProduct}/>
      </section>

      <section className={style.containerReservation}>
        <div className={`containerGlobal`}>
          <h2>Datas disponíveis</h2>

          <div className={style.contentCalender}>
            <Calender
              onChangeDates={onChangeDates}
              startDate={startDate}
              endDate={endDate}
            />

            <div className={style.calenderText}>
              <p>Adicione as datas da sua viagem para obter preços exatos</p>
              <button onClick={reservarProduto}>Iniciar reserva</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
