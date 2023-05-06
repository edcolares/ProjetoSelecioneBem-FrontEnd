import React from 'react';
import { Col, Row, FormGroup, Container, Card, CardBody, CardHeader, CardTitle, CardText } from 'reactstrap';
import Teste from '../teste';


const dashboardJobOpportunity = () => {
    return (
        <Container>
            <Row>
                <Col lg={6}>
                    <Card
                        className="my-0"
                        color="secondary"
                        outline
                        style={{
                            width: '100%'
                        }}>
                        <CardHeader tag="h5">
                            Top 10 skills mais utilizadas
                        </CardHeader>
                        <CardBody className='p-0 my-0'>
                            <CardText>
                                <Teste></Teste>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card
                        className="my-0"
                        color="secondary"
                        outline
                        style={{
                            width: '100%'
                        }}>
                        <CardHeader tag="h5">
                            Top 10 skills mais utilizadas
                        </CardHeader>
                        <CardBody className='p-0 my-0'>
                            <CardText>
                                <Teste></Teste>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default dashboardJobOpportunity