import React from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'

const Files = () => {
  return (
    <Container className="p-5">
      <Row className="justify-content-md-center">
        <Col xs lg="6">
          <Alert variant="info">
            <Alert.Heading>Coming Soon!</Alert.Heading>
            <span>For now you can view HOA documents on the </span>
            <a
              href="https://portal.hoaliving.com/Homeowner_v2/Documents"
              target="_blank">
              FCS Portal
            </a>
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}

export default Files
