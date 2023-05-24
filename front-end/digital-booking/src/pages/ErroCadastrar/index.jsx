import style from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export function ErroCadastrar()
{
    return(
        <div className={style.container}>
        <FontAwesomeIcon icon={faXmark} style={{color:"red"}} size="4x"/>
        <p>Erro ao cadastrar produto, por favor tente mais tarde</p>
        <Link to="/"><button>Voltar a página inicial</button></Link>
    </div>
    );
}