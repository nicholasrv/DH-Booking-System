import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function LocationDetails({localizacao})
{
    return(
        <div className="location-details">
            <p><FontAwesomeIcon icon={faLocationDot} /> {localizacao}</p>
        </div>
    );
}

export default LocationDetails;