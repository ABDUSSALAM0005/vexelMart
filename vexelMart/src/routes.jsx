
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Contact from './pages/Contact'
import ProductPage from './pages/ProductPage'


const AppRoutes = () => {
  return (

  

    <Routes location={location} key={location.pathname} >

        <Route
        path='/'
        element={<Home/>}
        />
        <Route
        path='/Contact'
        element={<Contact />}
        />
        <Route
        path='/product/:slug'
        element={<ProductPage />}
        />

    </Routes>

  
  )
}

export default AppRoutes