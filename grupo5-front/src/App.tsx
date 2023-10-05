import { Routes, Route } from "react-router-dom"
import { HomePage } from './pages/Home'
import { JobPage } from './pages/Job'
import { JourneyPage } from "./pages/Journey"
// import { QRPage } from './pages/QR'
import { NotFoundPage } from './pages/NotFound'

import './App.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/job' element={<JobPage />} />
      <Route path='/journey' element={<JourneyPage />} />
      {/* <Route path='/' element={<LoginPage />} />
      <Route path='/qr' element={<QRPage />} /> */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

/*
      <Route path='/' element={<HomePage />} />
      <Route path='/qr' element={<QRPage />} />
      <Route path='*' element={<NotFoundPage />} />
*/

export default App