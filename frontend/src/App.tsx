import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageRender from './PageRender'
import Header from './components/global/Header'
import Footer from './components/global/Footer'
import { Alert } from './components/alert/Alert'
import { useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch<any>(refreshToken())
  }, [dispatch])

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