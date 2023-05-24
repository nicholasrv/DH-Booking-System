import style from './style.module.css'

export function Policy({ newProduct }) {
  return (
    <section className={style.policy}>
      <h2>O que você precisa saber</h2>
      <div className={style.separator}></div>
      <div className={style.politicas}>
        <div className={style.regras}>
          <ul>
            <h3>Regras da casa</h3>
            {newProduct && <li>{newProduct.regrasDaCasa}</li>}
          </ul>
        </div>
        <div className={style.saude}>
          <ul>
            <h3>Saúde e segurança</h3>
            {newProduct && <li>{newProduct.saudeSeguranca}</li>}
          </ul>
        </div>
        <div className={style.cancelamento}>
          <ul>
            <h3>Politica de cancelamento</h3>
            {newProduct &&
            
            <li>{newProduct.politicaDeCancelamento}</li>
            }
          </ul>
        </div>
      </div>
    </section>
  )
}
