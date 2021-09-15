import React from 'react'
import {
    Container,
    Row,
    Col
  } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

export const Header = () => {
    return (
        <header>
          <Container>
        <Row className="pt-3">
            <Col>
          <FontAwesomeIcon className="m-3 icons" icon={faTwitter} />
          <FontAwesomeIcon className="m-3 icons" icon={faInstagram} />
          <FontAwesomeIcon className="m-3 icons" icon={faFacebook} />
          </Col>
          </Row>
          </Container>
        </header>
    )
}
