import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { Link } from 'react-router-dom';

function HeaderDetails({categoria, titulo})
{
    return(
        <div className="header-details">
            <div className='title'>
                <span>{categoria}</span>
                <h1>{titulo}</h1>
            </div>
            <div className='back-page'>
                <Link to='/'>
                    <section>
                        <FontAwesomeIcon icon={faChevronLeft} size='3x'/>
                    </section>
                </Link>
            </div>
        </div>
    );
}

export default HeaderDetails;