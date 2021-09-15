import React, { useState } from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { UploadForm } from './UploadForm.js'

export const Gallery = ({ images, setImages }) => {
  const [preview, setPreview] = useState(null)

  const changePreview = (index) => {
    let validIndex
    if (index >= images.length) {
      validIndex = 0
    } else if (index < 0) {
      validIndex = images.length - 1
    } else {
      validIndex = index
    }
    setPreview({
      ...images[validIndex],
      index: validIndex,
    })
    console.log(index)
    console.log(preview)
  }

  return (
    <div>
      <Container>
        <h1 className='py-5 text-center'>Inspiration Gallery</h1>

        <Row className=' '>
          <Col>
            <UploadForm images={images} setImages={setImages} />
          </Col>
        </Row>

        {preview && (
          <div className='gallery-preview'>
            <Container className='d-flex justify-content-center'>
              {/* without AWS UPLOAD
                  <Image
                className='modal-image'
                src={`uploads/${preview.url
                .toLowerCase()
                .split(' ')
                .join('-')
                }`}
              /> */}
              {/* with AWS UPLOAD*/}
               <Image
                className='modal-image'
                src={`https://img-react-gallery.s3.eu-central-1.amazonaws.com/${preview.url
                .toLowerCase()
                .split(' ')
                .join('-')
              }`}
              />
              <p className='caption-modal'>{preview.name}</p>
              <Button
                onClick={() => changePreview(preview.index - 1)}
                variant='outline-light'
                className='prev-modal'
              >
                &#10094;
              </Button>
              <Button
                onClick={() => changePreview(preview.index + 1)}
                variant='outline-light'
                className='next-modal'
              >
                &#10095;
              </Button>
              <div className='close-button'>
                <Button
                  variant='outline-light'
                  onClick={() => setPreview(null)}
                >
                  X
                </Button>
              </div>
            </Container>
          </div>
        )}

        <Row className='justify-content-center'>
          {images.map((image, index) => (
            <Col
              key={image._id}
              className='position-relative mb-3 img-thumb'
              // without AWS UPLOAD
              // style={{
              //   backgroundImage: `url("uploads/${image.url
              //     .toLowerCase()
              //     .split(' ')
              //     .join('-')} " )`,
              // }}
              style={{
                backgroundImage: `url("https://img-react-gallery.s3.eu-central-1.amazonaws.com/${image.url
                  .toLowerCase()
                  .split(' ')
                  .join('-')} " )`,
              }}
              md={4}
              sm={12}
              onClick={() => changePreview(index)}
            >
              <div className='tag text-center'>{image.name}</div>
            
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
