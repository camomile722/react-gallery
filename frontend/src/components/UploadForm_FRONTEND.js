import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export const UploadForm = ({ images, setImages }) => {
  const [image, setImage] = useState({
    _id: Date.now(),
    name: '',
    url: '',
  })
  const [keyInput, setKeyInput] = useState('')
  const [message, setMessage] = useState(null)

  const addImage = (e) => {
    e.preventDefault()
    if (image.name !== '' && image.url !== '') {
      setImages([image, ...images])
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
    //setImages([...images, image])
    //setImages([image, ...images])
    console.log(image)
  }

  return (
    <Form className='pb-5 d-md-flex d-lg-flex align-items-center'>
      <Form.Group controlId='formFileLg' className='mx-md-3 mx-lg-3'>
        <Form.Control
          key={keyInput || ''}
          type='file'
          size='md'
          name='url'
          onChange={(e) => {
            setImage({
              ...image,
              url: URL.createObjectURL(e.target.files[0]),
            })
          }}
        />
        {/* { image.name === ""  ? 
        (
          <div>Bitte</div>
        )
        
        :(
          <div>Submitted</div>
        )

        }  */}
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
        onClick={addImage}
        className='mx-md-3 mx-lg-3'
      >
        Hinzufügen
      </Button>
      <div className='my-sm-3'>{message}</div>
    </Form>
  )
}
