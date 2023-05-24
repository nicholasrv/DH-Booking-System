import style from './style.module.css'
import loading from '../../assets/loading.svg'

export function Loading() {
  return (
    <div className={style.loader_Container}>
      <img className={style.loader} src={loading} alt="loading" />
    </div>
  )
}

