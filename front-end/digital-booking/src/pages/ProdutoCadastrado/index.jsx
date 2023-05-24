import style from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export function ProdutoCadastrado()
{
    return(
        <div className={style.container}>
        <FontAwesomeIcon icon={faCheck } style={{color:"green"}} size="4x"/>
        <p>Seu produto foi cadastrado com sucesso!</p>
        <Link to="/"><button>Voltar a página inicial</button></Link>
    </div>
    );
}