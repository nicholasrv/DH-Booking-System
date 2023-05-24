import { useEffect } from 'react'
import categories from '../../../categories.json'
import { Card } from '../Card'
import styles from './styles.module.css'
import api from '../../service/api'
import axios from 'axios';
import { useState } from 'react'

export function ContainerCategory() {
  const category = categories.category

  //Estado que armazena as categorias trazidas do servidor
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getCategoria();
  }, [])

  const getCategoria = async () => {
    try {
      const response = await api.get('categoria')
        .then(response => response.data)

      return setCategorias(response);
    } catch (error) {
      console.log("Não foi possível estabelecer conexão " + error);
    }
  }

  return (
    <div className={styles.containerCategory}>
      {/* {console.log(categorias)} */}
      <div className={styles.containerCard}>
        {categorias.map((current) => {
          return (
            <Card
              key={current.id}
              img={current.urlImagemCategoria
              }
              title={current.descricaoCategoria
              }
              number={current.qualificacaoCategoria
              }
              className={styles.card}
            />
          )
        })}
      </div>
    </div>
  )
}