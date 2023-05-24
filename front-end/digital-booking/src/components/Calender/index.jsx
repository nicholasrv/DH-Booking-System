//imports do Calendario
import DatePicker from 'react-datepicker'
import { registerLocale } from 'react-datepicker'
import br from 'date-fns/locale/pt-BR'
registerLocale('br', br)

import style from './style.module.css'

export function Calender({onChangeDates, startDate, endDate}) {
  

  return (
    <div className={style.contentCalender}>
      <DatePicker
        selected={startDate}
        onChange={onChangeDates}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        monthsShown={2}
        inline
        locale="br"
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
      />
    </div>
  )
}
