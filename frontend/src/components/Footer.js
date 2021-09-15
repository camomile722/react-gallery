import React from 'react'
import {
    Container,
    Row,
    Col,
    Image
  } from 'react-bootstrap'

export const Footer = () => {
    return (
        
            <footer>
            <Container className="py-5">
          <Row>
              <Col className="text-center py-3">
                  <Image className='logo' src='uploads/camomile-logo1.svg' /> &copy; Copyright 
              </Col>
          </Row>
          </Container> 
        </footer>
        
          
    )
}
