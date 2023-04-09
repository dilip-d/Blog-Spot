import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageRender from './PageRender'
import Header from './components/global/Header'
import Footer from './components/global/Footer'
import Alert from './components/alert/Alert'

const App = () => {
  return (
    <div className='container'>
      <Router>
        <Alert />
        <Header />

        <Routes>
          <Route path='/' element={<PageRender />} />
          <Route path='/:page' element={<PageRender />} />
          <Route path='/:page/:slug' element={<PageRender />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  )
}

export default App