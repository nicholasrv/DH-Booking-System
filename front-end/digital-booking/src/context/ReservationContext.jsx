import { createContext, useState } from "react";

export const ReservationContext = createContext()

export const ReservationProvider = ({children}) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  // Evento que pega as datas de reserva
  const onChangeDates = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }  

  const [dataReserva, setDataReserva] = useState([]);

  return (
    <ReservationContext.Provider 
      value={{
        dataReserva, 
        setDataReserva, 
        onChangeDates,
        startDate, 
        setStartDate,
        endDate,
        setEndDate
      }}>

      {children}
    </ReservationContext.Provider>
  )
}