import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Spinner } from 'react-bootstrap'

function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getImages = async () => {
      setLoading(true)
      try {
        // heroku
        // await axios.get('https://image-gallery-react-cam.herokuapp.com/images').then((response) => {
        //   setImages(response.data)
          await axios.get('http://localhost:5000/images').then((response) => {
            setImages(response.data)
          //console.log(response.data)
         })
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    getImages()
    console.log('use')
  }, [])

  return (
    <div className='App'>
      <Header />
      {loading ? (
        <div className='d-flex justify-content-center'>
          <Spinner animation='border' />
        </div>
      ) : (
        <Gallery images={images} setImages={setImages} />
      )}
      <Footer />
    </div>
  )
}

export default App
