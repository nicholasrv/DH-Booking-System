import { useEffect, useState } from 'react'
import { CardProduct } from '../../components/CardProduct'
import api from '../../service/api';
import style from './style.module.css';

export function Category(name) {
  const [produtos, setProdutos] = useState([]);

  const buscarProdutosPorCategoria = async (id) => {
    const response = await api.get('produtoscategoria/' + id)
      .then(response => response.data);

    setProdutos(response);

    return response;
  }

  useEffect(() => {
    const url = window.location.pathname;
    buscarProdutosPorCategoria(url.charAt(url.length - 1));
  }, [])

  return (
    <div className={`containerGlobal ${style.container}`}>
      <h1 className={style.title}>Categoria {!produtos.length == 0 ? produtos[0].categoria.descricaoCategoria : ''}</h1>
      <div className={style.containerCard}>
        {!produtos.length == 0 ? (produtos.map(element => {
          return (
            <CardProduct product={element} key={element.id} />
          );
        })) : ''
        }
      </div>

    </div>
  )
}
