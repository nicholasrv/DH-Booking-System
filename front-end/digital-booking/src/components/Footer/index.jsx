import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faLinkedinIn,
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'

import styles from './styles.module.css'

export function Footer() {
  return (
    <div className={styles.containerFooter}>
      <p>©2023 Digital Booking</p>
      <div className={styles.contentIconsFooter}>
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faLinkedinIn} />
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faInstagram} />
      </div>
    </div>
  )
}
