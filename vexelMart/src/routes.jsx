
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Contact from './pages/Contact'
import NoteDetailPage from './pages/NoteDetailPage'
// import { AnimatePresence } from 'framer-motion'

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

    </Routes>

  
  )
}

export default AppRoutes