import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'

export const UploadForm = ({ images, setImages }) => {
  const [keyInput, setKeyInput] = useState('')
  const [message, setMessage] = useState(null)
  const [image, setImage] = useState({
    _id: Date.now(),
    name: '',
    url: '',
  })

  const fileSelectHandler = (e) => {
    console.log(e.target.files[0])
    setImage({
      ...image,
      url: e.target.files[0],
    })
  }

  const addNewImage = (e) => {
    e.preventDefault()

    if (image.name !== '' && image.url !== '') {
      const formData = new FormData()
      formData.append('name', image.name)
      formData.append('url', image.url)
      console.log(formData)
      console.log(image.name)
      console.log(image.url)

      try {
        axios.post('http://localhost:5000/images', formData).then((response) => {
          console.log(response.data)
          setImages([response.data, ...images])
        })
        //heroku production 
        // axios.post('https://image-gallery-react-cam.herokuapp.com/images', formData).then((response) => {
        //   console.log(response.data)
        //   setImages([response.data, ...images])
        // })
      } catch (e) {
        console.log(e)
      }

      setMessage('Super! Foto wurde hochgelden!')
      setImage({
        _id: Date.now(),
        name: '',
        url: '',
      })
      setKeyInput(Date.now())
    } else {
      setMessage('Prüfen Sie, ob alle Felder ausgefühlt sind')
    }
  }

  
  return (
    <Form
      className='pb-5 d-md-flex d-lg-flex align-items-center'
      encType='multipart/form-data'
    >
      <Form.Group controlId='formFileLg' className='mx-md-3 mx-lg-3'>
        <Form.Control
          key={keyInput || ''}
          type='file'
          size='md'
          filename='url'
          onChange={fileSelectHandler}
        />
      
      </Form.Group>
      <Form.Group controlId='formTextLg' className=''>
        <Form.Control
          type='text'
          size='md'
          name='name'
          placeholder='Tags eingeben'
          value={image.name}
          onChange={(e) => {
            setImage({ ...image, name: e.target.value })
          }}
        />
      </Form.Group>
      <Button
        variant='secondary'
        onClick={addNewImage}
        className='mx-md-3 mx-lg-3'
      >
        Hinzufügen
      </Button>
      <div className='my-sm-3'>{message}</div>
    </Form>
  )
}
