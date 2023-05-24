import React from 'react'
import ReactDOM from 'react-dom/client'
import { IsLoggedProvider } from './context/IsLoggedContext'
import { ProductProvider } from './context/ProductContext'
import { UserProvider } from './context/UserContext'
import { ReservationProvider } from './context/ReservationContext'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { AppRoutes } from './Routes'

import './styles/global.css'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <IsLoggedProvider>
          <UserProvider>
            <ProductProvider>
              <ReservationProvider>
                <Header />
                <AppRoutes />
                <Footer />
              </ReservationProvider>
            </ProductProvider>
          </UserProvider>
        </IsLoggedProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
